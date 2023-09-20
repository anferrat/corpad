import React, { useCallback } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { globalStyle } from '../../../../../styles/styles'
import { dimensions } from './size'
import ImageView from './ImageView'
import AddPhotoButton from './AddPhotoButton'
import PhotoListItem from './PhotoListItem'
import useItemPhotos from '../../hooks/useItemPhotos'
import { Text } from '@ui-kitten/components'

const getItemLayout = (_, index) => {
    const length = dimensions.length + dimensions.separator
    return {
        length: length,
        offset: length * index,
        index
    }
}

const PhotoView = ({ itemId, itemType, imageUris }) => {
    const { onAddPhoto, onDeletePhoto, photoListRef, imageViewVisible, imageViewIndex, closeImageView, limitReached, onPhotoPress } = useItemPhotos({ itemId, itemType, imageUris })
    const renderItem = useCallback(({ item, index }) => (
        <PhotoListItem
            onPress={onPhotoPress}
            index={index}
            uri={item} />
    ), [])

    return (
        <View style={styles.mainView}>
            <Text
                appearance='hint'
                category='label'>Images ({imageUris.length}/6)</Text>
            <FlatList
                ListFooterComponent={() => <AddPhotoButton
                    onPress={onAddPhoto}
                    limitReached={limitReached} />}
                ref={photoListRef}
                getItemLayout={getItemLayout}
                style={styles.flatList}
                renderItem={renderItem}
                data={imageUris}
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                horizontal={true} />
            <ImageView
                imageUris={imageUris}
                visible={imageViewVisible}
                imageIndex={imageViewIndex}
                onRequestClose={closeImageView}
                onDeletePhoto={onDeletePhoto} />
        </View>
    )
}

export default PhotoView

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    container: {
        flexGrow: 1,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12
    },
    flatList: {
        marginHorizontal: -12
    }
})