import React from 'react'
import { ToastAndroid, StyleSheet } from 'react-native'
import ExportedFileListItem from '../../_Stateless/Settings/ExportedFileListItem'
import { clearExported, getExportedFilesMetadata } from '../../../files/local/fsExportedFiles'
import { useState } from 'react'
import FlatList from '../../_Stateless/List/FlatList'
import { useEffect } from 'react'
import { errorHandler, warningHandler } from '../../errorHandler'
import { shareWith } from '../../_nativeFeatures/Share'
import { openIn } from '../../_nativeFeatures/OpenIn'
import { copyFile, deleteFile } from '../../../files/local/fs'
import EmptyExportedFilesList from '../../_Stateless/Settings/EmptyExportedFilesList'
import LoadingView from '../../_Stateless/Settings/LoadingView'
import MainActionButton from '../../_Stateless/MainActionButton'
import { trashIcon } from '../../_Stateless/Icons'

const getMimeType = (type) => type === 'csv' ? 'text/csv' : 'application/vnd.google-earth.kml+xml'
const initFiles = []

const ExportedFilesList = (props) => {
    const [files, setFiles] = useState(initFiles)
    const [refreshing, setRefreshing] = useState(true)

    const saveToDownloads = React.useCallback(async (name, path) => {
        const copySaved = await copyFile(name, path, 'downloads')
        if (copySaved.status === 200)
            ToastAndroid.show('Saved to Downloads', ToastAndroid.SHORT)
        else {
            errorHandler(copySaved.status)
        }
    }, [])

    const onDeleteHandler = React.useCallback(async (fileName, path) => {
        const fileDeleted = await deleteFile('exports', fileName)
        if (fileDeleted.status === 200) {
            ToastAndroid.show(`${fileName} was deleted`, ToastAndroid.SHORT)
            setFiles(oldFiles => oldFiles.filter(file => file.path !== path))
        }
        else
            errorHandler(fileDeleted.status)
        return fileDeleted
    }, [setFiles])

    const deleteAllHandler = React.useCallback(async () => {
        if (!refreshing) {
            const confirm = await warningHandler(45, 'Delete all')
            if (confirm) {
                const deleteAll = await clearExported()
                if (deleteAll.status === 200) {
                    ToastAndroid.show('All files were deleted', ToastAndroid.SHORT)
                    setFiles(initFiles)

                }
                else
                    errorHandler(deleteAll.status)
            }
        }
    }, [setFiles, refreshing])

    const renderItem = React.useCallback(({ item }) => (
        <ExportedFileListItem
            fileName={item.name}
            fileSize={item.size}
            type={item.type}
            mtime={item.mtime}
            onDeleteHandler={onDeleteHandler.bind(this, item.name, item.path)}
            menuItems={[
                { title: 'Share', onPress: shareWith.bind(this, item.path, getMimeType(item.type)), icon: 'share-outline' },
                { title: 'Open in...', onPress: openIn.bind(this, item.path, getMimeType(item.type)), icon: 'external-link-outline' },
                { title: 'Save to Downloads', onPress: saveToDownloads.bind(this, item.name, item.path), icon: 'download-outline' },
            ]} />
    ), [onDeleteHandler, saveToDownloads])

    const fetchFiles = React.useCallback(async () => {
        setRefreshing(true)
        const fetchedFiles = await getExportedFilesMetadata()
        if (fetchedFiles.status === 200) {
            setFiles(fetchedFiles.result)
        }
        else {
            errorHandler(fetchedFiles.status, props.goBack)
        }
        setRefreshing(false)
    }, [setFiles])

    useEffect(() => {
        fetchFiles()
    }, [])

    const keyExtractor = React.useCallback(item => item.path, [])

    return (
        <>
            <LoadingView loading={refreshing}>
                <FlatList
                    contentContainerStyle={styles.list}
                    onRefresh={fetchFiles}
                    refreshing={refreshing}
                    data={files}
                    renderItem={renderItem}
                    ListEmptyComponent={EmptyExportedFilesList}
                    keyExtractor={keyExtractor}
                />
            </LoadingView>
            <MainActionButton
                title='Delete all'
                disabled={(refreshing && files.length === 0) || files.length === 0}
                icon={trashIcon}
                valid={true}
                onPress={deleteAllHandler}
            />
        </>
    )
}

export default ExportedFilesList

const styles = StyleSheet.create({
    list: {
        paddingBottom: 76
    }
})