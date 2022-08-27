import React from 'react'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../store/actions/item'
import StatusButtonGroup from '../../_Stateless/StatusButtonGroup'

const StatusView = (props) => {
    const dispatch = useDispatch()
    const statusHandler = React.useCallback((currentStatus, selectedStatus) => {
        if (currentStatus === selectedStatus)
            dispatch(updateProperty(3, 'status'))
        else
            dispatch(updateProperty(selectedStatus, 'status'))
    }, [dispatch])

    return <StatusButtonGroup
        status={props.status}
        onPress={statusHandler} />
}

export default React.memo(StatusView)