import React from 'react'
import { Text } from '@ui-kitten/components'
import InputField from '../../../components/Input'
import { translateCalculator } from '../../../localization'

const InputDataField = (props) => {
    const {setValue: updateValue, point, property, status, setValid: validateValue, value} = props
    const setValue = React.useCallback((nextValue) => updateValue(point, property, status, nextValue), [updateValue, point, property, status])
    const setValid = React.useCallback(() => validateValue(point, property, status, value), [validateValue, point, property, status, value])
    const accessory = React.useCallback(() => <Text appearance='hint' category='c1'>{`${status === 'on' ? translateCalculator('common.on') : translateCalculator('common.off')}:`}</Text>, [status])
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
