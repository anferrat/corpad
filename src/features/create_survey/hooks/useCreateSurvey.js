import { useState, useCallback, useEffect, useRef } from 'react'
import fieldValidation from '../../../helpers/validation'
import { useDispatch, useSelector } from 'react-redux'
import { createSurvey, getSurveyFileList } from '../../../app/controllers/survey/SurveyFileController'
import { setSessionModalVisible, setSurveySettings, updateLoader } from '../../../store/actions/settings'
import { errorHandler } from '../../../helpers/error_handler'

const useCreateSurvey = () => {
    const [name, setName] = useState({
        name: null,
        valid: true
    })
    const [isCloud, setIsCloud] = useState(false)
    const [isBlank, setIsBlank] = useState(true)
    const [selectedSurveyIndex, setSelectedSurveyIndex] = useState(null)
    const [surveyList, setSurveyList] = useState([])
    const [surveyListLoading, setSurveyListLoading] = useState(true)
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getSurveyFileList({ isCloud: false })
            if (status === 200)
                if (componentMounted.current) {
                    const { earlier, today } = response
                    setSurveyList([...earlier.map(({ name, filePath }) => ({ item: name, path: filePath })), ...today.map(({ name, filePath }) => ({ item: name, path: filePath }))])
                    setSurveyListLoading(false)
                }
        }
        loadData()
    }, [])

    const onChangeName = useCallback((value) => { setName(state => ({ ...state, name: value })) }, [])

    const onEndEditingName = useCallback(() => {
        //use name instad of surveyName here, as null values are ok, since we replace null with default value in handler
        const validatiion = fieldValidation(name.name, 'name')
        setName({
            name: validatiion.value,
            valid: validatiion.valid
        })
    }, [name.name])

    const setDeviceBased = useCallback(() => setIsCloud(false), [])

    const setCloudBased = useCallback(() => {
        if (isSigned)
            setIsCloud(true)
        else
            dispatch(setSessionModalVisible(true))
    }, [isSigned])

    const toggleTemplateSetting = useCallback((index) => setIsBlank(!Boolean(index)), [])

    const createSurveyHandler = useCallback(async () => {
        const { valid, value } = fieldValidation(name.name, 'name')
        if (valid) {
            const name = value === null ? 'New survey' : value
            dispatch(updateLoader(true, 'Creating survey', `Name: ${name}`))
            const path = surveyList[selectedSurveyIndex] ? surveyList[selectedSurveyIndex].path : null
            await createSurvey(
                { isBlank, isCloud, path, name },
                (er, message) => { errorHandler(er); console.log(message) },
                ({ name, fileName, isCloud, syncTime }) =>
                    dispatch(setSurveySettings(name, fileName, syncTime, isCloud, true)))
            dispatch(updateLoader(false, null, null))
        }
        else {
            errorHandler(506)
            setName({
                name: value,
                valid: valid
            })
        }
    }, [name.name, isBlank, isCloud, surveyList, selectedSurveyIndex])
    /*
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
    */


    return {
        name: name.name,
        nameValid: name.valid,
        isCloud,
        isBlank,
        selectedSurveyIndex,
        surveyList,
        isSigned,
        surveyListLoading,
        onChangeName,
        onEndEditingName,
        setDeviceBased,
        setCloudBased,
        toggleTemplateSetting,
        setSelectedSurveyIndex,
        createSurveyHandler
    }
}

export default useCreateSurvey