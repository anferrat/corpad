import { useBottomSheetNavigation } from "../../../hooks/bottom_sheet/useBottomSheetNavigation"

const useCreateLabel = ({ itemType, itemId }) => {
    const { openExportLabel } = useBottomSheetNavigation()

    return {
        openExportLabel: openExportLabel.bind(this, { itemId, itemType })
    }
}

export default useCreateLabel