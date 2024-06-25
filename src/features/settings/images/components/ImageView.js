import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import ImageViewDefault from 'react-native-image-viewing'
import ImageViewControlBar from './ImageViewControlBar'
import { ImageViewContext } from '../contexts/ImageViewContext'


const ImageView = () => {
    const {
        uriList,
        selectedIndex,
        onImageViewClose,
        onShare,
        onSave,
        goToItem,
        isViewVisible,
        itemType,
        itemName,
        timeCreated,
        onImageIndexChange
    } = useContext(ImageViewContext)

    const footer = React.memo(() => <ImageViewControlBar
        onShare={onShare}
        onSave={onSave}
        goToItem={goToItem}
        itemType={itemType}
        itemName={itemName}
        timeCreated={timeCreated}
    />)
    return (
        <>
            {isViewVisible ?
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
                visible={isViewVisible}
                onRequestClose={onImageViewClose} />
        </>
    )
}

export default ImageView