import React from 'react'
import { Radio, Text, Button } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'

const RadioListItem = ({ title, onSelect, value, checked, onButtonPress, button }) => {

    const onChange = () => onSelect(value)
//Radio is broken doesnt allow to change text size via category, instead had to apply style
    return (
        <View
            style={styles.container}>
            <Radio
                style={styles.radio}
                onChange={onChange}
                checked={checked}>
                <>
                    <Text
                        style={styles.text}
                        category={'p2'} > 
                        {title}
                    </Text>
                </>
            </Radio>
            {checked && button ?
                <Button
                    appearance='outline'
                    style={styles.button}
                    onPress={onButtonPress}>
                    {button}
                </Button> : null}
        </View>
    )
}

export default React.memo(RadioListItem)

const styles = StyleSheet.create({
    radio: {
        height: 60,
        paddingLeft: 12,
        flex: 1
    },
    text: {
        paddingLeft: 12,
        fontSize: 15
    },
    container: {
        flexDirection: 'row',
    },
    button: {
        marginRight: 12
    }
})