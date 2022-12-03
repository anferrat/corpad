import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSubitemProperty } from '../../../store/actions/subitem'
import fieldValidation from '../../../helpers/validation'
import Input from '../../../components/Input'

const InputField = (props) => {
    const dispatch = useDispatch()
    const updateText = (text, property) => {
        dispatch(updateSubitemProperty(text, property))
    }

    const submitValue = React.useCallback((value, property, calculations) => {
        const validate = fieldValidation(value, property)
        dispatch(updateSubitemProperty(validate.value, property, validate.valid))
        if (calculations)
            calculations()
    }, [dispatch])


    return (
        <Input
            {...props}
            onChangeText={text => updateText(text, props.property)}
            onEndEditing={submitValue.bind(this, props.value, props.property, props.calculations)} />
    )
}
export default React.memo(InputField)