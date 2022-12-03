import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListItem from './components/ListItemMenu'
import { errorHandler } from '../../helpers/error_handler'
import { loadSession, loadSurveySettings, setSurveySaving } from '../../store/actions/settings'
import { getFormattedDate } from '../../helpers/functions'
import { saveSurveyToFile } from '../survey_manager/manager' // change it! cannot refer feature from another feature

const UpdateListItem = (props) => {
    const dispatch = useDispatch()
    const currentSurvey = useSelector(state => state.settings.currentSurvey)
    const onSaveHandler = React.useCallback(async () => {
        dispatch(setSurveySaving(true))
        const saveSurvey = await saveSurveyToFile()
        if (saveSurvey.status === 200) {
            dispatch(loadSurveySettings({
                syncTime: saveSurvey.syncTime,
                fileName: saveSurvey.fileName,
            }))
            return
        }
        else if (saveSurvey.status === 302) {
            props.closeSheet()
            errorHandler(saveSurvey.status, () => dispatch(loadSession({ sessionModalVisible: true, isSigned: false, userName: null })))
        }
        else
            errorHandler(saveSurvey.status)
        dispatch(setSurveySaving(false))
    }, [props.closeSheet, dispatch])

    return (
        <ListItem
            disabled={currentSurvey.savingInProgress}
            title='Save changes'
            subtitle={currentSurvey.savingInProgress ? 'Saving...' : (currentSurvey.lastSyncTime === null ? 'Never saved' : `Last synced: ${getFormattedDate(currentSurvey.lastSyncTime)}`)}
            onPress={onSaveHandler}
            icon={currentSurvey.savingInProgress ? 'activityIndicator' : 'save-outline'} />
    )
}

export default UpdateListItem