import React from 'react'
import { StyleSheet } from 'react-native'
import ExportedFileListItem from './components/ExportedFileListItem'
import FlatList from './components/FlatList'
import EmptyExportedFilesList from './components/EmptyExportedFilesList'
import LoadingView from '../../../components/LoadingView'
import useExportedFiles from './hooks/useExportedFiles'
import BottomButton from '../../../components/BottomButton'


export const ExportedFilesList = ({ navigateToSpreadsheet }) => {
    const { files, loading, deleteFile, removeFileFromList, saveToDownloads, deleteAll, shareFileHandler, openInHandler, onRefresh } = useExportedFiles()
    const deleteButtonDisabled = (loading && files.length === 0) || files.length === 0

    const renderItem = React.useCallback(({ item }) => {
        const { name, timeModified, size, type, path } = item
        return (
            <ExportedFileListItem
                name={name}
                path={path}
                size={size}
                type={type}
                timeModified={timeModified}
                deleteFile={deleteFile}
                removeFileFromList={removeFileFromList}
                saveToDownloads={saveToDownloads}
                deleteAl={deleteAll}
                shareFileHandler={shareFileHandler}
                openInHandler={openInHandler}
                navigateToSpreadsheet={navigateToSpreadsheet} />
        )
    }, [loading])

    const keyExtractor = React.useCallback(item => item.path, [])

    return (
        <>
            <LoadingView loading={loading}>
                <FlatList
                    contentContainerStyle={styles.list}
                    onRefresh={onRefresh}
                    refreshing={loading}
                    data={files}
                    renderItem={renderItem}
                    ListEmptyComponent={EmptyExportedFilesList}
                    keyExtractor={keyExtractor} />
            </LoadingView>
            <BottomButton
                title='Delete all'
                disabled={deleteButtonDisabled}
                icon={'trash'}
                onPress={deleteAll} />
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingBottom: 72
    }
})