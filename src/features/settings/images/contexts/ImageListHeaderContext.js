import { createContext } from "react"

export const ImageListHeaderContext = createContext({
    totalSize: null,
    numberOfImages: null,
    navigateToCachedImages: () => { }
})