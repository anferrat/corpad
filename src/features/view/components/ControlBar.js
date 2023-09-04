import React, { useEffect, useState } from 'react'
import ExpandedBar from './ExpandedBar'
import ControlButton from './ControlButton'
import { AddReadingModal } from '../../../components/AddReadingModal'
import { ItemTypes } from '../../../constants/global'
import { StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

const ControlBar = ({ createSubitem, deleteItem, itemType, displayOnMap, displayOnMapVisible, navigateToEdit, onAddPhoto, addPhotoAvailable }) => {
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