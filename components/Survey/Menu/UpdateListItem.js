import React from 'react'
import { ListItem } from '@ui-kitten/components'
import { styles } from './MenuSheet'
import { cloud, drive } from '../../_Stateless/Icons'
import { errorHandler } from '../../errorHandler'
import { useDispatch, useSelector } from 'react-redux'
import { loadSession, loadSurveySettings, setSurveySaving } from '../../../store/actions/settings'
import { getFormattedDate } from '../../customFunctions'
import { ActivityIndicator } from 'react-native'
import { saveSurveyToFile } from '../../surveyManagement'
import { primary } from '../../../styles/GlobalStyle'

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
            style={styles.listItem}
            title='Save changes'
            description={currentSurvey.savingInProgress ? 'Saving...' : (currentSurvey.lastSyncTime === null ? 'Never synced' : `Last synced: ${getFormattedDate(currentSurvey.lastSyncTime)}`)}
            onPress={onSaveHandler}
            accessoryLeft={currentSurvey.savingInProgress ? <ActivityIndicator color={primary} /> : currentSurvey.isCloudSurvey ? cloud : drive} />
    )
}

export default UpdateListItem