import React from 'react'
import { Radio } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const RadioListOptiion = (props) => {
    return (
        <>
            <Radio
                style={styles.radio}
                onChange={props.onChange}
                checked={props.checked}>
                {props.title}
            </Radio>
        </>
    )
}

export default React.memo(RadioListOptiion)

const styles = StyleSheet.create({
    radio: {
        height: 60,
        paddingLeft: 12
    }
})