import { useCallback, useState, useRef, useEffect } from 'react'
import { copyCloudSurveyFileToDevice, copySurveyFileToCloud, copySurveyFileToDownloads, deleteSurveyFile, getCloudSurveyFileLink, getSurveyFileList, loadSurveyFile } from '../../../app/controllers/survey/SurveyFileController'
import { errorHandler, warningHandler } from '../../../helpers/error_handler'
import { useDispatch } from 'react-redux'
import { setSurveySettings, updateLoader, updateSession } from '../../../store/actions/settings'
import { EventRegister } from 'react-native-event-listeners'
import { ToastAndroid } from 'react-native'
import { shareFile } from '../../../app/controllers/survey/other/ExportedFileController'



const useSurveyFiles = ({ isCloud, navigateToSurveyFileList }) => {
    const [fileList, setFileList] = useState([
        {
            title: 'Today',
            data: []
        },
        {
            title: 'Earlier',
            data: []
        }
    ])
    const componentMounted = useRef(true)
    const [loading, setLoading] = useState(true)
    const [initialLoad, setInitialLoad] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        componentMounted.current = true
        const refreshListener = EventRegister.addEventListener('refreshSurveyFileList', (data) => {
            if (data.isCloud === isCloud)
                setLoading(true)
        })
        return () => {
            componentMounted.current = false
            EventRegister.removeEventListener(refreshListener)
        }
    }, [])

    const fileListErrorHandler = useCallback((errorStatus, er) => {
        //Handle remote requests. 302 status - user is not signed. 
        if (errorStatus === 302)
            dispatch(updateSession(false, false, null))
        else if (errorStatus !== 101)
            errorHandler(errorStatus)
    }, [dispatch])

    useEffect(() => {
        if (loading)
            getSurveyFileList({ isCloud },
                fileListErrorHandler,
                ({ today, earlier }) => {
                    if (componentMounted.current)
                        setFileList(state => Object.assign([], state, {
                            [0]: {
                                ...state[0],
                                data: today
                            },
                            [1]: {
                                ...state[1],
                                data: earlier
                            }
                        }))
                    setLoading(false)
                    setInitialLoad(true)
                }
            )
    }, [loading])

    const refreshHandler = useCallback(() => setLoading(true), [])

    const loadSurvey = useCallback(async ({ path, cloudId, fileName }) => {
        const displayPath = isCloud ? `gdrive/Corpad/${fileName}` : path
        dispatch(updateLoader(true, 'Loading file', displayPath))
        const { response, status, errorMessage } = await loadSurveyFile({ isCloud, path, cloudId })
        if (status === 200)
            dispatch(setSurveySettings(response.name, response.fileName, response.syncTime, response.isCloud, response.isLoaded))
        else if (status !== 101)
            fileListErrorHandler(status)
        dispatch(updateLoader(false, null, null))
    }, [isCloud, fileListErrorHandler])

    const deleteSurvey = useCallback(async ({ path, cloudId, hash, fileName }) => {
        //Returns true if file delete successfuly and false if not. (for onRemove animation)
        const confirm = await warningHandler(43, 'Delete')
        if (confirm) {
            const displayPath = isCloud ? `gdrive/Corpad/${fileName}` : path
            dispatch(updateLoader(isCloud, 'Deleteing file', displayPath))
            const { status } = await deleteSurveyFile({ isCloud, path, hash, cloudId }, fileListErrorHandler)
            dispatch(updateLoader(false, null, null))
            return status === 200
        }
        return false
    }, [isCloud, fileListErrorHandler])

    const removeSurveyFromList = useCallback(({ path, cloudId }) => {
        if (componentMounted.current) {
            setFileList(state => Object.assign([], state, {
                [0]: {
                    ...state[0],
                    data: state[0].data.filter(survey => ((survey.filePath !== path) && !isCloud) || ((survey.cloudId !== cloudId) && isCloud)),
                },
                [1]: {
                    ...state[1],
                    data: state[1].data.filter(survey => ((survey.filePath !== path) && !isCloud) || ((survey.cloudId !== cloudId) && isCloud))
                }
            }))
        }
    }, [isCloud])

    const shareSurveyFile = useCallback(async ({ path }) => {
        await shareFile({ url: path, mimeType: 'application/json' })
    }, [])

    const shareSurveyLink = useCallback(async ({ cloudId, fileName }) => {
        dispatch(updateLoader(true, 'Creating link', fileName))
        await getCloudSurveyFileLink({ cloudId }, fileListErrorHandler)
        dispatch(updateLoader(false, null, null))
    }, [fileListErrorHandler])

    const copyToAlternateFolder = useCallback(async ({ path, cloudId, fileName }) => {
        //copies from device to cloud and cloud to device
        dispatch(updateLoader(true, isCloud ? 'Copying to device' : 'Copying to gdrive', fileName))
        const { status, errorMessage } = await (isCloud ? copyCloudSurveyFileToDevice({ cloudId }) : copySurveyFileToCloud({ path }))
        if (status !== 200)
            fileListErrorHandler(status)
        else {
            EventRegister.emit('refreshSurveyFileList', { isCloud: !isCloud })
            navigateToSurveyFileList({ isCloud: !isCloud })
        }
        dispatch(updateLoader(false, null, null))
    }, [isCloud, fileListErrorHandler])

    const copyToDownloads = useCallback(async ({ path, cloudId, fileName }) => {
        dispatch(updateLoader(true, 'Saving to downloads', fileName))
        const { status } = await copySurveyFileToDownloads({ isCloud, cloudId, path })
        if (status === 200)
            ToastAndroid.show('Saved', ToastAndroid.SHORT)
        else fileListErrorHandler(status)
        dispatch(updateLoader(false, null, null))
    }, [fileListErrorHandler])


    return {
        fileList,
        loading,
        initialLoad,
        refreshHandler,
        loadSurvey,
        deleteSurvey,
        removeSurveyFromList,
        shareSurveyLink,
        shareSurveyFile,
        copyToAlternateFolder,
        copyToDownloads,
    }
}

export default useSurveyFiles