import { Dimensions } from "react-native"

export const imageLength = Math.floor(Dimensions.get('window').width / 2.8)
export const separatorWidth = Math.min(Math.floor(Dimensions.get('window').width / 40), 12)