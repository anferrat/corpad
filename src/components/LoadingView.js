import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { primary } from '../styles/colors'


const LoadingView = (props) => {
    if (!props.loading)
        return props.children
    else
        return <View style={styles.emptyView}><ActivityIndicator size={props.size ?? 'large'} color={primary} /></View>
}

const styles = StyleSheet.create({
    emptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default LoadingView