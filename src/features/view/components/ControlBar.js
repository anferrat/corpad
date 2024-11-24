import React, { useState } from 'react'
import ExpandedBar from './ExpandedBar'
import ControlButton from '../../../components/ControlButton'
import { AddReadingModal } from '../../../components/AddReadingModal'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import useControlBar from '../hooks/useControlBar'
import { SubitemTypeAllocation } from '../../../constants/global'

const ControlBar = ({ createSubitem, deleteItem, itemType, displayOnMap, displayOnMapVisible, navigateToEdit, onAddPhoto, isPro, exportLabelDisabled, openExportLabel }) => {
    const { buttons, readingModalVisible, hideReadingModal } = useControlBar({
        deleteItem,
        itemType,
        displayOnMap,
        displayOnMapVisible,
        navigateToEdit,
        onAddPhoto,
        isPro,
        exportLabelDisabled,
        openExportLabel
    })

    return (
        <>
            <ExpandedBar>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {buttons.map(({ key, icon, pack, label, onPress, status, inactive }) =>
                        <ControlButton
                            key={key}
                            icon={icon}
                            label={label}
                            onPress={onPress}
                            inactive={inactive}
                            pack={pack}
                            status={status} />
                    )}
                </ScrollView>
            </ExpandedBar>
            <AddReadingModal
                subitemTypes={SubitemTypeAllocation[itemType]}
                visible={readingModalVisible}
                hideModal={hideReadingModal}
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