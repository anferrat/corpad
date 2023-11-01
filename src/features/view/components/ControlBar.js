import React, { useState } from 'react'
import ExpandedBar from './ExpandedBar'
import ControlButton from './ControlButton'
import { AddReadingModal } from '../../../components/AddReadingModal'
import { ItemTypes, SubitemTypes } from '../../../constants/global'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

const ControlBar = ({ createSubitem, deleteItem, itemType, displayOnMap, displayOnMapVisible, navigateToEdit, onAddPhoto, addPhotoAvailable, isPhotoCaptureDisabled }) => {
    const [visible, setVisible] = useState(false)

    const hideModal = React.useCallback(() => setVisible(false), [])

    const subitemTypes = React.useMemo(() => {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return [SubitemTypes.PIPELINE, SubitemTypes.RISER, SubitemTypes.STRUCTURE, SubitemTypes.TEST_LEAD, SubitemTypes.ANODE, SubitemTypes.COUPON, SubitemTypes.REFERENCE_CELL, SubitemTypes.BOND, SubitemTypes.SHUNT, SubitemTypes.ISOLATION, SubitemTypes.SOIL_RESISTIVITY]
            case ItemTypes.RECTIFIER:
                return [SubitemTypes.ANODE_BED, SubitemTypes.CIRCUIT]
            default:
                return []
        }
    }, [itemType])

    const createSubitemHandler = React.useCallback(() => {
        setVisible(true)
    }, [])

    return (
        <>
            <ExpandedBar>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {displayOnMapVisible ?
                        <ControlButton
                            icon='map'
                            label='Show on map'
                            onPress={displayOnMap} /> : null}
                    {addPhotoAvailable ? <ControlButton
                        label='Add a photo'
                        disabled={isPhotoCaptureDisabled}
                        icon='camera'
                        onPress={onAddPhoto} /> : null}
                    {itemType !== 'PIPELINE' ?
                        <ControlButton
                            icon='plus-circle'
                            label='Add reading'
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

                </ScrollView>
            </ExpandedBar>
            <AddReadingModal
                subitemTypes={subitemTypes}
                visible={visible}
                hideModal={hideModal}
                onSelect={createSubitem}
            />
        </>
    )
}

export default React.memo(ControlBar)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-evenly'
    },
    scrollView: {
        width: '100%',
    }
})