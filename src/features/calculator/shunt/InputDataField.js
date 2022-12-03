import React from 'react'
import InputField from '../../../components/Input'

const InputDataField = (props) => {
    const setValue = React.useCallback((value) => props.setValue(props.property, value), [props.setValue, props.property])
    const setValid = React.useCallback(() => props.setValid(props.property, props.value), [props.setValid, props.property, props.value])
    return <InputField
        keyboardType={'numeric'}
        disabled={props.disabled}
        onChangeText={setValue}
        onEndEditing={setValid}
        valid={props.valid}
        style={props.style}
        value={props.value}
        unit={props.unit}
        label={props.label}
    />
}

export default React.memo(InputDataField)