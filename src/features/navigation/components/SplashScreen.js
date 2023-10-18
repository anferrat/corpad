import React from "react"
import { StyleSheet, View } from "react-native"
import { primary } from "../../../styles/colors"
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar"
import WaveActivityIndicator from "../../../components/WaveActivityIndicator"

const SplashScreen = () => {
    return (
        <View style={styles.splash}>
            <FocusAwareStatusBar translucent={true} barStyle='light-content' backgroundColor={'transparent'} />
            <WaveActivityIndicator size='large' color='#fff' />
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