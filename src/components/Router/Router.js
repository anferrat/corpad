import React from 'react'
import { View, StyleSheet } from 'react-native'

const Router = ({ children, selectedRoute }) => {
    return children.map((route) => {
        return (
            <View
                style={route.props.routeKey === selectedRoute ? styles.visible : styles.hidden}
                key={route.props.routeKey}>
                {route}
            </View>
        )
    })
}

export default Router

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    visible: {
        flex: 1,
        display: 'flex'
    }
})