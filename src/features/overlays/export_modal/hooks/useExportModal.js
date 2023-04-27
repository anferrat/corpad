import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setExportModal } from "../../../../store/actions/settings"
import { openFileIn, shareFile } from "../../../../app/controllers/survey/other/ExportedFileController"

const useExportModal = ({ navigationRef }) => {
    const { visible, fileUrl, mimeType } = useSelector(state => state.settings.exportModal)
    const [loading, setLoading] = useState(false)
    const fileName = fileUrl ? fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length) : ''
    const dispatch = useDispatch()

    const hideModal = useCallback(() => {
        dispatch(setExportModal(false, null, null))
    }, [])

    const navigateToExportedFiles = useCallback(() => {
        dispatch(setExportModal(false, null, null))
        navigationRef.navigate('SettingDetails', { setting: 'exportedFiles' })
    }, [navigationRef])

    const openInHandler = async () => {
        if (!loading) {
            setLoading(true)
            await openFileIn({ url: fileUrl, mimeType: mimeType })
            setLoading(false)
        }
    }

    const shareHandler = async () => {
        if (!loading) {
            setLoading(true)
            await shareFile({ url: fileUrl, mimeType: mimeType })
            setLoading(false)
        }
    }

    return {
        hideModal,
        navigateToExportedFiles,
        openInHandler,
        shareHandler,
        fileName,
        visible,
        loading
    }

}

export default useExportModal