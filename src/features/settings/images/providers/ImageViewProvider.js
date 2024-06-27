import React from 'react'
import { ImageViewContext } from '../contexts/ImageViewContext'
import useImageList from '../hooks/useImageList'
import { PhotoItemContext } from '../contexts/PhotoItemContext'
import { ImageListContext } from '../contexts/ImageListContext'
import LoadingView from '../../../../components/LoadingView'
import { ImageListHeaderContext } from '../contexts/ImageListHeaderContext'

const ImageViewProvider = ({ goBack, navigateToItem, children }) => {
    const imageListData = useImageList({ goBack, navigateToItem })
    const { onPhotoPress, media, numberOfImages, totalSize, isLoading, surveyName } = imageListData

    const headerData = React.useMemo(() => ({
        numberOfImages,
        totalSize,
        surveyName
    }), [numberOfImages, totalSize, surveyName])

    return (
        <ImageViewContext.Provider value={imageListData}>
            <PhotoItemContext.Provider value={onPhotoPress}>
                <ImageListContext.Provider value={media}>
                    <ImageListHeaderContext.Provider value={headerData}>
                        <LoadingView
                            loading={isLoading}>
                            {children}
                        </LoadingView>
                    </ImageListHeaderContext.Provider>
                </ImageListContext.Provider>
            </PhotoItemContext.Provider>
        </ImageViewContext.Provider>
    )
}


export default ImageViewProvider
