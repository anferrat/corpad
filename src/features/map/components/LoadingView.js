import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic300, primary } from '../../../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const LoadingView = () => {
    const loading = useSelector(state => state.map.loading)
    const [visible, setVisible] = useState(loading)
    const opacity = useRef(new Animated.Value(loading ? 1 : 0))
    const insets = useSafeAreaInsets()


    useEffect(() => {
        if (!loading) {
            setTimeout(() => Animated.timing(
                opacity.current,
                {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() => setVisible(false)), 600)
        }
    }, [loading])
    if (visible)
        return (
            <Animated.View
                pointerEvents='none'
                style={{ ...styles.mainView, opacity: opacity.current, top: insets.top + 70 }}>
                {loading ?
                    <>
                        <ActivityIndicator
                            color={primary} />
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
    else return null

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