import React from 'react'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../store/actions/item'
import fieldValidation from '../../fieldValidation'
import Input from '../../_Stateless/InputField'

const InputField = (props) => {
    const dispatch = useDispatch()

    const updateText = React.useCallback((text) => {
        dispatch(updateProperty(text, props.property))
    }, [props.property])

    const submitValue = React.useCallback((value, property) => {
        const valid = fieldValidation(value, property)
        dispatch(updateProperty(valid.value, property, valid.valid))
    }, [dispatch])


    return (
        <Input
            {...props}
            onChangeText={updateText}
            onEndEditing={submitValue.bind(this, props.value, props.property)} />
    )
}
export default React.memo(InputField)