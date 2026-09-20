import { ItemTypeLabels } from "../../../../constants/labels"
import { ItemTypeIcons } from "../../../../constants/icons"
import { translateImport } from '../../../../localization'

export const getItemIcon = (itemType) => ItemTypeIcons[itemType] ?? null

export const getItemName = (itemType, count) => {
    return (ItemTypeLabels[itemType] ?? translateImport('item.item')).toLowerCase()
}
