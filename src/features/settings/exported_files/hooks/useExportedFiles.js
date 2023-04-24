import { useCallback, useEffect, useRef, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { errorHandler, warningHandler } from '../../../../helpers/error_handler'
import { deleteAllExportedFiles, deleteExportedFile, getExportedFileList, openFileIn, saveExportedFileToDownloads, shareFile } from '../../../../app/controllers/survey/other/ExportedFileController'

const initFiles = []

const useExportedFiles = () => {
    const [files, setFiles] = useState(initFiles)
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)

    useEffect(() => {
        const loadFiles = async () => {
            if (loading) {
                const { status, response } = await getExportedFileList(er => errorHandler(er))
                if (status === 200)
                    if (componentMounted.current)
                        setFiles(response)
                setLoading(false)
            }
        }
        loadFiles()
    }, [loading])

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    const saveToDownloads = useCallback((path) => {
        saveExportedFileToDownloads({ path }, er => errorHandler(er), () => ToastAndroid.show('Saved', ToastAndroid.SHORT))
    }, [])

    const deleteFile = useCallback(async (fileName, path) => {
        const confirm = await warningHandler(44, 'Delete', 'Cancel')
        if (confirm) {
            const { status } = await deleteExportedFile({ path }, er => errorHandler(er), () => {
                ToastAndroid.show(`${fileName} was deleted`, ToastAndroid.SHORT)
            })

            return status === 200
        }
        else return confirm
    }, [])

    const removeFileFromList = useCallback((path) => {
        setFiles(state => state.filter(file => file.path !== path))
    }, [])

    const deleteAll = useCallback(async () => {
        if (!loading) {
            const confirm = await warningHandler(45, 'Delete all')
            if (confirm) {
                deleteAllExportedFiles(
                    (er) => errorHandler(er),
                    () => {
                        ToastAndroid.show('All files were deleted', ToastAndroid.SHORT)
                        setFiles(initFiles)
                    })
            }
        }
    }, [loading])

    const shareFileHandler = useCallback((path, type) => {
        shareFile({ url: path, mimeType: type })
    }, [])

    const openInHandler = useCallback((path, type) => {
        openFileIn({ url: path, mimeType: type })
    }, [])

    const onRefresh = useCallback(() => setLoading(true), [])

    return {
        files,
        loading,
        deleteFile,
        removeFileFromList,
        saveToDownloads,
        deleteAll,
        shareFileHandler,
        openInHandler,
        onRefresh
    }
}

export default useExportedFiles