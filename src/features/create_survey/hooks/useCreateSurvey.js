import { useState, useCallback, useEffect, useRef } from 'react'
import fieldValidation from '../../../helpers/validation'
import { useDispatch, useSelector } from 'react-redux'
import { createSurvey, getSurveyFileList } from '../../../app/controllers/survey/SurveyFileController'
import { hideLoader, setSessionModalVisible, setSurveySettings, updateLoader } from '../../../store/actions/settings'
import { errorHandler } from '../../../helpers/error_handler'
import { isProStatus } from '../../../helpers/functions'

const useCreateSurvey = (withImport, navigateToImport) => {
    const [name, setName] = useState({
        name: null,
        valid: true
    })
    const [isCloud, setIsCloud] = useState(false)
    const [isBlank, setIsBlank] = useState(true)
    const [includeAssets, setIncludeAssets] = useState(true)
    const [selectedSurveyIndex, setSelectedSurveyIndex] = useState(null)
    const [surveyList, setSurveyList] = useState([])
    const [surveyListLoading, setSurveyListLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)
    const optionsAvailable = !withImport
    const assetOptionAvailable = isPro

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getSurveyFileList({ isCloud: false })
            if (status === 200)
                if (componentMounted.current) {
                    const { earlier, today } = response
                    setSurveyList([...earlier.map(({ name, path }) => ({ item: name, path })), ...today.map(({ name, path }) => ({ item: name, path }))])
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

    const toggleView = () => setVisible(state => !state)

    const createSurveyHandler = useCallback(async () => {
        const { valid, value } = fieldValidation(name.name, 'name')
        if (valid) {
            const name = value === null ? 'New survey' : value
            dispatch(updateLoader('Creating survey', `Name: ${name}`))
            const path = surveyList[selectedSurveyIndex] ? surveyList[selectedSurveyIndex].path : null
            await createSurvey(
                { isBlank, isCloud, path, name, includeAssets: includeAssets && isPro },
                (er) => errorHandler(er),
                ({ name, fileName, isCloud, syncTime, uid }) => {
                    dispatch(setSurveySettings(name, fileName, syncTime, isCloud, true, uid))
                    if (withImport)
                        navigateToImport()
                })
            dispatch(hideLoader())
        }
        else {
            errorHandler(506)
            setName({
                name: value,
                valid: valid
            })
        }
    }, [name.name, isBlank, isCloud, surveyList, selectedSurveyIndex, includeAssets, isPro])

    return {
        name: name.name,
        nameValid: name.valid,
        isCloud,
        isBlank,
        selectedSurveyIndex,
        surveyList,
        isSigned,
        surveyListLoading,
        visible,
        includeAssets: includeAssets && isPro,
        optionsAvailable,
        assetOptionAvailable,
        setIncludeAssets,
        onChangeName,
        onEndEditingName,
        setDeviceBased,
        setCloudBased,
        toggleTemplateSetting,
        setSelectedSurveyIndex,
        createSurveyHandler,
        toggleView
    }
}

export default useCreateSurvey