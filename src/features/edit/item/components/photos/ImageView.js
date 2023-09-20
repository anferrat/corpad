import React from 'react'
import { StatusBar } from 'react-native'
import ImageViewDefault from 'react-native-image-viewing'
import ImageViewControlBar from './ImageViewControlBar'


const ImageView = ({ imageUris, visible, imageIndex, onRequestClose, onDeletePhoto }) => {

    const onDelete = React.useCallback(() => onDeletePhoto(imageIndex), [imageIndex, onDeletePhoto])
    
    const footer = React.memo(() => <ImageViewControlBar
        onDeletePhoto={onDelete} />)

    const images = imageUris.map(uri => ({ uri }))

    return (
        <>
            {visible ?
                <StatusBar
                    backgroundColor='#000'
                    barStyle={'light-content'}
                    translucent={true} /> : null}
            <ImageViewDefault
                FooterComponent={footer}
                presentationStyle='fullScreen'
                images={images}
                imageIndex={imageIndex}
                visible={visible}
                onRequestClose={onRequestClose} />
        </>
    )
}

export default ImageView