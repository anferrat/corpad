import { useCallback, useEffect, useRef, useState } from "react"
import { useBottomSheetNavigation } from "../../../hooks/bottom_sheet/useBottomSheetNavigation"
import { getItemPhotos } from "../../../app/controllers/survey/items/ItemController"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"
import { deletePhotoFromAssets, sharePhoto } from "../../../app/controllers/survey/other/MediaController"
import { FileMimeTypes, ItemTypes } from "../../../constants/global"
import { useSelector } from "react-redux"

const PHOTO_LIMIT = 6

const usePhotos = ({ itemId, itemType }) => {
    const listRef = useRef()
    const surveyUid = useSelector(state => state.settings.currentSurvey.uid)
    const [photos, setPhotos] = useState([])
    const [imageView, setImageView] = useState({
        index: 0,
        visible: false
    })

    const limitReached = photos.length >= PHOTO_LIMIT
    const isVisible = itemType !== ItemTypes.PIPELINE

    const { openImagePicker } = useBottomSheetNavigation()

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getItemPhotos({ itemId, itemType, surveyUid })
            if (status === 200) {
                setPhotos(response)
            }
            else
                errorHandler(status)
        }
        loadData()
        const onPhotoAdd = EventRegister.addEventListener('ASSET_ADDED', (asset) => {
            const { parentId, parentType } = asset
            if (parentId === itemId && parentType === itemType) {
                setPhotos(state => [asset].concat(state))
                if (listRef.current.scrollToIndex)
                    listRef.current.scrollToIndex({ index: 0, animated: true })
            }
        })

        const onPhotoRemoved = EventRegister.addEventListener('ASSET_REMOVED', (item) => {
            if (item.itemId === itemId && item.itemType === itemType) {
                setPhotos(state => {
                    if (state.length > 1 && listRef.current.scrollToIndex)
                        listRef.current.scrollToIndex({ index: 0, animated: true })
                    return state.filter(({ id }) => id !== item.assetId)
                })
                setImageView({ index: 0, visible: false })
            }
        })
        return () => {
            EventRegister.removeEventListener(onPhotoAdd)
            EventRegister.removeEventListener(onPhotoRemoved)
        }
    }, [])




    const onAddPhoto = () => !limitReached ? openImagePicker({ itemType, itemId }) : null

    const onSharePhoto = async () => {
        if (imageView.visible)
            sharePhoto({ uri: photos[imageView.index].source.uri, mimeType: FileMimeTypes.IMAGE })
    }

    const onDeletePhoto = async () => {
        if (imageView.visible) {
            const confirm = await warningHandler(48, 'Delete', 'Cancel')
            if (confirm)
                deletePhotoFromAssets({ assetId: photos[imageView.index].id, fileName: photos[imageView.index].fileName, parentId: itemId, parentType: itemType, surveyUid },
                    er => errorHandler(er),
                    ({ currentTime }) => EventRegister.emit('ASSET_REMOVED', { assetId: photos[imageView.index].id, itemType, itemId, currentTime }))
        }
    }

    const onPhotoPress = useCallback((index) => {
        setImageView({
            visible: true,
            index: index
        })
    }, [])

    const onImageViewClose = useCallback(() => setImageView({
        visible: false,
        index: 0
    }))

    return {
        photos,
        imageView,
        limitReached,
        listRef,
        isVisible,
        onAddPhoto,
        onDeletePhoto,
        onImageViewClose,
        onPhotoPress,
        onSharePhoto
    }
}

export default usePhotos