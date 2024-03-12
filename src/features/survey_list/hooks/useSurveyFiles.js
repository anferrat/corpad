import { useCallback, useState, useRef, useEffect } from 'react'
import { copyCloudSurveyFileToDevice, copySurveyFileToCloud, copySurveyFileToDownloads, deleteSurveyFile, getSurveyFileList, loadSurveyFile, shareFile } from '../../../app/controllers/survey/SurveyFileController'
import { errorHandler, warningHandler } from '../../../helpers/error_handler'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, setSurveySettings, updateLoader, updateLoaderProgress, updateSession } from '../../../store/actions/settings'
import { EventRegister } from 'react-native-event-listeners'
import { Platform, ToastAndroid } from 'react-native'
import { openLink } from '../../../app/controllers/AppController'

const useSurveyFiles = ({ isCloud, navigateToSurveyFileList }) => {
    const isSignedIn = useSelector(state => state.settings.session.isSigned)
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

    const fileListErrorHandler = useCallback((errorStatus) => {
        //Handle remote requests. 302 status - user is not signed. 
        if (errorStatus === 302)
            dispatch(updateSession(false, false, null))
        else if (errorStatus !== 101)
            errorHandler(errorStatus)
    }, [dispatch])

    const onDownload = useCallback((total, count) =>
        dispatch(updateLoaderProgress(true, 'Downloading assets', total, count)),
        [dispatch])

    const onUpload = useCallback((total, count) =>
        dispatch(updateLoaderProgress(true, 'Uploading assets', total, count)),
        [dispatch])

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
        dispatch(updateLoader('Loading survey', displayPath))
        const { response, status } = await loadSurveyFile({ isCloud, path, cloudId, onDownload })
        if (status === 200)
            dispatch(setSurveySettings(response.name, response.fileName, response.syncTime, response.isCloud, response.isLoaded, response.uid))
        else if (status !== 101)
            fileListErrorHandler(status)
        dispatch(hideLoader())
    }, [isCloud, fileListErrorHandler])

    const deleteSurvey = useCallback(async ({ path, cloudId, hash, fileName, uid }) => {
        //Returns true if file delete successfuly and false if not. (for onRemove animation)
        const confirm = await warningHandler(43, 'Delete')
        if (confirm) {
            const displayPath = isCloud ? `gdrive/Corpad/${fileName}` : path
            if (isCloud)
                dispatch(updateLoader('Deleteing survey', displayPath))
            const { status } = await deleteSurveyFile({ isCloud, path, hash, cloudId, uid }, fileListErrorHandler)
            dispatch(hideLoader())
            return status === 200
        }
        return false
    }, [isCloud, fileListErrorHandler])

    const removeSurveyFromList = useCallback(({ path, cloudId }) => {
        if (componentMounted.current) {
            setFileList(state => Object.assign([], state, {
                [0]: {
                    ...state[0],
                    data: state[0].data.filter(survey => ((survey.path !== path) && !isCloud) || ((survey.cloudId !== cloudId) && isCloud)),
                },
                [1]: {
                    ...state[1],
                    data: state[1].data.filter(survey => ((survey.path !== path) && !isCloud) || ((survey.cloudId !== cloudId) && isCloud))
                }
            }))
        }
    }, [isCloud])

    const shareSurveyFile = useCallback(async ({ path, cloudId, name }) => {
        dispatch(updateLoader('Exporting survey', name))
        const { status } = await shareFile({ path, cloudId, isCloud, onDownload })
        dispatch(hideLoader())
        if (status !== 200)
            fileListErrorHandler(status)

    }, [isCloud, fileListErrorHandler])


    const copyToAlternateFolder = useCallback(async ({ path, cloudId, name }) => {
        //copies from device to cloud and cloud to device
        dispatch(updateLoader(isCloud ? 'Copying survey to device' : 'Copying survey to gdrive', name))
        const { status, errorMessage } = isCloud ? await copyCloudSurveyFileToDevice({ cloudId, onDownload }) : await copySurveyFileToCloud({ path, onUpload })
        if (status !== 200)
            fileListErrorHandler(status)
        else {
            EventRegister.emit('refreshSurveyFileList', { isCloud: !isCloud })
            navigateToSurveyFileList({ isCloud: !isCloud })
        }
        dispatch(hideLoader())
    }, [isCloud, fileListErrorHandler, onDownload, onUpload])

    const copyToDownloads = useCallback(async ({ path, cloudId, name }) => {
        dispatch(updateLoader('Saving survey to downloads', name))
        const { status } = await copySurveyFileToDownloads({ isCloud, cloudId, path, onDownload })
        if (status === 200) {
            if (Platform.OS === "android")
                ToastAndroid.show('Saved', ToastAndroid.SHORT)
        }
        else fileListErrorHandler(status)
        dispatch(hideLoader())
    }, [fileListErrorHandler, onDownload])

    const docLinkHandler = useCallback(() => {
        openLink({ url: 'https://docs.corpad.ca' },
            er => errorHandler(er))
    }, [])


    return {
        fileList,
        loading,
        initialLoad,
        isSignedIn,
        refreshHandler,
        loadSurvey,
        deleteSurvey,
        removeSurveyFromList,
        shareSurveyFile,
        copyToAlternateFolder,
        copyToDownloads,
        docLinkHandler
    }
}

export default useSurveyFiles