import React from 'react'
import ExpandedBar from '../_Stateless/ViewItem/ExpandedBar'
import ControlButton from '../_Stateless/ViewItem/ControlButton'
import { sendRequest } from '../../database/db'
import { useDispatch } from 'react-redux'
import { genRequestObject } from '../customFunctions'
import { setUpdating } from '../../store/actions/list'
import { setMarkerUpdate, setShowMarker } from '../../store/actions/map'
import { confirmDelete } from '../customFunctions'
import { hapticDelete } from '../_nativeFeatures/haptics'
import AddSubitemButton from './AddSubitemButton'
import { errorHandler } from '../errorHandler'

const ControlBar = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const onDeleteHandler = () => {
        hapticDelete()
        confirmDelete(deleteHandler, props.dataType)
    }

    const deleteHandler = async () => {
        const deleteRequest = await sendRequest('DELETE', props.dataType, genRequestObject(props.dataType, props.itemId))
        if (deleteRequest.status === 200) {
            dispatch(setUpdating(props.dataType, props.itemId, 'DELETE'))
            dispatch(setMarkerUpdate('DELETE', props.dataType, props.itemId))
            props.goBack()
            ref.current = false //Check why the hell i need that
        }
        else errorHandler(601)
    }

    const navigateToMapHandler = () => {
        if (props.mapNavEnabled) {
            props.navigateToMap()
            dispatch(setShowMarker(props.dataType, props.itemId))
        }
        else errorHandler(802)
    }

    return (
        <ExpandedBar>
            {props.dataType !== 'PIPELINE' ? <ControlButton
                icon='map'
                label='Map'
                onPress={navigateToMapHandler}
            /> : null}
            <AddSubitemButton
                itemId={props.itemId}
                testPointType={props.testPointType}
                navigateToSubitem={props.navigateToEditSubitem}
                dataType={props.dataType} />
            <ControlButton
                label='Edit'
                icon='edit'
                onPress={props.navigateToEditItem} />
            <ControlButton
                label='Delete'
                icon='trash'
                danger
                onPress={onDeleteHandler} />
        </ExpandedBar>
    )
})

export default React.memo(ControlBar)