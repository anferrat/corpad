import { Dimensions } from "react-native"

/*  x - approx desired size of image
    w - available screen width
    y - size of the gap between images
    a - resulted size of the image
    n - number of columns

*/

const p = 0 //padding of parent component
const w = Dimensions.get('window').width - p
const y = 6
const x = 120 //set what you want - approx size of the image
const n = Math.floor(w / x)
const a = Math.ceil((w - y * (n - 1)) / n)

export const imageLength = a
export const separatorWidth = y
export const numberOfColumns = n