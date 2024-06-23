import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import PhotoListItem from './PhotoListItem'
import ImageView from './ImageView'
import { imageLength, separatorWidth } from '../constants/dimensions'
import useImageList from '../hooks/useImageList'
import { globalStyle } from '../../../../styles/styles'

const getItemLayout = (data, index) => {
    return {
        length: imageLength + separatorWidth,
        offset: (imageLength + separatorWidth) * index,
        index
    }
}

const keyExtractor = (item) => item.fileName

const PhotoListView = ({ goBack, navigateToItem }) => {

    const {
        media,
        uriList,
        selectedIndex,
        itemName,
        itemType,
        isViewVisible,
        goToItem,
        onPhotoPress,
        onImageViewClose,
        onShare,
        onSave,
        onImageIndexChange
    } = useImageList({ goBack, navigateToItem })

    const renderItem = React.useCallback(({ item, index }) => {
        const { source } = item
        return <PhotoListItem
            index={index}
            onPress={onPhotoPress}
            source={source} />
    }, [onPhotoPress])

    return (
        <View
            style={styles.mainView}>
            <FlatList
                numColumns={3}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                style={styles.flatList}
                renderItem={renderItem}
                data={media}
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false} />
            <ImageView
                uriList={uriList}
                isVisible={isViewVisible}
                goToItem={goToItem}
                itemName={itemName}
                itemType={itemType}
                selectedIndex={selectedIndex}
                onImageIndexChange={onImageIndexChange}
                onClose={onImageViewClose}
                onShare={onShare}
                onSave={onSave}
            />
        </View>
    )
}

export default PhotoListView

const styles = StyleSheet.create({
    mainView: {
        ...globalStyle.card_noPadding,
        flex: 1
    },
    container: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 12,
        paddingRight: 12 - separatorWidth,
    },
    flatList: {
        marginHorizontal: -12
    }
})