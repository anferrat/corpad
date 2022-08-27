import React from 'react'
import { Select, SelectItem, IndexPath, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { getValidCaption } from '../customFunctions'

// SelectField
// takes props as per Select from UI Kitten + extra props
//itemList - array of options to be displayd to chose from. When item is chosen selectAction returns index of item from this array
//resultList [optional] - when specified instead of returning index of an item, selectAction return an element from this array with that index. If specified selectedItem prop must be an elemnt from this array instead of an index
// selectedItem - value of a selected item, either id, or value from resultList
//placeholder - default value when nothing is chosen. avialable to be selected at any time, selectAction returns null

const SelectField = (props) => {
    const addPlaceholder = React.useMemo(() => !!props.placeholder && !props.ignorePlaceholder, [props.placeholder, props.ignorePlaceholder])
    const selectedItem = addPlaceholder && props.selectedItem !== null ? props.selectedItem + 1 : props.selectedItem
    const itemsList = React.useMemo(() => addPlaceholder ? ['*Placeholder*'].concat(props.itemsList) : props.itemsList, [addPlaceholder, props.itemsList])

    const renderSelectItems = React.useCallback((item, index) => {
        if (index === 0 && addPlaceholder)
            return <SelectItem key={'SelectItem_' + props.property + '_placeholder_' + props.placeholder} title={() => <Text appearance='hint'>{props.placeholder}</Text>} />
        else
            return <SelectItem key={'SelectItem_' + props.property + '_' + item} title={item} accessoryLeft={props.accessoryList ? props.accessoryList[addPlaceholder ? index - 1 : index] : null} />
    }, [props.accessoryList, props.placeholder, props.property, addPlaceholder])

    const selectOptions = React.useMemo(() => itemsList.map(renderSelectItems), [itemsList, renderSelectItems])
    const onSelect = React.useCallback((index) => {
        const i = addPlaceholder ? index.row - 1 : index.row
        const res = props.resultList ? (props.resultList[i] ?? null) : (i === -1 ? null : i)
        props.selectAction(res, props.property)
    }, [addPlaceholder, props.resultList, props.property, props.selectAction])

    return (
        <Select
            accessoryLeft={props.accessoryList ? props.accessoryList[addPlaceholder ? selectedItem - 1 : selectedItem] : null}
            style={styles.select}
            caption={getValidCaption(props.valid, props.property)}
            {...props}
            value={getSelectValue(selectedItem, itemsList)}
            selectedIndex={getSelectIndex(selectedItem)}
            status={props.valid !== false ? 'basic' : 'danger'}
            onSelect={onSelect}>
            {selectOptions}
        </Select>
    )
}



const getSelectIndex = (item) => item === null ? '' : new IndexPath(item)

const getSelectValue = (selectedItem, itemList) => selectedItem !== null ? itemList[selectedItem] : ''


export default React.memo(SelectField)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12,
    }
})