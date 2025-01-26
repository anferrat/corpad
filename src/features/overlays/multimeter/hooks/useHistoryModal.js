import { useCallback, useEffect, useState } from "react"
import { deleteAllHistoryReadings, deleteHistoryReading, exportHistoryReadings, getAllHistoryReadings } from "../../../../app/controllers/MultimeterReadingController"
import { errorHandler, warningHandler } from "../../../../helpers/error_handler"
import { useDispatch } from "react-redux"
import { hideLoader, setExportModal, updateLoader } from "../../../../store/actions/settings"
import { hapticDelete, hapticKeyboardPress } from "../../../../native_libs/haptics"

export const useHistoryModal = ({ hideModal }) => {
    const [loading, setLoading] = useState(true)
    const [readings, setReadings] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (loading) {
            getAllHistoryReadings(
                er => errorHandler(er, hideModal),
                readings => {
                    setReadings(readings)
                    setLoading(false)
                })
        }
    }, [loading])


    const onDeletePress = useCallback(async (id) => {
        hapticKeyboardPress()
        await deleteHistoryReading(id,
            er => errorHandler(er),
            () => setReadings(state => state.filter((reading) => reading.id !== id)))
    }, [setReadings])

    const onExportPress = useCallback(async () => {
        hideModal()
        dispatch(updateLoader('Exporting', null))
        await exportHistoryReadings(
            er => errorHandler(er),
            ({ path, mimeType }) => dispatch(setExportModal(true, path, mimeType)))
        dispatch(hideLoader())
    }, [hideModal])

    const onDeleteAllPress = useCallback(async () => {
        hapticDelete()
        const confirm = await warningHandler(64, 'Delete', 'Cancel')
        if (confirm)
            await deleteAllHistoryReadings(
                er => errorHandler(er),
                () => setReadings([]))
    }, [setReadings])

    return {
        readings,
        loading,
        onDeletePress,
        onExportPress,
        onDeleteAllPress
    }
}