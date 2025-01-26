import React from 'react'
import { View } from 'react-native'

const Point = ({ w, color }) => {
    const size = w / 4
    const margin = Math.floor((w / 8))
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: Math.round(size / 2),
            backgroundColor: color,
            marginLeft: margin,
            marginRight: -3*margin,
            alignSelf: 'flex-end'
        }} />
    )
}

export default Point
