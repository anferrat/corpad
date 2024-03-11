import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { primary } from "../../../styles/colors"
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar"
import WaveActivityIndicator from "../../../components/WaveActivityIndicator"

const SplashScreen = ({ loading }) => {
    const [visible, setVisible] = useState(loading)
    useEffect(() => {
        //Give time for stack navigator and all the displayed screen to render
        if (!loading)
            setTimeout(() => setVisible(false), 400)
    },
        [loading])
    if (visible)
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