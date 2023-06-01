import React, { useState } from 'react'
import ExpandedBar from './ExpandedBar'
import ControlButton from './ControlButton'
import { AddReadingModal } from '../../../components/AddReadingModal'

const ControlBar = ({ createSubitem, deleteItem, itemType, displayOnMap, displayOnMapVisible, navigateToEdit }) => {
    const [visible, setVisible] = useState(false)

    const hideModal = React.useCallback(() => setVisible(false), [])

    const createSubitemHandler = React.useCallback(() => {
        itemType === 'TEST_POINT' ? setVisible(true) :
            (itemType === 'RECTIFIER' ? createSubitem('CT') : null)
    }, [setVisible, itemType])

    return (
        <>
            <ExpandedBar>
                {displayOnMapVisible ?
                    <ControlButton
                        icon='map'
                        label='Map'
                        onPress={displayOnMap} /> : null}
                {itemType !== 'PIPELINE' ?
                    <ControlButton
                        icon='plus-circle'
                        label='Add'
                        onPress={createSubitemHandler} /> : null}
                <ControlButton
                    label='Edit'
                    icon='edit'
                    onPress={navigateToEdit} />
                <ControlButton
                    label='Delete'
                    icon='trash'
                    status='danger'
                    onPress={deleteItem} />
            </ExpandedBar>
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={createSubitem}
            />
        </>
    )
}

export default React.memo(ControlBar)