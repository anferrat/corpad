import React from 'react'
import { View, StyleSheet } from 'react-native'
import ItemCard from './components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { setImportItemType } from '../../../store/actions/importData'
import { ItemTypes } from '../../../constants/global'
import Title from './components/Title'

const SelectItem = () => {
    const selectedType = useSelector(state => state.importData.itemType)

    const dispatch = useDispatch()
    const selectOption = (type) => {
        if (type !== selectedType)
            dispatch(setImportItemType(type))
    }
    return (
        <View style={styles.mainView}>
            <Title
                name='SELECT IMPORTING SURVEY ITEM' />
            <View
                style={styles.itemSelection}>
                {Object.values(ItemTypes).map((type) => (
                    <ItemCard
                        key={type}
                        itemType={type}
                        selected={selectedType === type}
                        onPress={selectOption}
                    />))}
            </View>
        </View>
    )
}

export default React.memo(SelectItem)

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 12,
        marginTop: 12,
        marginBottom: 12
    },
    itemSelection: {
        marginHorizontal:-6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})