import { ItemTypes } from "../../../constants/global"
import useModal from "../../../hooks/useModal"
import { translateView } from '../../../localization'

const useControlBar = ({ deleteItem, itemType, displayOnMap, displayOnMapVisible, navigateToEdit, onAddPhoto, isPro, exportLabelDisabled, openExportLabel }) => {
    const { showModal, hideModal, visible } = useModal()

    const buttons = []

    if (displayOnMapVisible)
        buttons.push({
            key: 'show_on_map',
            icon: 'map',
            pack: null,
            label: translateView('showOnMap'),
            inactive: false,
            onPress: displayOnMap
        })

    if (itemType !== ItemTypes.PIPELINE) {
        buttons.push({
            key: 'add_photo',
            icon: 'camera',
            pack: null,
            label: translateView('addPhoto'),
            inactive: !isPro,
            onPress: onAddPhoto
        })
        buttons.push({
            key: 'add_reading',
            icon: 'plus-circle',
            pack: null,
            label: translateView('addReading'),
            inactive: false,
            onPress: showModal
        })
    }

    buttons.push({
        key: 'edit',
        icon: 'edit',
        pack: null,
        label: translateView('edit'),
        inactive: false,
        onPress: navigateToEdit
    })

    if (itemType !== ItemTypes.PIPELINE)
        buttons.push({
            key: 'create_label',
            icon: 'pricetags',
            pack: null,
            label: translateView('createLabel'),
            inactive: false,
            disabled: exportLabelDisabled,
            onPress: openExportLabel
        })

    buttons.push({
        key: 'delete',
        icon: 'trash',
        pack: null,
        label: translateView('delete'),
        inactive: false,
        onPress: deleteItem,
        status: 'danger'
    })

    return {
        buttons,
        readingModalVisible: visible,
        hideReadingModal: hideModal
    }
}

export default useControlBar
