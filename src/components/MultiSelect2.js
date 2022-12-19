import React from 'react'
import { Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components'

//Moving to this multiSelect, get rid of old one

const accessoryRender = (name, pack) => (props) => <Icon {...props} name={name} pack={pack} />

const MultiSelectField = (props) => {
    const selectList = React.useMemo(() => props.itemList.map((item, i) =>
        <SelectItem
            key={`${item.item  ?? item}-SelectItem`}
            title={item.item ?? item}
            accessoryRight={props.accessory ?
                accessoryRender(props.accessory.name, props.accessory.pack) :
                (props.accessoryList ?
                    accessoryRender(props.accessoryList[i].name, props.accessoryList[i].pack) :
                    null)} />), [props.itemList, props.accessoryList])

    const onSelect = React.useCallback((index) =>
        props.onSelect(index.map(i => i.row)), [props.onSelect])

    return (
        <Select
            multiSelect={true}
            status={(props.valid ?? true) ? 'basic' : 'danger'}
            {...props}
            onSelect={onSelect}
            value={getSelectedValue(props.selectedItems, props.itemList)}
            selectedIndex={getSelectedIndex(props.selectedItems, props.itemList)}>
            {selectList}
        </Select>
    )
}

const getSelectedIndex = (selectedItems, itemList) => (
    selectedItems.filter(selected => selected < itemList.length).map(selected => new IndexPath(selected))
)


const getSelectedValue = (selectedItems, itemList) => (
    selectedItems.filter(selected => selected < itemList.length).map(selected => itemList[selected].item ?? itemList[selected]).join(', ')
)

export default React.memo(MultiSelectField)