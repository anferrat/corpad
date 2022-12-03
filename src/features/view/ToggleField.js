import React from 'react'
import { Toggle, Text } from '@ui-kitten/components'
import { genRequestObject } from '../../helpers/functions'
import { sendRequest } from '../../api/database/index'
import { useDispatch } from 'react-redux'
import { updateViewProperty } from '../../store/actions/item'
import { errorHandler } from '../../helpers/error_handler'

//Made for IK card, if want to use somewhereelse needs some work

const ToggleField = (props) => {
    const dispatch = useDispatch()
    const submitValue = React.useCallback(async (value, property, dataTypeSubitem, dataTypeItem, subitemId, itemId) => {
        props.setValue(!value)
        const newTime = Date.now()
        const updatePropRequest = await sendRequest('UPDATE', dataTypeSubitem + '_PROPERTY', { ...genRequestObject(dataTypeSubitem, subitemId), property: property, value: !value })
        const updateCurrentRequest = await sendRequest('UPDATE', dataTypeSubitem + '_PROPERTY', { ...genRequestObject(dataTypeSubitem, subitemId), property: 'current', value: (property === 'shorted' && value) ? null : 0 })
        const updateTimeRequest = await sendRequest('UPDATE', dataTypeItem + '_PROPERTY', { ...genRequestObject(dataTypeItem, itemId), property: 'timeModified', value: newTime })
        if (updateTimeRequest.status === 200)
            dispatch(updateViewProperty(newTime, 'timeModified'))
        if (updateCurrentRequest.status !== 200 || updatePropRequest.status !== 200) {
            props.setValue(value)
            errorHandler(623)
        }
    }, [])
    return <Toggle {...props}
        onChange={submitValue.bind(this, props.checked, props.property, props.dataTypeSubitem, props.dataTypeItem, props.subitemId, props.itemId)}>
        <Text status={props.status} category='p1'>{props.title}</Text>
    </Toggle>
}

export default React.memo(ToggleField)