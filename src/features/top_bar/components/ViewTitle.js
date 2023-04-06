import React, { useContext } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import TopBarTitle from './TopBarTitle'
import { ScrollRef } from '../../../../App'
import { labels, testPointTypeCodes } from '../../../constants/constants'

const ViewTitle = ({ itemType }) => {
    const scrollingRef = useContext(ScrollRef)
    const title = useSelector(state => state.item.view.name ?? '')
    const subType = useSelector(state => state.item.view?.testPointType ?? 0)
    const status = useSelector(state => state.item.view?.status)

    const subtitle = itemType === 'TEST_POINT' ? labels[testPointTypeCodes[subType]].label : labels[itemType].label
    const icon = itemType === 'TEST_POINT' ? testPointTypeCodes[subType] : itemType

    const translation = scrollingRef.current.interpolate({
        inputRange: [0, 80],
        outputRange: [80, 0],
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
                    status={status}
                    icon={icon}
                    pack='cp'
                    subtitle={subtitle}
                    title={title} />
            </Animated.View>
    )
}

export default ViewTitle

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        top: 0,
        left: 50,
        right: 0,
    }
})