import React, { useContext } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import TopBarTitle from './TopBarTitle'
import { ScrollRef } from '../../../../App'
import { ItemTypes } from '../../../constants/global'
import { ItemTypeLabels, TestPointTypeLabels } from '../../../constants/labels'
import { ItemTypeSingleIcons, TestPointTypeIcons } from '../../../constants/icons'

const ViewTitle = ({ itemType }) => {
    const scrollingRef = useContext(ScrollRef)
    const title = useSelector(state => state.item.view.name ?? '')
    const subType = useSelector(state => state.item.view?.testPointType)
    const status = useSelector(state => state.item.view?.status)

    const subtitle = itemType === ItemTypes.TEST_POINT && subType !== undefined ? TestPointTypeLabels[subType] : ItemTypeLabels[itemType]
    const icon = itemType === ItemTypes.TEST_POINT ? TestPointTypeIcons[subType] : ItemTypeSingleIcons[itemType]

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
                icon={`${icon}-filled`}
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