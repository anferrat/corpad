import { labels } from "../../../../constants/constants"

export const getItemIcon = (itemType) => {
    if (itemType = 'TEST_POINT')
        return 'TSS'
    else if (itemType === 'RECTIFIER')
        return 'RT'
    else if (itemType === 'PIPELINE')
        return 'PL'
    else return null
}

export const getItemName = (itemType, count) => {
    const text = labels[itemType]
    const ending = count === 1 ? '' : 's'
    if (!text)
        return 'item' + ending
    else return text.label.toLowerCase() + ending
}