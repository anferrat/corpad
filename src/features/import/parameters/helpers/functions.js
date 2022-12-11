export const getData = (state, property, subitemIndex) => {
    const isItem = subitemIndex === null || !subitemIndex
    if (isItem)
        return state.importData.item[property]
    else return state.importData.subitems[subitemIndex][property]
}

const getNotIncludedValues = (mainArray, usedIndexes) => {
    return mainArray.map((item, index) => ({ item, index })).filter((_, i) => usedIndexes.indexOf(i) === -1)
}

export const getFieldIndexes = (fieldValues, attributeMap) => getNotIncludedValues(fieldValues, attributeMap.reduce((prev, next) => {
    if (prev && next) {
        return prev.concat(next.mappedIndexes)
    }
    else if (prev && !next)
        return prev
    else return []
}, [])
)

export const getPropertyIndexes = (itemList, attributeMap) => getNotIncludedValues(itemList, attributeMap.map(item => item.index))

export const getFieldValues = (data, fieldIndex, fields) => {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index
    }

    if (fieldIndex !== null) {
        const field = fields[fieldIndex]
        return data.map(item => item[field].trim() ?? "").filter(onlyUnique)
    }
    else return []
}