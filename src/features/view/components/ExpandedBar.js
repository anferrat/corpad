import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { Icon, Text } from '@ui-kitten/components'
import { primary, basic300, control } from '../../../styles/colors'
import Pressable from '../../../components/Pressable'
import { translateView } from '../../../localization'

const BAR_HEIGHT = 110
const BAR_OFFSET = 45
const ANIMATION_DURATION = 200

const ExpandedBar = ({ children }) => {
    const [barDisplayed, setBarDisplayed] = useState(false)
    const progress = useSharedValue(0)

    const barStyle = useAnimatedStyle(() => ({
        height: interpolate(progress.value, [0, 1], [0, BAR_HEIGHT]),
        transform: [{
            translateY: interpolate(progress.value, [0, 1], [-BAR_OFFSET, 0])
        }]
    }))

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{
            rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`
        }]
    }))

    const toggleBar = () => {
        const nextDisplayed = !barDisplayed
        setBarDisplayed(nextDisplayed)
        progress.value = withTiming(nextDisplayed ? 1 : 0, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic)
        })
    }


    return (
        <View style={styles.mainView}>
            <Animated.View style={[styles.bar, barStyle]}>
                {children}
            </Animated.View>
            <Pressable
                android_ripple={{ color: basic300 }}
                onPress={toggleBar}
                accessibilityRole='button'
                accessibilityState={{ expanded: barDisplayed }}
                style={styles.pressable}>
                <Text status='primary'>{barDisplayed ? translateView('hide') : translateView('show')} {translateView('controls')}</Text>
                <Animated.View style={[styles.iconWrapper, iconStyle]}>
                    <Icon name='arrow-ios-downward-outline' fill={primary} style={styles.icon} />
                </Animated.View>
            </Pressable>
        </View>
    )
}


export default ExpandedBar

const styles = StyleSheet.create({
    mainView: {
        overflow: 'hidden',
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: control,
        height: 50,
        marginTop: 12
    },
    iconWrapper: {
        marginLeft: 12
    },
    icon: {
        width: 25,
        height: 25,
    }
})
