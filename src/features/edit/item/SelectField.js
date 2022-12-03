import React from 'react'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../store/actions/item'
import fieldValidation from '../../../helpers/validation'
import Select from '../../../components/Select'

const SelectField = (props) => {
    const dispatch = useDispatch()
    const selectAction = React.useCallback((value, property) => {
        if (props.valid !== undefined) {
            const validate = fieldValidation(value, property)
            dispatch(updateProperty(validate.value, property, validate.valid))
        }
        else
            dispatch(updateProperty(value, property))
    }, [dispatch])

    return (
        <Select
            {...props}
            selectAction={selectAction} />
    )
}

export default React.memo(SelectField)