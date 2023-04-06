import React, { useEffect } from 'react'
import { View, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import SectionList from './components/SectionList'
import { shareLink, shareWith } from '../../native_libs/share'
import { errorHandler } from '../../helpers/error_handler'
import { refreshSurveyList, loadSurveyList, addSurveyToList, deleteSurveyFromList, resetSurveyList } from '../../store/actions/surveyList'
import FileListItem from './components/FileListItem'
import { deleteSurveyHandler, saveToCloud, saveToDevice, saveSurveyToDownloads, surveyLoader } from '../../services/survey/manager'
import { getLocalMetaData } from '../../services/files/survey'
import { updateSetting, loadSurveySettings, loadSession } from '../../store/actions/settings'
import { getCloudMetaData } from '../../services/cloud_drive/survey'
import { getWebLink } from '../../api/cloud_drive/gd'
import SignOutRow from './SignOutRow'
import EmptySurveyListComponent from './components/EmptySurveyListComponent'
import { copyToClipboard } from '../../native_libs/clipboard'
import useSurveyFiles from './hooks/useSurveyFiles'


const LoaderSurveyList = (props) => {
    const { fileList } = useSurveyFiles({ isCloud: false })
    console.log(fileList)
    const dispatch = useDispatch()
    const data = useSelector(state => props.isCloud ? state.surveyList.cloud : state.surveyList.local)
    const refreshing = useSelector(state => props.isCloud ? state.surveyList.refreshingCloud : state.surveyList.refreshingLocal)


    const fetchListData = React.useCallback(async (isCloud) => {
        const metaData = !isCloud ? await getLocalMetaData() : await getCloudMetaData()
        if (metaData.status === 200)
            return metaData.result
        else {
            if (metaData.status === 302)
                dispatch(loadSession({ isSigned: false, userName: null }))
            errorHandler(metaData.status)
            return []
        }
    }, [dispatch])

    useEffect(() => () => {
        dispatch(resetSurveyList(props.isCloud ? 'CLOUD' : 'LOCAL'))
    }, [])

    useEffect(() => {
        if (refreshing) {
            const displayList = async () => {
                const newList = await fetchListData(props.isCloud)
                dispatch(loadSurveyList(newList, props.isCloud ? 'CLOUD' : 'LOCAL'))
            }
            displayList()
        }
    }, [refreshing])

    const onDeleteHandler = React.useCallback(async (isCloud, path, hash = null) => {

        isCloud ? dispatch(updateSetting('loader', { visible: true, title: 'Deleting' })) : null
        const delAction = await deleteSurveyHandler(isCloud, path, hash)
        isCloud ? dispatch(updateSetting('loader', { visible: false })) : null
        if (delAction.status === 200)
            dispatch(deleteSurveyFromList(isCloud ? 'CLOUD' : 'LOCAL', path))
        else errorHandler(delAction.status)
        return delAction
    }, [dispatch])

    const saveToDownloadsHandler = React.useCallback(async (isCloud, path) => {
        dispatch(updateSetting('loader', { visible: true, title: 'Saving to Downloads' }))
        const saveCopy = await saveSurveyToDownloads(path, isCloud)
        if (saveCopy.status === 200) {
            ToastAndroid.show('Saved to Downloads', ToastAndroid.SHORT)
        }
        else errorHandler(saveCopy.status)
        dispatch(updateSetting('loader', { visible: false }))
    }, [dispatch])

    const saveToHandler = React.useCallback(async (path, toCloud) => {
        dispatch(updateSetting('loader', { visible: true, title: `Copying to ${toCloud ? 'Cloud' : 'Device'}` }))
        const saveCopy = await (toCloud ? saveToCloud(path) : saveToDevice(path))
        if (saveCopy.status === 200) {
            if (saveCopy.meta !== null) {
                dispatch(addSurveyToList(toCloud ? 'CLOUD' : 'LOCAL', saveCopy.meta))
                props.navigateToList(toCloud)
            }
            else errorHandler(508)
        }
        else errorHandler(saveCopy.status)
        dispatch(updateSetting('loader', { visible: false }))
    }, [dispatch, props.navigateToList])

    const genMenuItems = React.useCallback((isCloud, path) => {
        if (!isCloud) {
            return [
                { title: 'Copy to Cloud', onPress: saveToHandler.bind(this, path, true), icon: 'cloud-download-outline' },
                { title: 'Save to Downloads', onPress: saveToDownloadsHandler.bind(this, isCloud, path), icon: 'download-outline' },
                { title: 'Share', onPress: shareWith.bind(this, path, 'application/json'), icon: 'share-outline' },
            ]
        }
        else return [
            { title: 'Copy to Device', onPress: saveToHandler.bind(this, path, false), icon: 'smartphone-outline' },
            { title: 'Save to Downloads', onPress: saveToDownloadsHandler.bind(this, isCloud, path), icon: 'download-outline' },
            { title: 'Share link', onPress: getLink.bind(this, path, true), icon: 'share-outline' },
            { title: 'Copy link', onPress: getLink.bind(this, path, false), icon: 'copy-outline' },
        ]
    }, [saveToHandler])

    const getLink = React.useCallback(async (cloudId, toShare) => {
        if (props.isCloud) {
            dispatch(updateSetting('loader', { visible: true, title: 'Creating link' }))
            const link = await getWebLink(cloudId)
            if (link.status === 200) {
                if (toShare)
                    shareLink(link.result, 'Share survey link')
                else
                    copyToClipboard(link.result)
            }
            else errorHandler(link.status)
            dispatch(updateSetting('loader', { visible: false }))
        }
    }, [props.isCloud])


    const renderItem = React.useCallback(({ item }) => {
        const path = props.isCloud ? item.cloudId : item.filePath
        return <FileListItem
            onPress={loadSurveyHandler.bind(this, path, item.fileName, item.name)}
            title={item.name}
            path={path}
            isCloud={props.isCloud}
            tpCount={item.tpCount}
            rectifierCount={item.rectifierCount}
            pipelineCount={item.pipelineCount}
            good={item.good}
            timeModified={item.timeModified}
            onDeleteHandler={onDeleteHandler.bind(this, props.isCloud, path, item.hash)}
            menuItems={genMenuItems(props.isCloud, path)} />
    }, [props.isCloud, genMenuItems, onDeleteHandler, loadSurveyHandler])

    const refreshHandler = React.useCallback(() => {
        dispatch(refreshSurveyList(props.isCloud ? 'CLOUD' : 'LOCAL'))
    }, [dispatch])

    const loadSurveyHandler = React.useCallback(async (path, fileName) => {
        dispatch(updateSetting('loader', { visible: true, title: 'Opening', text: !props.isCloud ? path : `/cloud/Corpad/${fileName}` }))

        const openSurvey = await surveyLoader(path, props.isCloud ? 'cloud' : 'local', fileName)
        if (openSurvey.status === 200) {
            dispatch(loadSurveySettings({
                name: openSurvey.name,
                fileName: openSurvey.fileName,
                isCloudSurvey: openSurvey.isCloud,
                syncTime: openSurvey.syncTime,
                isLoaded: true,
            }))
        }
        else {
            errorHandler(openSurvey.status)
            dispatch(updateSetting('loader', { visible: false }))
        }
    }, [dispatch, props.isCloud])

    const keyExtractor = React.useCallback(item => props.isCloud ? item.cloudId : item.filePath, [props.isCloud])

    const EmtyComponent = React.useMemo(() => <EmptySurveyListComponent onButtonPress={props.navigateToCreate} listType={props.isCloud ? 'CLOUD' : 'LOCAL'} />, [props.isCloud, props.navigateToCreate])


    return (
        <SectionList
            ListHeaderComponent={props.isCloud ? <SignOutRow /> : null}
            ListEmptyComponent={refreshing ? <View /> : EmtyComponent}
            keyExtractor={keyExtractor}
            sections={data[0].data.length === 0 && data[1].data.length === 0 ? [] : data}
            refreshing={refreshing}
            onRefresh={refreshHandler}
            renderItem={renderItem} />
    )
}

export default LoaderSurveyList