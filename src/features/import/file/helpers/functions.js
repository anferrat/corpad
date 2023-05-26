import { ItemTypeLabels, ItemTypeLabelsPlural } from "../../../../constants/labels"
import { ItemTypeIcons } from "../../../../constants/icons"

export const getItemIcon = (itemType) => ItemTypeIcons[itemType] ?? null

export const getItemName = (itemType, count) => {
    const text = count === 1 ? ItemTypeLabels[itemType] : ItemTypeLabelsPlural[itemType]
    if (!text)
        return count === 1 ? 'item' : 'items'
    else return text.toLowerCase()
}