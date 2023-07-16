import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Radio as RadioDefault, Text } from '@ui-kitten/components'

const RadioText = React.memo(({ children }) => {
    return <Text
        category='p1'
        style={styles.text}>{children}</Text>
})

const Radio = (props) => {
    const { children } = props
    return (
        <RadioDefault
            {...props}
            style={styles.radio}>
            <RadioText>{children}</RadioText>
        </RadioDefault>
    )
}

export default React.memo(Radio)

const styles = StyleSheet.create({
    text: {
        paddingLeft: 12,
        textAlignVertical: 'center'
    },
    radio: {
        alignItems: 'center',
        marginBottom: 12
    }
})