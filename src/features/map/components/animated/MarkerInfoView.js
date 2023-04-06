import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { primary } from '../../../../styles/colors'
import OpenInButton from '../buttons/OpenInButton'


const MarkerInfoView = ({ visible, onSharePress, children }) => {

    const transY = useRef(new Animated.Value(visible ? 0 : 140))

    useEffect(() => {
        if (!visible)
            Animated.timing(
                transY.current,
                {
                    toValue: 140,
                    duration: 250,
                    useNativeDriver: true
                }
            ).start()
        else
            Animated.timing(
                transY.current,
                {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                }
            ).start()
    }, [visible])

    return (
        <>
            <Animated.View style={{
                ...styles.buttonView,
                elevation: transY.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [5, 0]
                }),
                opacity: transY.current.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0]
                })
            }}>
                <OpenInButton
                    onPress={visible ? onSharePress : null} />
            </Animated.View>

            <Animated.View style={{
                ...styles.mainView,
                transform: [{ translateY: transY.current }],
                opacity: transY.current.interpolate({
                    inputRange: [0, 140],
                    outputRange: [1, 0]
                })
            }}>
                {visible ? children : <ActivityIndicator color={primary} size='large' />}
            </Animated.View>
        </>
    )
}

export default React.memo(MarkerInfoView)

const styles = StyleSheet.create({
    mainView: {
        width: '90%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        elevation: 5,
        height:100,
    },
    buttonView: {
        position: 'absolute',
        right: '5%',
        bottom: 140,
    }
})