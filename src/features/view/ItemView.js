import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoadingView from '../../components/LoadingView'
import { globalStyle } from '../../styles/styles'
import ItemFactory from './components/ItemFactory'
import ControlBar from './components/ControlBar'
import useItemData from './hooks/useItemData'


const ItemView = ({ itemId, itemType, navigateToMap, navigateToEditSubitem, navigateToEdit }) => {
    const { item, loading, updateStatus, createSubitem, deleteItem, displayOnMap } = useItemData({ itemId, itemType, navigateToMap, navigateToEditSubitem })
    return (
        <View style={loading ? styles.card : globalStyle.card}>
            <LoadingView loading={loading}>
                <ItemFactory
                    updateTap={() => { }}
                    updateStatus={updateStatus}
                    data={item}
                    itemType={itemType} />
                <View style={styles.bar}>
                    <ControlBar
                        itemType={itemType}
                        createSubitem={createSubitem}
                        deleteItem={deleteItem}
                        displayOnMap={displayOnMap}
                        navigateToEdit={navigateToEdit} />
                </View>
            </LoadingView>
        </View>
    )
}

export default ItemView

const styles = StyleSheet.create({
    card: {
        ...globalStyle.card,
        minHeight: 200
    },
    bar: {
        marginHorizontal: -12,
        marginBottom: -12,
        marginTop: 12
    }
})