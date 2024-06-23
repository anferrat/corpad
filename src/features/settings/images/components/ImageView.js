import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import ImageViewDefault from 'react-native-image-viewing'
import ImageViewControlBar from './ImageViewControlBar'


const ImageView = ({ uriList, selectedIndex, onClose, onShare, onSave, goToItem, isVisible, itemType, itemName, onImageIndexChange }) => {

    const footer = React.memo(() => <ImageViewControlBar
        onShare={onShare}
        onSave={onSave}
        goToItem={goToItem}
        itemType={itemType}
        itemName={itemName}
    />)
    return (
        <>
            {isVisible ?
                <StatusBar
                    backgroundColor='#000'
                    barStyle={'light-content'}
                    translucent={true} /> : null}
            <ImageViewDefault
                onImageIndexChange={onImageIndexChange}
                FooterComponent={footer}
                presentationStyle='fullScreen'
                images={uriList}
                imageIndex={selectedIndex}
                visible={isVisible}
                onRequestClose={onClose} />
        </>
    )
}

export default ImageView