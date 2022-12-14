import React, { useRef, useContext } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import TopBarTitle from './TopBarTitle'
import { iconHandlerItem, subtitleHandlerItem } from '../../../helpers/functions'
import { ScrollRef } from '../../../../App'

const ViewTitle = ({ dataType }) => {
    const scrollingRef = useContext(ScrollRef)
    const title = useSelector(state => state.item.view.name ?? '')
    const testPointType = useSelector(state => state.item.view?.testPointType)

    const translation = scrollingRef.current.interpolate({
        inputRange: [0, 75],
        outputRange: [75, 0],
        extrapolate: 'clamp',
    })
    const opacity = scrollingRef.current.interpolate({
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
                icon={iconHandlerItem(dataType, testPointType)}
                pack='cp'
                subtitle={subtitleHandlerItem(dataType, testPointType)}
                title={title} />
        </Animated.View>
    )
}

export default ViewTitle

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 50,
        right: 0,
    }
})