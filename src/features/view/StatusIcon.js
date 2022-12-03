import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendRequest } from '../../api/database/index'
import { updateViewProperty } from '../../store/actions/item'
import StatusIconBase from './components/StatusIcon'
import { genRequestObject } from '../../helpers/functions'
import { errorHandler } from '../../helpers/error_handler'

const StatusIcon = (props) => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.item.view.status)
    const updateStatus = React.useCallback(async (newStatus) => {
        const newTime = Date.now()
        const updateStatusRequest = await sendRequest('UPDATE', props.dataType + '_PROPERTY', { ...genRequestObject(props.dataType, props.itemId), property: 'status', value: newStatus })
        if (updateStatusRequest.status === 200) {
            dispatch(updateViewProperty(newStatus, 'status'))
        }
        const updateTimeRequest = await sendRequest('UPDATE', props.dataType + '_PROPERTY', { ...genRequestObject(props.dataType, props.itemId), property: 'timeModified', value: newTime })
        if (updateTimeRequest.status === 200)
            dispatch(updateViewProperty(newTime, 'timeModified'))
        if (updateStatusRequest.status !== 200 || updateTimeRequest.status !== 200)
            errorHandler(623)
    }, [props.dataType])

    return (
        <StatusIconBase
            status={status}
            updateStatus={updateStatus} />
    )
}

export default StatusIcon