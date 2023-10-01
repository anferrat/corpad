import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import { primary } from '../styles/colors'

const sizes = {
    'small': 20,
    'medium': 20,
    'large': 40
}

const WaveActivityIndicator = ({ size, color }) => {
    return (
        <BarIndicator
            style={styles.container}
            color={color ?? primary}
            size={sizes[size] ?? 30}
            count={4}
        />
    )
}

export default WaveActivityIndicator

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
})