import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'


const LoadingView = () => {
    return <View style={styles.emptyView}><ActivityIndicator /></View>
}

const styles = StyleSheet.create({
    emptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default LoadingView