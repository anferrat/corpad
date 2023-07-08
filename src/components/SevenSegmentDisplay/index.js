import React from 'react'
import { View, StyleSheet } from 'react-native'
import SevenSegmentDisplay, { segmentMap } from 'rn-seven-segment-display'


const MySevenSegmentDisplay = () => {
    return (
        <View style={styles.container}>
            {/* Add your content here */}
        </View>
    )
}

export default MySevenSegmentDisplay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})