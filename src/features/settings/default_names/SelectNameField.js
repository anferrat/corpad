import React from 'react'
import { StyleSheet } from 'react-native'
import { Select, SelectGroup, SelectItem, Icon, IndexPath } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import { labels } from '../../../constants/constants'

const renderIcon = (name) => (props) => <Icon {...props} pack='cp' name={name} fill={primary} />

const SelectNameField = (props) => {
    const itemsList = React.useMemo(() => props.defaultNamesList.filter((_, i) => i < 3).map(name =>
        <SelectItem
            key={'defaultName-' + name.type}
            title={labels[name.type].label}
            accessoryLeft={renderIcon(labels[name.type].icon)} />
    ), [props.defaultNamesList.length])

    const subitemsList = React.useMemo(() => props.defaultNamesList.filter((_, i) => i >= 3).map(name =>
        <SelectItem
            key={'defaultName-' + name.type}
            title={labels[name.type].label}
            accessoryLeft={renderIcon(labels[name.type].icon)} />
    ), [props.defaultNamesList.length])

    const selectHandler = React.useCallback((index) => {
        props.setData(old => {
            const newIndex = index.section * 3 + index.row
            return ({
                ...old,
                selectedIndex: newIndex,
                value: old.defaultNamesList[newIndex].name
            })
        })
    }, [props.setData])

    return (
        <Select
            label='Category'
            style={styles.select}
            accessoryLeft={renderIcon(labels[props.defaultNamesList[props.selectedIndex].type].icon)}
            selectedIndex={new IndexPath(props.selectedIndex >= 3 ? props.selectedIndex - 3 : props.selectedIndex, props.selectedIndex < 3 ? 0 : 1)}
            value={labels[props.defaultNamesList[props.selectedIndex].type].label}
            onSelect={selectHandler}>
            <SelectGroup title='Survey items'>
                {itemsList}
            </SelectGroup>
            <SelectGroup title='Readings'>
                {subitemsList}
            </SelectGroup>
        </Select>
    )
}

export default React.memo(SelectNameField, (prev, next) =>
    prev.selectedIndex === next.selectedIndex &&
    prev.defaultNamesList.length === next.defaultNamesList.length)


const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})