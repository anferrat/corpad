import { useState, useEffect, useCallback, useRef } from "react"
import { getSurveyAssetList, savePhotoToDownloads, sharePhoto } from "../../../../app/controllers/survey/other/MediaController"
import { errorHandler } from "../../../../helpers/error_handler"
import { getItemById } from "../../../../app/controllers/survey/items/ItemController"
import { Platform, ToastAndroid } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { useSelector } from "react-redux"

const defaultItem = {
    id: null,
    name: null,
    type: null,
    timeCreated: null
}

const useImageList = ({ goBack, navigateToItem }) => {
    const surveyName = useSelector(state => state.settings.currentSurvey.name)
    const [isLoading, setIsLoading] = useState(true)
    const [media, setMedia] = useState([])
    const [totalSize, setTotalSize] = useState(null)
    const [uriList, setUriList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [isViewVisible, setIsViewVisible] = useState(false)
    const [item, setItem] = useState(defaultItem)
    const isFocused = useIsFocused()
    const componentMounted = useRef(true)

    useEffect(() => {
        setIsLoading(true)
        const loadImages = async () => {
            await getSurveyAssetList(
                er => errorHandler(er, goBack),
                ({ uriList, assets, size }) => {
                    if (componentMounted.current) {
                        setUriList(uriList)
                        setMedia(assets)
                        setTotalSize(size)
                        setIsLoading(false)
                    }
                }
            )
        }
        if (isFocused)
            loadImages()

        return () => {
        }
    }, [isFocused])

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    const onPhotoPress = useCallback((index) => {
        setSelectedIndex(index)
        setIsViewVisible(true)
    }, [])

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
                const { parentId, parentType, timeCreated } = selectedItem
                getItemById({ id: parentId, itemType: parentType },
                    () => setItem(defaultItem),
                    ({ name }) => setItem({
                        id: parentId,
                        name,
                        type: parentType,
                        timeCreated
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
        isLoading,
        media,
        uriList,
        selectedIndex,
        isViewVisible,
        itemName: item.name,
        itemType: item.type,
        timeCreated: item.timeCreated,
        totalSize,
        numberOfImages: media.length,
        surveyName,
        goToItem,
        onPhotoPress,
        onImageViewClose,
        onShare,
        onSave,
        onImageIndexChange
    }
}

export default useImageList