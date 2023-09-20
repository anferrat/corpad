import { Dimensions } from "react-native"

const imageLength = Math.floor(Dimensions.get('window').width / 4)

const separatorWidth = Math.min(Math.floor(Dimensions.get('window').width / 40), 12)

export const dimensions = {
    length: imageLength,
    separator: separatorWidth
}
