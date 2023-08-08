import React, { useEffect, useState } from 'react'
import ExpandedBar from './ExpandedBar'
import ControlButton from './ControlButton'
import { AddReadingModal } from '../../../components/AddReadingModal'
import { ItemTypes } from '../../../constants/global'
import { StatusBar } from 'react-native'

const ControlBar = ({ createSubitem, deleteItem, itemType, displayOnMap, displayOnMapVisible, navigateToEdit }) => {
    const [visible, setVisible] = useState(false)

    const hideModal = React.useCallback(() => setVisible(false), [])

    const createSubitemHandler = React.useCallback(() => {
        if (itemType === ItemTypes.TEST_POINT)
            setVisible(true)
        else if (itemType === ItemTypes.RECTIFIER)
            createSubitem('CT')
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