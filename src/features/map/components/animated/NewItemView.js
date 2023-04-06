import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'


const NewItemView = ({ visible, children }) => {
    const transY = useRef(new Animated.Value(visible ? 0 : 160))


    useEffect(() => {
        if (!visible)
            Animated.timing(
                transY.current,
                {
                    toValue: 240,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
        else
            Animated.timing(
                transY.current,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
    }, [visible])

    return (
        <Animated.View style={{
            ...styles.mainView,
            transform: [{ translateY: transY.current }]
        }}>
            {children}
        </Animated.View>
    )

}


export default React.memo(NewItemView)

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        bottom: 37,
        height: 178,
        left: '5%',
        justifyContent: 'space-between',
    },
})