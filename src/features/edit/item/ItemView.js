import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoadingView from '../../../components/LoadingView'
import ItemFactory from './components/ItemFactory'
import useItemData from './hooks/useItemData'
import { globalStyle } from '../../../styles/styles'

const ItemView = ({ itemId, itemType, isNew, navigateToView, navigateToSubitem }) => {
    const { item, loading, update, validate, createSubitem, updateLatAndLon, updateTap } = useItemData({ itemId, itemType, isNew, navigateToView, navigateToSubitem })
    return (
        <View style={loading ? styles.card : {}} >
            <LoadingView loading={loading}>
                <ItemFactory
                    updateTap={updateTap}
                    updateLatAndLon={updateLatAndLon}
                    update={update}
                    validate={validate}
                    createSubitem={createSubitem}
                    itemType={itemType}
                    item={item} />
            </LoadingView >
        </View >
    )
}
export default ItemView

const styles = StyleSheet.create({
    card: {
        ...globalStyle.card,
        minHeight: 200
    }
})
