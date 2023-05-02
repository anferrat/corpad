import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import ItemCard from '../../../components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { items, labels } from '../../../constants/constants'
import { setImportItemType } from '../../../store/actions/importData'

const SelectItem = () => {
    const selectedIndex = useSelector(state => items.indexOf(state.importData.itemType))

    const dispatch = useDispatch()
    const selectOption = (index) => {
        if (index !== selectedIndex)
            dispatch(setImportItemType(items[index]))
    }
    return (
        <View style={styles.mainView}>
            <Text
                category='h6'
                style={styles.title}>
                1. Select survey item
            </Text>
            <View
                style={styles.itemSelection}>
                {items.map((item, i) => (
                    <ItemCard
                        key={item}
                        icon={`${labels[item].icon}-filled`}
                        pack='cp'
                        title={`${labels[item].label}s`}
                        selected={selectedIndex === i}
                        onPress={selectOption.bind(this, i)}
                    />))}
            </View>
        </View>
    )
}

export default React.memo(SelectItem)

const styles = StyleSheet.create({
    mainView: {
    },
    title: {
        padding: 12,
    },
    itemSelection: {
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})