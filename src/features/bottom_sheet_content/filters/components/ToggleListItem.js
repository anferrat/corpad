import React from 'react'
import { Toggle, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'
import { useToggle } from '../hooks/useToggle'

const ToggleListItem = ({ title, onApply, isChecked, disabled }) => {
    const { onToggle, toggledOn } = useToggle({ isChecked, onApply })
    return (
        <Pressable
            style={styles.listItem}
            android_ripple={androidRipple}
            disabled={disabled}>
            <Text
                category='s1'
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.text}>
                {title}
            </Text>
            <Toggle
                disabled={disabled}
                onChange={onToggle}
                checked={toggledOn} />
        </Pressable>

    )
}

export default ToggleListItem


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        height: 60,
    },
    text: {
        paddingRight: 12
    }
})