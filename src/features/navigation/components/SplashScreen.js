import React from "react"
import { StyleSheet, View, ActivityIndicator, StatusBar } from "react-native"
import { primary } from "../../../styles/colors"

const SplashScreen = () => {
    return (
        <View style={styles.splash}>
            <StatusBar translucent={true} barStyle='light-content' backgroundColor={'transparent'}/>
            <ActivityIndicator size='large' color='#fff' />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    splash: {
        ...StyleSheet.absoluteFill,
        backgroundColor: primary,
        justifyContent: 'center',
    }
})