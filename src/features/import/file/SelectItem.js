import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import ItemOption from './components/ItemOption'
import { useDispatch, useSelector } from 'react-redux'
import { items } from '../../../constants/constants'
import { setImportItemType } from '../../../store/actions/importData'

const SelectItem = () => {
    const itemType = useSelector(state => state.importData.itemType)
    const selectedIndex = items.indexOf(itemType)
    const dispatch = useDispatch()
    const selectOption = (index) => {
        dispatch(setImportItemType(items[index]))
    }
    useEffect(() => () => {
        dispatch(setImportItemType(items[0]))
    }, [])
    return (
        <View style={styles.mainView}>
            <Text category='h6' style={styles.title}>1. Select survey item</Text>
            <View style={styles.itemSelection}>
                <ItemOption iconName='TS-filled' pack='cp' title='Test points' selected={selectedIndex === 0} onPress={selectedIndex === 0 ? null : selectOption.bind(this, 0)} />
                <ItemOption iconName='PL-filled' pack='cp' title='Pipelines' selected={selectedIndex === 1} onPress={selectedIndex === 1 ? null : selectOption.bind(this, 1)} />
                <ItemOption iconName='RT-filled' pack='cp' title='Rectifiers' selected={selectedIndex === 2} onPress={selectedIndex === 2 ? null : selectOption.bind(this, 2)} />
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