import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import InputField from '../../_Stateless/InputField'
import fieldValidation from '../../fieldValidation'

const InputNameField = (props) => {
    const [valid, setValid] = useState(true)

    const setValue = React.useCallback((value) => {
        props.setData(old => ({
            ...old,
            value: value,
        }))
    }, [props.setData])

    const updateDefaultName = React.useCallback(() => {
        const validate = fieldValidation(props.value, 'name')
        setValid(validate.valid)
        if (validate.valid) {
            setValue(validate.value)
            props.setData(old => ({
                ...old,
                value: validate.value,
                defaultNamesList: Object.assign([], old.defaultNamesList, { [old.selectedIndex]: { ...old.defaultNamesList[old.selectedIndex], name: validate.value } })
            }))
        }
    }, [props.setData, props.value])

    return <InputField
        property='name'
        valid={valid}
        style={styles.input}
        label='Default name prefix'
        disabled={props.disabled}
        value={props.value}
        onEndEditing={updateDefaultName}
        unit='<index>'
        onChangeText={setValue} />
}

export default React.memo(InputNameField)

const styles = StyleSheet.create({
    input: {
        flex: 1
    }
})