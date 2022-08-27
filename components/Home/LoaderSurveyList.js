import React, { useEffect } from 'react'
import { View, ToastAndroid } from 'react-native'
import SectionList from '../_Stateless/SurveyList/SectionList'
import { useSelector, useDispatch } from 'react-redux'
import { shareLink, shareWith } from '../_nativeFeatures/Share'
import { errorHandler } from '../errorHandler'
import { refreshSurveyList, loadSurveyList, addSurveyToList, deleteSurveyFromList, resetSurveyList } from '../../store/actions/surveyList'
import FileListItem from '../_Stateless/SurveyList/FileListItem'
import { openSurveyHandler, deleteSurveyHandler, saveToCloud, saveToDevice, saveSurveyToDownloads } from '../surveyManagement'
import { getLocalMetaData } from '../../files/local/fsSurvey'
import { updateSetting, loadSurveySettings, loadSession } from '../../store/actions/settings'
import { getCloudMetaData, getFileLink } from '../../files/cloud/gdSurvey'
import SignOutRow from './SignOutRow'
import EmptySurveyListComponent from '../_Stateless/EmptySurveyListComponent'
import { copyToClipboard } from '../_nativeFeatures/clipboard'


const LoaderSurveyList = (props) => {
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
        dispatch(updateSetting('loader', { visible: true, title: 'Deleting' }))
        const delAction = await deleteSurveyHandler(isCloud, path, hash)
        dispatch(updateSetting('loader', { visible: false }))
        if (delAction.status === 200)
            //cheat move for animations to run
            setTimeout(() => dispatch(deleteSurveyFromList(isCloud ? 'CLOUD' : 'LOCAL', path)), 500)
        else errorHandler(delAction.status)
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
                { title: 'Copy to Cloud', onPress: saveToHandler.bind(this, path, true) },
                { title: 'Save to Downloads', onPress: saveToDownloadsHandler.bind(this, isCloud, path) },
                { title: 'Share', onPress: shareWith.bind(this, path, 'application/json') },
            ]
        }
        else return [
            { title: 'Copy to Device', onPress: saveToHandler.bind(this, path, false) },
            { title: 'Save to Downloads', onPress: saveToDownloadsHandler.bind(this, isCloud, path) },
            { title: 'Share link', onPress: getLink.bind(this, path, true) },
            { title: 'Copy link', onPress: getLink.bind(this, path, false) },
        ]
    }, [saveToHandler])

    const getLink = React.useCallback(async (cloudId, toShare) => {
        if (props.isCloud) {
            dispatch(updateSetting('loader', { visible: true, title: 'Creating link' }))
            const link = await getFileLink(cloudId)
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

        const loadToDataBase = await openSurveyHandler(path, props.isCloud, fileName)
        if (loadToDataBase.status === 200) {
            dispatch(loadSurveySettings({
                name: loadToDataBase.name,
                fileName: loadToDataBase.fileName,
                isCloudSurvey: loadToDataBase.isCloud,
                syncTime: loadToDataBase.syncTime,
                isLoaded: true,
            }))
        }
        else {
            errorHandler(loadToDataBase.status)
            dispatch(updateSetting('loader', { visible: false }))
        }
    }, [dispatch, props.isCloud])

    const keyExtractor = React.useCallback(item => props.isCloud ? item.cloudId : item.filePath, [props.isCloud])

    const EmtyComponent = React.useMemo(() => <EmptySurveyListComponent onButtonPress={props.navigateToCreate} listType={props.isCloud ? 'CLOUD' : 'LOCAL'} />, [props.isCloud, props.navigateToCreate])


    return (
        <>
            {props.isCloud ? <SignOutRow /> : null}
            <SectionList
                ListEmptyComponent={refreshing ? <View /> : EmtyComponent}
                keyExtractor={keyExtractor}
                sections={data[0].data.length === 0 && data[1].data.length === 0 ? [] : data}
                refreshing={refreshing}
                onRefresh={refreshHandler}
                renderItem={renderItem} />
        </>)
}

export default LoaderSurveyList