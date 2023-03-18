import React from 'react'
import { StyleSheet } from 'react-native'
import MultiSelect from '../../../../components/MultiSelect3'

const MultiSelectConnectionCardField = ({ update, selectedIdList, subitemList, property, label, selectedTypes }) => {

    const itemList = React.useMemo(() => subitemList.filter(({ type }) => ~selectedTypes.indexOf(type)).map(({ id, name, type }) => ({ item: name, id, type })),
        [subitemList, selectedTypes])

    const selectedItems = selectedIdList.map(selectedId => {
        const index = itemList.findIndex(({ id }) => id === selectedId)
        return ~index ? index : null
    }).filter(item => item !== null)

    const onSelect = React.useCallback((index) => {
        const idList = index.map(i => itemList[i].id ?? null)
        update(idList, property)
    }, [update, property, itemList])

    return (
        <MultiSelect
            label={label}
            style={styles.select}
            itemList={itemList}
            selectedItems={selectedItems}
            onSelect={onSelect} />
    )
}

export default React.memo(MultiSelectConnectionCardField)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})