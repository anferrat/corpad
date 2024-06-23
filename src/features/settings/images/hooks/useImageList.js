import { useState, useEffect, useCallback, useRef } from "react"
import { getSurveyAssetList, savePhotoToDownloads, sharePhoto } from "../../../../app/controllers/survey/other/MediaController"
import { errorHandler } from "../../../../helpers/error_handler"
import { getItemById } from "../../../../app/controllers/survey/items/ItemController"
import { Platform, ToastAndroid } from "react-native"

const defaultItem = {
    id: null,
    name: null,
    type: null
}

const useImageList = ({ goBack, navigateToItem }) => {
    const [media, setMedia] = useState([])
    const [uriList, setUriList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [isViewVisible, setIsViewVisible] = useState(false)
    const [item, setItem] = useState(defaultItem)
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        const loadImages = async () => {
            getSurveyAssetList(
                er => errorHandler(er, go),
                ({ uriList, assets }) => {
                    if (componentMounted.current) {
                        setUriList(uriList)
                        setMedia(assets)
                    }
                }
            )
        }
        loadImages()

        return () => {
            componentMounted.current = false
        }
    }, [])

    const onPhotoPress = useCallback((index) => {
        setSelectedIndex(index)
        setIsViewVisible(true)
    }, [])

    useEffect(() => {
        const updateItem = () => {
            setItem(defaultItem)
            const selectedItem = media[selectedIndex]
            if (selectedItem) {
                const { parentId, parentType } = selectedItem
                getItemById({ id: parentId, itemType: parentType },
                    er => setItem(defaultItem),
                    ({ name }) => setItem({
                        id: parentId,
                        name,
                        type: parentType
                    })
                )
            }
        }
    }, [selectedIndex])

    const goToItem = useCallback(() => {
        if (item.id && item.type) {
            onImageViewClose()
            navigateToItem(item.id, item.type)
        }
    }, [item])

    const onImageViewClose = useCallback(() => {
        setIsViewVisible(false)
        setSelectedIndex(null)
    }, [])

    const onImageIndexChange = useCallback((index) => {
        const updateItem = () => {
            setItem(defaultItem)
            const selectedItem = media[index]
            if (selectedItem) {
                const { parentId, parentType } = selectedItem
                getItemById({ id: parentId, itemType: parentType },
                    er => setItem(defaultItem),
                    ({ name }) => setItem({
                        id: parentId,
                        name,
                        type: parentType
                    })
                )
            }
        }
        updateItem()
    }, [media])

    const onShare = useCallback(() => {
        const selectedMedia = media[selectedIndex]
        if (selectedMedia && isViewVisible)
            sharePhoto({ uri: selectedMedia.source.uri })
    }, [selectedIndex, media, isViewVisible])

    const onSave = useCallback(() => {
        const selectedMedia = media[selectedIndex]
        if (selectedMedia && isViewVisible) {
            savePhotoToDownloads(
                { path: selectedMedia.source.uri, name: selectedMedia.fileName },
                er => errorHandler(er),
                () => {
                    if (Platform.OS === 'android')
                        ToastAndroid.showWithGravity('Saved to Downloads', 1000, ToastAndroid.BOTTOM)
                }
            )
        }
    }, [selectedIndex, media, isViewVisible])

    return {
        media,
        uriList,
        selectedIndex,
        isViewVisible,
        itemName: item.name,
        itemType: item.type,
        goToItem,
        onPhotoPress,
        onImageViewClose,
        onShare,
        onSave,
        onImageIndexChange
    }
}

export default useImageList