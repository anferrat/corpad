import React from 'react'
import { useDispatch } from 'react-redux'
import ExpandedBar from './components/ExpandedBar'
import ControlButton from './components/ControlButton'
import { sendRequest } from '../../api/database/index'
import { genRequestObject } from '../../helpers/functions'
import { setUpdating } from '../../store/actions/list'
import { setMarkerUpdate, setShowMarker } from '../../store/actions/map'
import { getWarningCode } from '../../helpers/functions'
import { hapticDelete } from '../../native_libs/haptics'
import AddSubitemButton from './AddSubitemButton'
import { errorHandler, warningHandler } from '../../helpers/error_handler'

const ControlBar = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const deleteHandler = async () => {
        hapticDelete()
        const confirm = await warningHandler(getWarningCode(props.dataType), 'Delete', 'Cancel')
        if (confirm) {
            const deleteRequest = await sendRequest('DELETE', props.dataType, genRequestObject(props.dataType, props.itemId))
            if (deleteRequest.status === 200) {
                dispatch(setUpdating(props.dataType, props.itemId, 'DELETE'))
                dispatch(setMarkerUpdate('DELETE', props.dataType, props.itemId))
                props.goBack()
                ref.current = false //Check why the hell i need that
            }
            else errorHandler(601)
        }
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
                navigateToSubitem={props.navigateToEditSubitem}
                itemType={props.dataType} />
            <ControlButton
                label='Edit'
                icon='edit'
                onPress={props.navigateToEditItem} />
            <ControlButton
                label='Delete'
                icon='trash'
                danger
                onPress={deleteHandler} />
        </ExpandedBar>
    )
})

export default React.memo(ControlBar)