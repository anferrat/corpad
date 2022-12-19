import React from 'react'
import { useDispatch } from 'react-redux'
import { updateViewProperty } from '../../store/actions/item'
import Select from '../../components/Select'
import { sendCombinedRequest } from '../../api/database/index'
import { genRequestObject } from '../../helpers/functions'
import { errorHandler } from '../../helpers/error_handler'

const SelectField = (props) => {
    const dispatch = useDispatch()
    const selectAction = React.useCallback(async (value, property) => {
        const newTime = Date.now()
        const update = await sendCombinedRequest([
            ['UPDATE', props.dataType + '_PROPERTY', { ...genRequestObject(props.dataType, props.itemId), property: property, value: value }],
            ['UPDATE', props.dataType + '_PROPERTY', { ...genRequestObject(props.dataType, props.itemId), property: 'timeModified', value: newTime }]
        ])
        if (update.status === 200) {
            dispatch(updateViewProperty(value, property))
            dispatch(updateViewProperty(newTime, 'timeModified'))
        }
        else errorHandler(623)
    }, [dispatch])

    return (
        <Select
            {...props}
            selectAction={selectAction} />
    )
}

export default React.memo(SelectField)