import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSubitemProperty } from '../../../store/actions/subitem'
import Select from '../../_Stateless/SelectField'

const SelectField = (props) => {
    const dispatch = useDispatch()
    const selectAction = React.useCallback((value, property) => {
        dispatch(updateSubitemProperty(value, property))
    }, [dispatch])

    return (
        <Select
            {...props}
            selectAction={selectAction} />
    )
}

export default React.memo(SelectField)