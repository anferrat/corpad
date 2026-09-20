import React from 'react'
import { Text } from '@ui-kitten/components'
import InputField from '../../../components/Input'
import { translateCalculator } from '../../../localization'

const InputDataField = (props) => {
    const {setValue: updateValue, property, status, setValid: validateValue, value} = props
    const setValue = React.useCallback((nextValue) => updateValue(property, status, nextValue), [updateValue, property, status])
    const setValid = React.useCallback(() => validateValue(property, status, value), [validateValue, property, status, value])
    const accessory = React.useCallback(() => <Text appearance='hint' category='c1'>{`${status === 'on' ? translateCalculator('common.on') : translateCalculator('common.off')}:`}</Text>, [status])
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
