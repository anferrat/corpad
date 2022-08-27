import React from 'react'
import { useDispatch } from 'react-redux'
import { updateViewProperty } from '../../store/actions/item'
import Select from '../_Stateless/SelectField'
import { sendRequest } from '../../database/db'
import { genRequestObject } from '../customFunctions'
import { errorHandler } from '../errorHandler'

const SelectField = (props) => {
    const dispatch = useDispatch()
    const selectAction = React.useCallback(async (value, property) => {
        const newTime = Date.now()
        const updatePropRequest = await sendRequest('UPDATE', props.dataType + '_PROPERTY', { ...genRequestObject(props.dataType, props.itemId), property: property, value: value })
        if (updatePropRequest.status === 200) {
            dispatch(updateViewProperty(value, property))
        }
        const updateTimeRequest = await sendRequest('UPDATE', props.dataType + '_PROPERTY', { ...genRequestObject(props.dataType, props.itemId), property: 'timeModified', value: newTime })
        if (updateTimeRequest.status === 200) {
            dispatch(updateViewProperty(newTime, 'timeModified'))
        }
        if ((updatePropRequest.status !== 200 || updateTimeRequest.status !== 200))
            errorHandler(623)
    }, [dispatch])

    return (
        <Select
            {...props}
            selectAction={selectAction} />
    )
}

export default React.memo(SelectField)