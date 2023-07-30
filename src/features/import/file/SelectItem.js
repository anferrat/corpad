import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import ItemCard from './components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { setImportItemType } from '../../../store/actions/importData'
import { ItemTypes } from '../../../constants/global'
import { ItemTypeIconsFilled } from '../../../constants/icons'
import { ItemTypeLabelsPlural } from '../../../constants/labels'

const SelectItem = () => {
    const selectedType = useSelector(state => state.importData.itemType)

    const dispatch = useDispatch()
    const selectOption = (type) => {
        if (type !== selectedType)
            dispatch(setImportItemType(type))
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
                {Object.values(ItemTypes).map((type) => (
                    <ItemCard
                        key={type}
                        icon={ItemTypeIconsFilled[type]}
                        pack='cp'
                        title={ItemTypeLabelsPlural[type]}
                        selected={selectedType === type}
                        onPress={selectOption.bind(this, type)}
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