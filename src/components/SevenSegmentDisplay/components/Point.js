import React from 'react'
import { View } from 'react-native'
import { basic1000, control } from '../../../styles/colors'


const Point = ({ isOn, height, onColor }) => {
    return (
        <View style={{ width: height, height: height, backgroundColor: isOn ? (onColor ?? basic1000) : control, marginVertical: 3, marginHorizontal: 1 }} />
    )
}

export default Point
