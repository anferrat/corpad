import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoadingView from '../../components/LoadingView'
import { globalStyle } from '../../styles/styles'
import ItemFactory from './components/ItemFactory'
import ControlBar from './components/ControlBar'
import useItemData from './hooks/useItemData'


const ItemView = ({ itemId, itemType, navigateToMap, navigateToEditSubitem, navigateToEdit }) => {
    const { item, loading, displayOnMapVisible, submit, update, createSubitem, deleteItem, displayOnMap } = useItemData({ itemId, itemType, navigateToMap, navigateToEditSubitem })

    const updateStatus = (value) => submit(value, 'status')

    return (
        <View style={globalStyle.card}>
            <LoadingView loading={loading} style={styles.loading}>
                <ItemFactory
                    submit={submit}
                    update={update}
                    updateStatus={updateStatus}
                    data={item}
                    itemType={itemType} />
                <View style={styles.bar}>
                    <ControlBar
                        itemType={itemType}
                        displayOnMapVisible={displayOnMapVisible}
                        createSubitem={createSubitem}
                        deleteItem={deleteItem}
                        displayOnMap={displayOnMap}
                        navigateToEdit={navigateToEdit} />
                </View>
            </LoadingView>
        </View>
    )
}

export default React.memo(ItemView)

const styles = StyleSheet.create({
    card: {
        ...globalStyle.card,
        flex: -1
    },
    loading: {
        minHeight: 250
    },
    bar: {
        marginHorizontal: -12,
        marginBottom: -12,
        marginTop: 12
    }
})