import React, { forwardRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import TopBarTitle from '../../components/ItemTitle'
import { iconHandlerItem, subtitleHandlerItem } from '../../helpers/functions'

const TestPointTitle = forwardRef((props, ref) => {
    const title = useSelector(state => state.item.view.name ?? '')
    const testPointType = useSelector(state => state.item.view?.testPointType)


    const translation = ref.current.interpolate({
        inputRange: [0, 75],
        outputRange: [75, 0],
        extrapolate: 'clamp',
    })
    const opacity = ref.current.interpolate({
        inputRange: [55, 75],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })

    return (
        <Animated.View
            style={{
                ...styles.view,
                opacity: opacity,
                transform: [{ translateY: translation }],
            }}>
            <TopBarTitle
                iconName={iconHandlerItem(props.dataType, testPointType)}
                cp={true}
                subtitle={subtitleHandlerItem(props.dataType, testPointType)}
                title={title} />
        </Animated.View>
    )
})

export default TestPointTitle

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 50,
        right: 0,
    }
})