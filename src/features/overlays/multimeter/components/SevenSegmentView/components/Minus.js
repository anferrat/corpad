import React from 'react'
import { View } from 'react-native'
import MinusSvg from '../assets/MinusSvg'


const Minus = ({ w, color, isVisible }) => {
    return (
        <View style={{ height: 2 * w, width: w, justifyContent: 'center', alignItems: 'center' }}>
            {isVisible ?
                <MinusSvg
                    color={color}
                    segmentWidth={w} /> : null}
        </View>
    )
}

export default Minus
