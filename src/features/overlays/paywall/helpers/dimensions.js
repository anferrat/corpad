import { Dimensions } from 'react-native'

const screenHeight = Dimensions.get('window').height

export const size = screenHeight * 0.7 < 500 ? screenHeight - 540 : screenHeight * 0.3