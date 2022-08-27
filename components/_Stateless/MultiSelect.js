import React from 'react'
import { Select, SelectItem, IndexPath } from '@ui-kitten/components'
import { getValidCaption } from '../customFunctions'

const MultiSelectField = (props) => {
    const renderSelectItem = React.useCallback((displayItem, i) =>
        <SelectItem key={displayItem + '_' + props.itemsList[i] + '_SelectItem'} title={displayItem} accessoryRight={props.accessoryList ? (props.accessoryList[i] ?? null) : null} />, [props.itemsList])
    const selectOptions = React.useMemo(() => props.displayList.map(renderSelectItem), [props.displayList, renderSelectItem])
    const onSelect = React.useCallback((index) =>
        props.onSelect(index.map(i => props.itemsList[i.row]), props.property), [props.onSelect, props.itemsList])
    return (
        <Select
            multiSelect={true}
            caption={getValidCaption(props.valid, props.property)}
            status={(props.valid ?? true) ? 'basic' : 'danger'}
            {...props}
            onSelect={onSelect}
            value={getSelectedValue(props.selectedItems, props.displayList, props.itemsList)}
            selectedIndex={getSelectedIndex(props.selectedItems, props.itemsList)}>
            {selectOptions}
        </Select>
    )
}

const getSelectedIndex = (selectedItems, itemsList) => (
    selectedItems.filter(selected => itemsList.indexOf(selected) !== -1).map(selected => new IndexPath(itemsList.indexOf(selected)))
)


const getSelectedValue = (selectedItems, displayList, itemsList) => (
    selectedItems.filter(selected => itemsList.indexOf(selected) !== -1).map(selected => displayList[itemsList.indexOf(selected)]).join(', ')
)

export default React.memo(MultiSelectField)