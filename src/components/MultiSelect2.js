import React from 'react'
import { Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components'

//Moving to this multiSelect, get rid of old one

const accessoryRender = (name, pack) => (props) => <Icon {...props} name={name} pack={pack} />

const MultiSelect = (props) => {
    const {
        itemList,
        accessory,
        accessoryList,
        onSelect,
        valid,
        selectedItems,
    } = props
    const selectList = React.useMemo(() => itemList.map((item, i) =>
        <SelectItem
            key={`${item.item ?? item}-SelectItem`}
            title={item.item ?? item}
            accessoryRight={accessory ?
                accessoryRender(accessory.name, accessory.pack) :
                (accessoryList ?
                    accessoryRender(accessoryList[i].name, accessoryList[i].pack) :
                    null)} />), [itemList, accessoryList])

    const onSelectAction = React.useCallback((index) =>
        onSelect(index.map(i => i.row)), [onSelect])

    return (
        <Select
            multiSelect={true}
            status={(valid ?? true) ? 'basic' : 'danger'}
            {...props}
            onSelect={onSelectAction}
            value={getSelectedValue(selectedItems, itemList)}
            selectedIndex={getSelectedIndex(selectedItems, itemList)}>
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

export default React.memo(MultiSelect)