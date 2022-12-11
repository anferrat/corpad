import React from 'react'
import { Select, SelectItem, IndexPath, Text, Icon } from '@ui-kitten/components'

//try to adopt this format for all selectfield

const accessoryRender = (name, pack, fill) => (props) => <Icon {...props} name={name} pack={pack} fill={fill ?? props.style.tintColor} />

const placeholderRender = (placeholder) => <Text appearance='hint'>{placeholder}</Text>

const displayAccessory = (accessory, accessoryList, i) => accessory ?
    accessoryRender(accessory.name, accessory.pack, accessory.fill) :
    (accessoryList ?
        accessoryRender(accessoryList[i].name, accessoryList[i].pack, accessoryList[i].fill) :
        null)

const checkSelectedIndex = (selectedIndex, maxLength) => (selectedIndex !== null && selectedIndex < maxLength)

const getSelectIndex = (selectedIndex, itemList, placeholderOption) => checkSelectedIndex(selectedIndex, itemList.length) ? new IndexPath(placeholderOption ? selectedIndex + 1 : selectedIndex) : ''

const getSelectValue = (selectedIndex, itemList) => checkSelectedIndex(selectedIndex, itemList.length) ? ((itemList[selectedIndex]?.item ?? itemList[selectedIndex]) ?? '') : ''

const SelectField = (props) => {
    const selectList = React.useMemo(() => props.itemList.map((item, i) => <SelectItem
        key={`${item.item ?? item}-SelectItem`}
        title={item.item ?? item}
        accessoryLeft={displayAccessory(props.accessory, props.accessoryList, i)} />
    ), [props.itemList, props.accessoryList, props.accessory])


    const onSelect = React.useCallback((index) => {
        const res = props.placeholderOption ? index.row - 1 : index.row
        props.onSelect(res < 0 ? null : res)
    }, [props.onSelect, props.placeholderOption])

    return (
        <Select
            accessoryLeft={props.selectedIndex !== null ? displayAccessory(props.accessory, props.accessoryList, props.selectedIndex) : null}
            {...props}
            value={getSelectValue(props.selectedIndex, props.itemList, props.placeholderOption)}
            selectedIndex={getSelectIndex(props.selectedIndex, props.itemList, props.placeholderOption)}
            status={props.valid !== false ? 'basic' : 'danger'}
            onSelect={onSelect}>
            {props.placeholderOption ? <SelectItem title={placeholderRender.bind(this, props.placeholder)} /> : null}
            {selectList}
        </Select>
    )
}


export default React.memo(SelectField)