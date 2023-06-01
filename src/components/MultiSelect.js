import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Select, SelectItem, Icon, List, CheckBox } from '@ui-kitten/components'
import { primary100 } from '../styles/colors'

//Started as of a joke, but seems like thsi version of multiselect with flatlist and cutom state works way faster than original multiselect

const accessoryRender = (name, pack) => (props) => <Icon {...props} name={name} pack={pack} />

const MultiSelect = (props) => {

    const [selectedItems, setSelectedItems] = useState(props.selectedItems)
    const {
        itemList,
        accessory,
        accessoryList,
        onSelect,
        valid,
    } = props

    const onSelectAction = React.useCallback((index) => {
        setSelectedItems(old => old.concat(index))
    }, [setSelectedItems])

    const onDeselectAction = React.useCallback((index) => {
        setSelectedItems(old => old.filter(i => i !== index))
    }, [setSelectedItems])

    useEffect(() => {
        if (selectedItems !== props.selectedItems)
            onSelect(selectedItems)
    }, [selectedItems])

    useEffect(() => {
        setSelectedItems(props.selectedItems)
    }, [props.selectedItems])

    const renderItem = ({ item, index }) => {
        const selected = selectedItems.indexOf(index) !== -1
        return (
            <SelectItemWrapper
                index={index}
                title={item.item ?? item}
                onDeselectAction={onDeselectAction}
                onSelectAction={onSelectAction}
                selected={selected}
                accessory={accessory}
                accessoryList={accessoryList}
            />)
    }

    return (
        <Select
            {...props}
            multiSelect={true}
            status={(valid ?? true) ? 'basic' : 'danger'}
            value={getSelectedValue(selectedItems, itemList)}>
            <List
                initialNumToRender={6}
                maxToRenderPerBatch={7}
                updateCellsBatchingPeriod={300}
                windowSize={15}
                data={itemList}
                renderItem={renderItem}
                keyExtractor={keyExtractor} />
        </Select>
    )
}

const keyExtractor = item => `${item.item ?? item}-SelectItem`

const getSelectedValue = (selectedItems, itemList) => (
    selectedItems.filter(selected => selected < itemList.length).map(selected => itemList[selected].item ?? itemList[selected]).join(', ')
)

export default React.memo(MultiSelect)


const SelectItemWrapper = React.memo(({ onDeselectAction, onSelectAction, title, selected, accessoryList, accessory, index }) => {
    const CheckedBox = (props) => <CheckBox {...props} checked={true} onChange={onDeselectAction.bind(this, index)} />

    const UncheckedBox = (props) => <CheckBox {...props} checked={false} onChange={onSelectAction.bind(this, index)} />
    return (
        <SelectItem
            style={selected ? styles.selected : null}
            onPress={selected ? onDeselectAction.bind(this, index) : onSelectAction.bind(this, index)}
            title={title}
            accessoryLeft={selected ? CheckedBox : UncheckedBox}
            accessoryRight={accessory ?
                accessoryRender(accessory.name, accessory.pack) :
                (accessoryList ?
                    accessoryRender(accessoryList[i].name, accessoryList[i].pack) :
                    null)} />)
}, (prev, next) => prev.selected === next.selected)

const styles = StyleSheet.create({
    selected: {
        backgroundColor: primary100
    }
})