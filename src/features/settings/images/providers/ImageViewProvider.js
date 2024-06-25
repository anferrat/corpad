import React from 'react'
import { ImageViewContext } from '../contexts/ImageViewContext'
import useImageList from '../hooks/useImageList'
import { PhotoItemContext } from '../contexts/PhotoItemContext'
import { ImageListContext } from '../contexts/ImageListContext'
import LoadingView from '../../../../components/LoadingView'

const ImageViewProvider = ({ goBack, navigateToItem, children }) => {
    const imageListData = useImageList({ goBack, navigateToItem })
    const { onPhotoPress, media, isLoading } = imageListData
    return (
        <ImageViewContext.Provider value={imageListData}>
            <PhotoItemContext.Provider value={onPhotoPress}>
                <ImageListContext.Provider value={media}>
                    <LoadingView
                        loading={isLoading}>
                        {children}
                    </LoadingView>
                </ImageListContext.Provider>
            </PhotoItemContext.Provider>
        </ImageViewContext.Provider>
    )
}


export default ImageViewProvider
