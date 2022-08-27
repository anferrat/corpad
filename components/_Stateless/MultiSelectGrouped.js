import React from 'react'
import { Select, SelectItem, IndexPath, SelectGroup } from '@ui-kitten/components'
import { getValidCaption } from '../customFunctions'

const MultiSelectGroupedField = (props) => {

    const renderSelectItem = React.useCallback((displayItem, i, j) =>
        <SelectItem key={displayItem + '_' + props.itemsList[j][i] + '_SelectItem' + i + j} title={displayItem} />, [props.itemsList])

    const selectOptions = React.useMemo(() => props.groupList.map((group, j) => <SelectGroup title={group} >{props.displayList[j].map((item, i) => renderSelectItem(item, i, j))}</SelectGroup>), [props.displayList, renderSelectItem])

    const onSelect = React.useCallback((index) =>
        props.onSelect(index.map(i => props.itemsList[i.section][i.row]), [props.onSelect, props.itemsList]))
    return (
        <Select
            {...props}
            multiSelect={true}
            value={getSelectedValue(props.selectedItems, props.displayList, props.itemsList)}
            selectedIndex={getSelectedIndex(props.selectedItems, props.itemsList)}
            status={(props.valid ?? true) ? 'basic' : 'danger'}
            caption={getValidCaption(props.valid, props.property)}
            onSelect={onSelect}>
            {selectOptions}
        </Select>
    )
}

const getSelectedIndex = (selectedItems, itemsList) => (
    selectedItems.filter(selected => itemsList.filter(item => item.indexOf(selected) !== -1)).map(selected => {
        const j = itemsList.findIndex(item => item.indexOf(selected) !== -1)
        const i = itemsList[j].indexOf(selected)
        return new IndexPath(j, i)
    })
)


const getSelectedValue = (selectedItems, displayList, itemsList) => (
    selectedItems.filter(selected => itemsList.filter(item => item.indexOf(selected) !== -1)).map(selected => {
        const j = itemsList.findIndex(item => item.indexOf(selected) !== -1)
        const i = itemsList[j].indexOf(selected)
        return displayList[j][i]
    }).join(', ')
)

export default React.memo(MultiSelectGroupedField)