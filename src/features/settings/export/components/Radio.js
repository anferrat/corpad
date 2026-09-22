import React from 'react'
import { StyleSheet } from 'react-native'
import { Radio as RadioDefault, Text } from '@ui-kitten/components'

const RadioText = React.memo(({ children }) => {
    return <Text
        category='p1'
        style={styles.text} numberOfLines={2} ellipsizeMode='tail'>
        {children}
    </Text>
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
        textAlignVertical: 'center',
        paddingRight: 12
    },
    radio: {
        alignItems: 'center',
        marginBottom: 12
    }
})