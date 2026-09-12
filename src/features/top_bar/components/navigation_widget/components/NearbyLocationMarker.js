import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated'
import { basic, primary } from '../../../../../styles/colors'

const PULSE_DURATION = 900

const NearbyLocationMarker = () => {
    const pulse = useSharedValue(0)

    useEffect(() => {
        pulse.value = withRepeat(
            withTiming(1, { duration: PULSE_DURATION }),
            -1,
            true)

        return () => cancelAnimation(pulse)
    }, [pulse])

    const outerStyle = useAnimatedStyle(() => ({
        opacity: 0.8 - pulse.value * 0.35,
        transform: [{ scale: 1 + pulse.value * 0.35 }]
    }))

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.outer, outerStyle]} />
            <View style={styles.inner} />
        </View>
    )
}

export default NearbyLocationMarker

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    outer: {
        position: 'absolute',
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 4,
        borderColor: basic
    },
    inner: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: primary
    }
})
