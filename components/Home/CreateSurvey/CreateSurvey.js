import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import Header from './Header'
import MainActionButton from '../../_Stateless/MainActionButton'
import { useDispatch, useSelector } from 'react-redux'
import { createSurvey, surveyLoader } from '../../surveyManagement'
import fieldValidation from '../../fieldValidation'
import { errorHandler } from '../../errorHandler'
import { updateSetting, loadSurveySettings } from '../../../store/actions/settings'
import SurveyType from './SurveyType'
import NameInput from './NameInput'
import MoreOptions from './MoreOtions'
import TemplateOptions from './TemplateOptions'

const CreateSurvey = ({ navigation }) => {
    const surveyList = useSelector(state => [...state.surveyList.local[0].data, ...state.surveyList.local[1].data])
    const dispatch = useDispatch()
    const [surveyName, setSurveyName] = useState('')
    const [surveyNameValid, setSurveyNameValid] = useState(true)
    const [notBlank, setNotBlank] = useState(0)
    const [isCloud, setIsCloud] = useState(0)
    const [selectedSurvey, setSelectedSurvey] = useState(null)

    const createSurveyHandler = React.useCallback(async (name, notBlank, isCloud, filePath) => {
        const validation = fieldValidation(name, 'name')
        if (validation.valid) {
            const surveyName = validation.value === null ? 'New survey' : validation.value
            dispatch(updateSetting('loader', { title: 'Creating', text: `Pipeline survey: ${surveyName}`, visible: true }))
            const newSurvey = (!notBlank || filePath === null) ? await createSurvey(surveyName, isCloud) : await surveyLoader(filePath, isCloud ? 'cloudTemplate' : 'localTemplate', surveyName)
            if (newSurvey.status === 200) {
                dispatch(loadSurveySettings({
                    isLoaded: true,
                    name: newSurvey.name,
                    fileName: newSurvey.fileName,
                    isCloudSurvey: newSurvey.isCloud,
                    syncTime: newSurvey.syncTime
                }
                ))
            }
            else {
                errorHandler(newSurvey.status)
                dispatch(updateSetting('loader', { visible: false }))
            }
        }
        else {
            setSurveyNameValid(validation.valid)
            setSurveyName(validation.value)
            errorHandler(506)
        }
    }, [setSurveyNameValid, setSurveyName, dispatch])

    const validateName = React.useCallback((name) => {
        const validation = fieldValidation(name, 'name')
        setSurveyNameValid(validation.valid)
        setSurveyName(validation.value)
    }, [setSurveyNameValid, setSurveyName])

    return (
        <View style={styles.background}>
            <Header
                goBack={navigation.goBack} />
            <ScrollView contentContainerStyle={styles.mainView} keyboardShouldPersistTaps='handled'>
                <NameInput
                    surveyName={surveyName}
                    surveyNameValid={surveyNameValid}
                    setSurveyName={setSurveyName}
                    validateName={validateName} />
                <SurveyType
                    isCloud={isCloud}
                    setIsCloud={setIsCloud} />
                <MoreOptions>
                    <TemplateOptions
                        surveyList={surveyList}
                        notBlank={notBlank}
                        setNotBlank={setNotBlank}
                        selectedSurvey={selectedSurvey}
                        setSelectedSurvey={setSelectedSurvey} />
                </MoreOptions>
            </ScrollView >
            <MainActionButton title='Create' valid={surveyNameValid} onPress={createSurveyHandler.bind(this, surveyName, notBlank, isCloud, (surveyList[selectedSurvey]?.filePath) ?? null)} error={506} />
        </View>
    )
}

export default CreateSurvey

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainView: {
        padding: 12,
        backgroundColor: '#fff',
        paddingBottom: 72
    },
    item: {
        paddingVertical: 12
    },
    hidden: {
        display: 'none'
    },
    title: {
        marginTop: 12,
        marginBottom: 6
    }
})