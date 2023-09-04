import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import AddPhotoButton from './AddPhotoButton'
import PhotoListItem from './PhotoListItem'
import ImageView from './ImageView'
import IconLine from '../IconLine'
import { imageLength, separatorWidth } from './constants/dimensions'

const getItemLayout = (data, index) => {
    return {
        length: imageLength + separatorWidth,
        offset: (imageLength + separatorWidth) * index,
        index
    }
}

const keyExtractor = (item) => item.fileName

const PhotoListView = ({ onAddPhoto, onPhotoPress, photos, onImageViewClose, imageView, limitReached, onDeletePhoto, listRef, isVisible, onSharePhoto }) => {
    const addButton = () =>
        <AddPhotoButton
            onPress={onAddPhoto}
            limitReached={limitReached} />

    const uriList = React.useMemo(() => photos.map(({ source }) => source), [photos])

    const renderItem = React.useCallback(({ item, index }) => {
        const { source } = item
        return <PhotoListItem
            index={index}
            onPress={onPhotoPress}
            source={source} />
    }, [onPhotoPress])
    if (isVisible)
        return (
            <>
                {photos.length > 0 ? <IconLine
                    value={`Images (${photos.length}/6)`}
                    icon={'image-outline'} /> : null}
                <FlatList
                    keyExtractor={keyExtractor}
                    ref={listRef}
                    getItemLayout={getItemLayout}
                    style={styles.flatList}
                    renderItem={renderItem}
                    data={photos}
                    contentContainerStyle={styles.container}
                    horizontal={true}

                    showsHorizontalScrollIndicator={false} />
                <ImageView
                    images={uriList}
                    imageView={imageView}
                    onImageViewClose={onImageViewClose}
                    onDeletePhoto={onDeletePhoto}
                    onSharePhoto={onSharePhoto}
                />
            </>
        )
    else return null
}

export default PhotoListView

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
        paddingRight: 12 - separatorWidth,
    },
    flatList: {
        marginHorizontal: -12
    }
})