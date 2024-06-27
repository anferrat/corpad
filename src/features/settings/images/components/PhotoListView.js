import React, { useContext } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import PhotoListItem from './PhotoListItem'
import ImageView from './ImageView'
import { imageLength, separatorWidth, numberOfColumns } from '../constants/dimensions'
import { globalStyle } from '../../../../styles/styles'
import { ImageListContext } from '../contexts/ImageListContext'
import ListHeader from './ListHeader'
import EmptyListComponent from './EmptyListComponent'

const getItemLayout = (data, index) => {
    return {
        length: imageLength + separatorWidth,
        offset: (imageLength + separatorWidth) * index,
        index
    }
}


const keyExtractor = (item) => item.fileName

const PhotoListView = () => {
    const media = useContext(ImageListContext)
    const renderItem = React.useCallback(({ item, index }) => {
        const { source } = item
        return <PhotoListItem
            index={index}
            source={source} />
    }, [])

    return (
        <>
            <FlatList
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={EmptyListComponent}
                numColumns={numberOfColumns}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                style={styles.flatList}
                renderItem={renderItem}
                data={media}
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false} />
            <ImageView />
        </>
    )
}

export default PhotoListView

const styles = StyleSheet.create({
    mainView: {

    },
    container: {
        flexGrow: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginHorizontal: 0
    },
})