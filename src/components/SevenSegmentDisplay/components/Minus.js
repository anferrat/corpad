import React from 'react'
import { View, StyleSheet } from 'react-native'
import { basic1000, control } from '../../../styles/colors'


const Minus = ({ isOn, width, height, onColor }) => {
    return (
        <View style={{ width: width, height: height, backgroundColor: isOn ? (onColor ?? basic1000) : control, marginRight: width / 12, alignSelf: 'center', }} />
    )
}

export default Minus

const styles = StyleSheet.create({
    on: {
        alignSelf: 'center',
        width: 28,
        height: 12,
        marginRight: 12,
        backgroundColor: basic1000,
    },
    off: {
        marginVertical: 3,
        backgroundColor: control,
        width: 28,
        height: 12
    },
})