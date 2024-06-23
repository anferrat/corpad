import React from 'react'
import { View, StyleSheet } from 'react-native'
import PhotoListView from './components/PhotoListView'


const ImageList = ({ goBack, navigateToItem }) => {
    return (
        <PhotoListView
            goBack={goBack}
            navigateToItem={navigateToItem}
        />
    )
}


export default ImageList

const styles = StyleSheet.create({
    container: {

    },
})