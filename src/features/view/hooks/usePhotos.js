import { useCallback, useEffect, useRef, useState } from "react"
import { useBottomSheetNavigation } from "../../../hooks/bottom_sheet/useBottomSheetNavigation"
import { getItemPhotos } from "../../../app/controllers/survey/items/ItemController"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"
import { addPhotoToAssets, deletePhotoFromAssets, savePhotoToDownloads, sharePhoto } from "../../../app/controllers/survey/other/MediaController"
import { ItemTypes } from "../../../constants/global"
import { useDispatch } from "react-redux"
import { updateLoader, hideLoader, showPaywall } from "../../../store/actions/settings"
import { ImageSourceLabels } from "../../../constants/labels"
import { useIsFocused } from "@react-navigation/native"
import { PHOTO_LIMIT } from "../../../constants/global"
import { Platform, ToastAndroid } from "react-native"
import { useSelector } from "react-redux"
import { isProStatus } from "../../../helpers/functions"

const usePhotos = ({ itemId, itemType }) => {
    const listRef = useRef()
    const name = useSelector(state => state.item.view.name ?? 'Error')
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
    const componentMounted = useRef(true)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [photos, setPhotos] = useState([])
    const [imageView, setImageView] = useState({
        index: 0,
        visible: false
    })

    const onShowPaywall = useCallback(() => {
        dispatch(showPaywall())
    }, [])

    const scrollToStart = useCallback(() => {
        if (listRef.current.scrollToIndex)
            listRef.current.scrollToIndex({ index: 0, animated: true })
    }, [])

    const limitReached = photos.length >= PHOTO_LIMIT
    const isVisible = itemType !== ItemTypes.PIPELINE

    const { openImagePicker } = useBottomSheetNavigation()

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getItemPhotos({ itemId, itemType })
            if (status === 200) {
                if (componentMounted.current) {
                    setPhotos(response)
                    if (response.length > 0)
                        scrollToStart()
                }
            }
            else
                errorHandler(status)
        }
        if (isFocused)
            loadData()

        const onPhotoAdd = EventRegister.addEventListener('PHOTO_ADDED', async (photo) => {
            if (photo.itemId === itemId && photo.itemType === itemType && isFocused) {
                dispatch(updateLoader('Adding image', ImageSourceLabels[photo.imageSource]))
                const { status, response } = await addPhotoToAssets({ uri: photo.uri, name: photo.name, itemId, itemType })
                if (status === 200) {
                    setPhotos(state => [response].concat(state))
                    EventRegister.emit('ASSET_ADDED', response)
                    scrollToStart()
                }
                else errorHandler(status)
                dispatch(hideLoader())
            }
        })

        const onPhotoRemoved = EventRegister.addEventListener('ASSET_REMOVED', (item) => {
            if (item.itemId === itemId && item.itemType === itemType && isFocused) {
                setPhotos(state => {
                    if (state.length > 1)
                        scrollToStart()
                    return state.filter(({ id }) => id !== item.assetId)
                })
            }
        })
        return () => {
            EventRegister.removeEventListener(onPhotoAdd)
            EventRegister.removeEventListener(onPhotoRemoved)
        }
    }, [isFocused])




    const onAddPhoto = () => isPro ? (!limitReached ? openImagePicker({ itemType, itemId }) : null) : onShowPaywall()

    const onSharePhoto = async () => {
        if (imageView.visible)
            sharePhoto({ uri: photos[imageView.index].source.uri })
    }

    const onSavePhoto = async () => {
        if (imageView.visible) {
            const { status } = await savePhotoToDownloads({ path: photos[imageView.index].source.uri, name }, er => errorHandler(er))
            if (Platform.OS === 'android' && status === 200)
                ToastAndroid.showWithGravity('Saved to Downloads', 1000, ToastAndroid.BOTTOM)
        }
    }

    const onDeletePhoto = async () => {
        if (imageView.visible) {
            const confirm = await warningHandler(48, 'Delete', 'Cancel')
            if (confirm) {
                setImageView({ index: 0, visible: false })
                dispatch(updateLoader('Deleting photo'))
                await deletePhotoFromAssets({ assetId: photos[imageView.index].id, fileName: photos[imageView.index].fileName, parentId: itemId, parentType: itemType },
                    er => errorHandler(er),
                    ({ currentTime }) => EventRegister.emit('ASSET_REMOVED', { assetId: photos[imageView.index].id, itemType, itemId, currentTime }))
                dispatch(hideLoader())
            }
        }
    }

    const onPhotoPress = useCallback((index) => {
        isPro ?
            setImageView({
                visible: true,
                index: index
            }) :
            onShowPaywall()
    }, [isPro, onShowPaywall])

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
        isPhotoCaptureDisabled: !isPro,
        onAddPhoto,
        onDeletePhoto,
        onImageViewClose,
        onPhotoPress,
        onSharePhoto,
        onSavePhoto
    }
}

export default usePhotos