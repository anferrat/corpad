import React from 'react'
import { ListItem } from '@ui-kitten/components'
import { styles } from './MenuSheet'
import { diagBack } from '../../_Stateless/Icons'
import { saveSurveyHandler } from '../../surveyManagement'
import { errorHandler, warningHandler } from '../../errorHandler'
import { useDispatch, useSelector } from 'react-redux'
import { loadSurveyList } from '../../../store/actions/surveyList'
import { updateSetting, resetCurrentSurveySettings, loadSurveySettings, loadSession } from '../../../store/actions/settings'
import { sendRequest } from '../../../database/db'

const SaveListItem = (props) => {
    const dispatch = useDispatch()
    const fileName = useSelector(state => state.settings.currentSurvey.fileName)
    const savingInProgress = useSelector(state => state.settings.currentSurvey.savingInProgress)

    const saveAsLocalHandler = React.useCallback(async (fileName) => {
        const updateIsCloud = await sendRequest('UPDATE', 'SETTING', { setting: 'isCloud', value: false })
        if (updateIsCloud.status === 200) {
            dispatch(loadSurveySettings({ isCloudSurvey: false }))
            await onSaveHandler(fileName)
        }
        else return errorHandler(updateIsCloud)
    }, [dispatch])

    const onSaveHandler = React.useCallback(async (fileName) => {
        props.closeSheet()
        dispatch(updateSetting('loader', { visible: true, title: 'Saving', text: fileName }))
        const saveToFile = await saveSurveyHandler()
        if (saveToFile.status === 200) {
            dispatch(loadSurveyList(saveToFile.result, saveToFile.isCloud ? 'CLOUD' : 'LOCAL'))
            dispatch(resetCurrentSurveySettings())
        }
        else {
            dispatch(updateSetting('loader', { visible: false }))
            if (saveToFile.status === 102) {
                const saveToDevice = await warningHandler(11, 'Save to device and exit', 'Try later')
                if (saveToDevice)
                    saveAsLocalHandler(fileName)
            }
            else if (saveToFile.status === 302) {
                const signInNeeded = await warningHandler(31, 'Sign in', 'Save to device and exit')
                if (signInNeeded)
                    dispatch(loadSession({ sessionModalVisible: true, isSigned: false, userName: null }))
                else {
                    dispatch(loadSession({ isSigned: false, userName: null }))
                    saveAsLocalHandler(fileName)
                }
            }
            else
                errorHandler(saveToFile.status)
        }
    }, [dispatch])

    return (
        <ListItem
        
            disabled={savingInProgress}
            style={styles.listItem}
            title='Save changes and exit'
            onPress={onSaveHandler.bind(this, fileName)}
            accessoryLeft={diagBack} />
    )
}

export default SaveListItem