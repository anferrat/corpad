import React from 'react'
import SectionList from './components/SectionList'
import EmptySurveyFileListComponent from './components/EmptySurveyFileListComponent'
import useSurveyFiles from './hooks/useSurveyFiles'
import SurveyFileListItem from './components/SurveyFileListItem'
import SurveyFileListHeader from './components/SurveyFileListHeader'

export const SurveyFileList = ({ navigateToCreateSurvey, isCloud, navigateToSurveyFileList }) => {
    const { fileList, loading, initialLoad, isSignedIn, refreshHandler, loadSurvey, deleteSurvey, removeSurveyFromList, shareSurveyFile, copyToAlternateFolder, copyToDownloads, docLinkHandler } = useSurveyFiles({ isCloud, navigateToSurveyFileList })

    const isEmpty = [...fileList[0].data, ...fileList[1].data].length === 0

    const renderItem = React.useCallback(({ item }) => {
        const { name, filePath, fileName, cloudId, tpCount, rectifierCount, pipelineCount, good, timeModified, uid, hash } = item
        return <SurveyFileListItem
            name={name}
            uid={uid}
            hash={hash}
            fileName={fileName}
            path={filePath}
            cloudId={cloudId}
            isCloud={isCloud}
            tpCount={tpCount}
            rectifierCount={rectifierCount}
            pipelineCount={pipelineCount}
            passedItems={(tpCount + rectifierCount) === 0 ? 0 : good / (tpCount + rectifierCount)}
            timeModified={timeModified}
            isSignedIn={isSignedIn}
            loadSurvey={loadSurvey}
            deleteSurvey={deleteSurvey}
            removeSurveyFromList={removeSurveyFromList}
            shareSurveyFile={shareSurveyFile}
            copyToAlternateFolder={copyToAlternateFolder}
            copyToDownloads={copyToDownloads}
        />
    }, [isSignedIn])

    const keyExtractor = React.useCallback(item => isCloud ? item.cloudId : item.filePath, [isCloud])

    const EmtyComponent = React.useMemo(() =>
        <EmptySurveyFileListComponent
            onPressLink={docLinkHandler}
            initialLoad={initialLoad}
            onCreate={navigateToCreateSurvey}
            isCloud={isCloud} />,
        [initialLoad, isCloud, navigateToCreateSurvey])

    const ListHeaderComponent = React.useMemo(() => <SurveyFileListHeader isCloud={isCloud} />, [isCloud])
    //List header disappears when list is empty, teherfore this kind of hack is used. change in future
    return (
        <>
            {isCloud && isEmpty && initialLoad ? ListHeaderComponent : null}
            <SectionList
                isEmpty={isEmpty}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={EmtyComponent}
                keyExtractor={keyExtractor}
                sections={fileList}
                refreshing={loading}
                onRefresh={refreshHandler}
                renderItem={renderItem} />
        </>

    )
}