import React from 'react'
import { View, StyleSheet } from 'react-native'
import SevenSegmentDigit from '../base'

const Digit = ({ w, value, color, offColor }) => {
    return (
        <View
            style={{ marginLeft: w / 2 }}>
            <SevenSegmentDigit
                w={w}
                value={value}
                onColor={color}
                offColor={offColor}
            />
        </View>
    )
}


export default Digit

const styles = StyleSheet.create({
    container: {

    },
})