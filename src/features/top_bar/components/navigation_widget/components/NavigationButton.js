import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { Button } from '@ui-kitten/components'
import { compass } from '../../../../../components/Icons'
import { translateTopBar } from '../../../../../localization'

const COMPACT_WIDTH = 380

const NavigationButton = ({ onPress }) => {
    const { width } = useWindowDimensions()
    const compact = width < COMPACT_WIDTH

    return (
        <Button
            accessoryLeft={compass}
            accessibilityLabel={translateTopBar('compass')}
            onPress={onPress}
            appearance='ghost'
            style={compact ? styles.compact : styles.button}>
            {compact ? null : translateTopBar('compass')}
        </Button>
    )
}

export default React.memo(NavigationButton)

const styles = StyleSheet.create({
    button: {
        maxWidth: 116
    },
    compact: {
        width: 48,
        paddingHorizontal: 0
    }
})
