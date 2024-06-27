import React from 'react'
import { StyleSheet } from 'react-native'
import PhotoListView from './components/PhotoListView'
import ImageViewProvider from './providers/ImageViewProvider'


const ImageList = ({ goBack, navigateToItem, }) => {
    return (
        <ImageViewProvider
            goBack={goBack}
            navigateToItem={navigateToItem}>
            <PhotoListView />
        </ImageViewProvider>
    )
}


export default ImageList