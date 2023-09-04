import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import ImageViewDefault from 'react-native-image-viewing'
import ImageViewControlBar from './ImageViewControlBar'


const ImageView = ({ images, imageView, onImageViewClose, onDeletePhoto, onSharePhoto }) => {

    const footer = React.memo(() => <ImageViewControlBar
        onSharePhoto={onSharePhoto}
        onDeletePhoto={onDeletePhoto} />)
    return (
        <>
            {imageView.visible ?
                <StatusBar
                    backgroundColor='#000'
                    barStyle={'light-content'}
                    translucent={true} /> : null}
            <ImageViewDefault
                FooterComponent={footer}
                presentationStyle='fullScreen'
                images={images}
                imageIndex={imageView.index}
                visible={imageView.visible}
                onRequestClose={onImageViewClose} />
        </>
    )
}

export default ImageView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})