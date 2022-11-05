import React from 'react'
import { Text } from '@ui-kitten/components'
import InputField from '../../_Stateless/InputField'

const InputDataField = (props) => {
    const setValue = React.useCallback((value) => props.setValue(props.point, props.property, props.status, value), [props.setValue, props.point, props.property, props.status])
    const setValid = React.useCallback(() => props.setValid(props.point, props.property, props.status, props.value), [props.setValid, props.point, props.property, props.status, props.value])
    const accessory = React.useCallback(() => <Text appearance='hint' category='c1'>{props.status === 'on' ? 'ON:' : 'OFF:'}</Text>, [props.status])
    return <InputField
        style={props.style}
        disabled={props.disabled}
        maxLength={15}
        accessoryLeft={props.status !== null ? accessory : null}
        onChangeText={setValue}
        onEndEditing={setValid}
        label={props.label}
        keyboardType='numeric'
        value={props.value}
        textAlign={'center'}
        valid={props.valid}
        unit={props.unit} />
}

export default React.memo(InputDataField)