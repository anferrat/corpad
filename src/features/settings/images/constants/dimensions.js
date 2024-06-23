import { Dimensions } from "react-native"

/*  x - approx desired size of image
    w - available screen width
    y - size of the gap
    a - resulted size of the image
    n - number of columns

*/

const p = 12 //padding of parent component
const w = Dimensions.get('window').width - p
const y = 6
const x = 120 //set what you want
const n = Math.floor(w / x)
const a = Math.ceil((w - y * (n - 1)) / n)

export const imageLength = a
export const separatorWidth = y
export const numberOfColumns = n