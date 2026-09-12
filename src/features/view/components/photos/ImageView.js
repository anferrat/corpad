import React from 'react'
import ImageViewDefault from 'react-native-image-viewing'
import ImageViewControlBar from './ImageViewControlBar'


const ImageView = ({ images, imageView, onImageViewClose, onDeletePhoto, onSharePhoto, onSavePhoto }) => {

    const footer = React.memo(() => <ImageViewControlBar
        onSharePhoto={onSharePhoto}
        onDeletePhoto={onDeletePhoto}
        onSavePhoto={onSavePhoto}
    />)
    return (
        <ImageViewDefault
            FooterComponent={footer}
            presentationStyle='overFullScreen'
            images={images}
            imageIndex={imageView.index}
            visible={imageView.visible}
            onRequestClose={onImageViewClose} />
    )
}

export default ImageView