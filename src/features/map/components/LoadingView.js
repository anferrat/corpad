import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic300, primary } from '../../../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LoadingView = ({ loading }) => {
    const [displayed, setDisplayed] = useState(loading)
    const opacity = useRef(new Animated.Value(loading ? 1 : 0))
    const componentMounted = useRef(true)
    const insets = useSafeAreaInsets()
    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        if (!loading) {
            setTimeout(() => Animated.timing(
                opacity.current,
                {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() => componentMounted.current ? setDisplayed(false) : null), 600)
        }
        else {
            setDisplayed(true)
            opacity.current.setValue(1)
        }
    })

    return (
        <Animated.View
            style={{ ...styles.mainView, opacity: opacity.current, display: displayed ? 'flex' : 'none', top: insets.top + 65 }}>
            {loading ? <>
                <ActivityIndicator color={primary} />
                <Text
                    category='p2'
                    appearance='hint'
                    style={styles.text}>Loading...</Text>
            </> :
                <>
                    <Icon name='checkmark-circle-outline'
                        fill={basic} style={styles.icon} />
                    <Text category='p2' appearance='hint'>Loaded</Text>
                </>}
        </Animated.View>
    )

}

export default React.memo(LoadingView)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        width: 150,
        height: 50,
        borderRadius: 25,
        elevation: 5,
        backgroundColor: '#fff',
        overflow: "hidden",
        borderWidth: 1,
        borderColor: basic300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    text: {
        marginLeft: 12
    }
})