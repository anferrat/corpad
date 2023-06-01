import React from 'react'
import { Select, SelectItem, IndexPath, Text, Icon } from '@ui-kitten/components'

const accessoryRender = (name, pack, fill, fill2 = undefined) => (props) => <Icon {...props} name={name} pack={name === undefined ? 'cp' : pack} fill={fill ?? props.style.tintColor} fill2={fill2} />

const placeholderRender = (placeholder) => <Text appearance='hint'>{placeholder}</Text>

const displayAccessory = (accessory, accessoryList, i) => {
    if (accessory === undefined || accessory === null)
        if (accessoryList === undefined || accessoryList === null)
            return null
        else if (accessoryList[i] === undefined)
            return null
        else if (accessoryList[i]?.icon === undefined || accessoryList[i]?.icon === null)
            return null
        else return accessoryRender(accessoryList[i].icon, accessoryList[i]?.pack, accessoryList[i]?.fill, accessoryList[i]?.fill2)
    else if (accessory?.icon === null || accessory?.icon === undefined)
        return null
    else
        return accessoryRender(accessory.icon, accessory?.pack, accessory?.fill, accessory?.fill2)

}

const checkSelectedIndex = (selectedIndex, maxLength) => (selectedIndex !== null && selectedIndex < maxLength)

const getSelectIndex = (selectedIndex, itemList, placeholderOption) => checkSelectedIndex(selectedIndex, itemList.length) ? new IndexPath(placeholderOption ? selectedIndex + 1 : selectedIndex) : ''

const getSelectValue = (selectedIndex, itemList) => checkSelectedIndex(selectedIndex, itemList.length) ? ((itemList[selectedIndex]?.item ?? itemList[selectedIndex]) ?? '') : ''

const SelectField = (props) => {
    const selectList = React.useMemo(() => {
        return (
            props.itemList.map((item, i) => <SelectItem
                key={`${item?.item ?? item}-SelectItem`}
                title={item?.item ?? item}
                accessoryLeft={displayAccessory(props.accessory, props.accessoryList, i)} />)
        )
    }, [props.itemList, props.accessoryList, props.accessory])


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