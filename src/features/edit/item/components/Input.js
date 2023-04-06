import React from 'react'
import InputDefault from '../../../../components/Input'

const Input = (props) => {
    const { update, validate, property } = props


    const onChangeValue = React.useCallback((value) => {
        update(value, property)
    }, [property, update])

    const onEndEditing = React.useCallback(() => {
       
        validate(property)
    }, [property, validate])

    return (
        <InputDefault
            {...props}
            onChangeText={onChangeValue}
            onEndEditing={onEndEditing} />
    )
}
export default React.memo(Input)