import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
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

const PhotoListView = ({ onPhotoPress, photos, onImageViewClose, imageView, onDeletePhoto, listRef, isVisible, onSharePhoto }) => {
 
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
            <View
                style={styles.mainView}>
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
            </View>
        )
    else return null
}

export default PhotoListView

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 0
    },
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