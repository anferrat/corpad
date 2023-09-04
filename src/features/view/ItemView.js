import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoadingView from '../../components/LoadingView'
import { globalStyle } from '../../styles/styles'
import ItemFactory from './components/ItemFactory'
import ControlBar from './components/ControlBar'
import useItemData from './hooks/useItemData'
import PhotoListView from './components/photos/PhotoListView'
import usePhotos from './hooks/usePhotos'


const ItemView = ({ itemId, itemType, navigateToMap, navigateToEditSubitem, navigateToEdit }) => {
    const { item, loading, displayOnMapVisible, submit, update, createSubitem, deleteItem, displayOnMap } = useItemData({ itemId, itemType, navigateToMap, navigateToEditSubitem })
    const { onAddPhoto, onPhotoPress, onImageViewClose, onDeletePhoto, onSharePhoto, photos, imageView, limitReached, listRef, isVisible } = usePhotos({ itemId, itemType })
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
                <PhotoListView
                    onAddPhoto={onAddPhoto}
                    onPhotoPress={onPhotoPress}
                    onImageViewClose={onImageViewClose}
                    onDeletePhoto={onDeletePhoto}
                    onSharePhoto={onSharePhoto}
                    imageView={imageView}
                    limitReached={limitReached}
                    photos={photos}
                    listRef={listRef}
                    isVisible={isVisible} />
                <View style={styles.bar}>
                    <ControlBar
                        itemType={itemType}
                        displayOnMapVisible={displayOnMapVisible}
                        createSubitem={createSubitem}
                        deleteItem={deleteItem}
                        displayOnMap={displayOnMap}
                        navigateToEdit={navigateToEdit}
                        onAddPhoto={onAddPhoto}
                        addPhotoAvailable={!limitReached && isVisible} />
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
    }
})