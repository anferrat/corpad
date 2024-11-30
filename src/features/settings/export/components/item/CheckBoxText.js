import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, CheckBox } from '@ui-kitten/components'
import Pressable from '../../../../../components/Pressable'

const CheckBoxText = ({ children, onPress, checked }) => {
    const onCheck = () => onPress(!checked)
    return (
        <Pressable
            onPress={onCheck}
            style={styles.checkbox}>
            <CheckBox
                checked={checked}
                onChange={onPress}>
            </CheckBox>
            <Text
                category='p1'
                style={styles.text}>
                {children}
            </Text>
        </Pressable>
    )
}

export default CheckBoxText

const styles = StyleSheet.create({
    text: {
        paddingLeft: 12
    },
    checkbox: {
        flexDirection: 'row',
        paddingBottom: 12,
        marginVertical: 6,
    }
})