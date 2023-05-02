import React from 'react'
import { View, StyleSheet } from 'react-native'


const ViewContainer = ({ children, hidden }) => {
    return (
        <View style={hidden ? styles.hidden : styles.container}>
            {children}
        </View>
    )
}

export default ViewContainer

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    }
})