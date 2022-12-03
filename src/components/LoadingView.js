import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { basic200, primary } from '../styles/colors'


const LoadingView = (props) => {
    if (!props.loading)
        return props.children
    else
        return <View style={styles.emptyView}><ActivityIndicator size={'large'} color={primary} /></View>
}

const styles = StyleSheet.create({
    emptyView: {
        backgroundColor: basic200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default LoadingView