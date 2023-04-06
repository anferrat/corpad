export const calculateProgress = (status, count, itemType) => {
    if (itemType)
        return count[itemType] === 0 ? 0 : status[itemType][0] / count[itemType]
    else return 0
}