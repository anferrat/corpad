import { useDispatch } from "react-redux"
import { useBottomSheetNavigation } from "../../../../hooks/bottom_sheet/useBottomSheetNavigation"
import { deleteEditImage } from "../../../../store/actions/item"
import { useCallback, useRef, useState } from "react"
import { PHOTO_LIMIT } from "../../../../constants/global"

const useItemPhotos = ({ itemId, itemType, imageUris }) => {
    const dispatch = useDispatch()
    const { openImagePicker } = useBottomSheetNavigation()
    const photoListRef = useRef()
    const [imageViewVisible, setImageViewVisible] = useState(false)
    const [imageViewIndex, setImageViewIndex] = useState(0)
    const limitReached = imageUris.length >= PHOTO_LIMIT

    const onAddPhoto = useCallback(() => {
        console.log('hahaha')
        openImagePicker({ itemType, itemId })}, [])

    const onDeletePhoto = useCallback((index) => {
        dispatch(deleteEditImage(index))
        closeImageView()
        if (photoListRef.current.scrollToIndex)
            photoListRef.current.scrollToIndex({ index: 0, animated: true })
    }, [])

    const closeImageView = useCallback(() => {
        setImageViewVisible(false)
        setImageViewIndex(0)
    }, [])

    const onPhotoPress = useCallback((index) => {
        setImageViewVisible(true)
        setImageViewIndex(index)
    }, [])

    return {
        imageUris,
        photoListRef,
        imageViewVisible,
        imageViewIndex,
        limitReached,
        onAddPhoto,
        onDeletePhoto,
        closeImageView,
        onPhotoPress,
    }
}

export default useItemPhotos