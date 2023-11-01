import React from 'react'
import { View, StyleSheet } from 'react-native'


const ViewContainer = ({ children, hidden }) => {
    if (hidden)
        return null
    else
        return (
            <View style={styles.container}>
                {children}
            </View>
        )
}

export default ViewContainer

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
})