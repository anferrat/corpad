import { useNavigation } from '@react-navigation/native'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getSurveyInfo, updateSurveyName as updateSurveynameRequest } from '../../../../app/controllers/survey/other/SurveyInfoController'
import { errorHandler } from '../../../../helpers/error_handler'
import { loadSurveySettings } from '../../../../store/actions/settings'
import fieldValidation from '../../../../helpers/validation'


const initialData = {
    surveyNameInput: null,
    loading: true,
    count: {
        TEST_POINT: 0,
        RECTIFIER: 0,
        PIPELINE: 0
    },
    status: {
        TEST_POINT: {
            0: 0,
            1: 0,
            2: 0,
            3: 0
        },
        RECTIFIER: {
            0: 0,
            1: 0,
            2: 0,
            3: 0
        }
    },
    extraInfo: {
        lastUpdated: null,
        mainReference: null,
        surveyRadius: null,
        potentials: 0
    }
}

const useSurveyInfo = () => {
    const [data, setData] = useState(initialData)

    //name - is the curretn survey name, text - is TextInput with text name to submit
    const [surveyName, setSurveyName] = useState({
        name: null,
        text: null
    })
    const { count, status, extraInfo, loading } = data
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        getSurveyInfo(
            (er) => errorHandler(er, navigation.goBack),
            ({ surveyName, lastUpdated, mainReference, pipelineCount, potentialCount, rectifierCount, tpCount, testPointStatusCount, rectifierStatusCount, surveyRadius }) => {
                if (componentMounted.current)
                    setData({
                        loading: false,
                        count: {
                            TEST_POINT: tpCount,
                            RECTIFIER: rectifierCount,
                            PIPELINE: pipelineCount
                        },
                        status: {
                            TEST_POINT: {
                                0: testPointStatusCount.success,
                                1: testPointStatusCount.warning,
                                2: testPointStatusCount.danger,
                                3: testPointStatusCount.basic
                            },
                            RECTIFIER: {
                                0: rectifierStatusCount.success,
                                1: rectifierStatusCount.warning,
                                2: rectifierStatusCount.danger,
                                3: rectifierStatusCount.basic
                            }
                        },
                        extraInfo: {
                            lastUpdated: lastUpdated,
                            mainReference: mainReference,
                            surveyRadius: surveyRadius,
                            potentials: potentialCount
                        }
                    })
                setSurveyName({
                    name: surveyName,
                    text: surveyName
                })
            })
        return () => {
            componentMounted.current = false
        }
    }, [])

    const updateSurveyName = useCallback(async () => {
        const validation = fieldValidation(surveyName.text, 'surveyName')
        if (validation.valid) {
            const { status, response } = await updateSurveynameRequest({ name: validation.value }, er => errorHandler(er))
            if (status === 200) {
                setSurveyName({
                    name: response,
                    text: response
                })
                dispatch(loadSurveySettings({ name: response }))
            }
        }
        else {
            setSurveyName(state => ({
                ...state,
                text: state.name
            }))
            errorHandler(506)
        }
    }, [surveyName.text])

    const onChangeNameInput = useCallback((text) => {
        setSurveyName(state => ({
            ...state,
            text: text
        }))
    }, [])

    const resetNameInput = useCallback(() => {
        setSurveyName(state => ({
            ...state,
            text: state.name
        }))
    }, [])

    return {
        count,
        status,
        extraInfo,
        name: surveyName.name,
        inputText: surveyName.text,
        loading,
        updateSurveyName,
        resetNameInput,
        onChangeNameInput
    }
}

export default useSurveyInfo