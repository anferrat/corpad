import { createContext } from "react"

const emptyFunc = () => { }

export const ImageViewContext = createContext({
    uriList: [],
    selectedIndex: null,
    isViewVisible: false,
    itemName: null,
    itemType: null,
    timeCreated: null,
    onPhotoPress: emptyFunc,
    goToItem: emptyFunc,
    onImageViewClose: emptyFunc,
    onShare: emptyFunc,
    onSave: emptyFunc,
    onImageIndexChange: emptyFunc
})