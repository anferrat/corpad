import React from 'react'
import InputField from '../../_Stateless/InputField'
import { Text } from '@ui-kitten/components'

const InputDataField = (props) => {
    const setValue = React.useCallback((value) => props.setValue(props.property, props.status, value), [props.setValue, props.property, props.status])
    const setValid = React.useCallback(() => props.setValid(props.property, props.status, props.value), [props.setValid, props.property, props.value, props.status])
    const accessory = React.useCallback(() => <Text appearance='hint' category='c1'>{props.status === 'on' ? 'ON:' : 'OFF:'}</Text>, [props.status])
    return <InputField
        keyboardType={'numeric'}
        accessoryLeft={props.status !== null ? accessory : null}
        disabled={props.disabled}
        onChangeText={setValue}
        onEndEditing={setValid}
        valid={props.valid}
        style={props.style}
        value={props.value}
        unit={props.unit}
        label={props.label}
        textAlign={props.status !== null ? 'center' : 'left'}
    />
}

export default React.memo(InputDataField)