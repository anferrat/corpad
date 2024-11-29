import { Dimensions } from "react-native"

const dimensions = Dimensions.get('window')

export const getModalTop = (modalHeight) => {
    return Math.round((dimensions.height - modalHeight) / 2)
}