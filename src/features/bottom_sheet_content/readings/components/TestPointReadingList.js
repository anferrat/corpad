import React from 'react'
import RadioListItem from '../../components/RadioListItem'
import { useTestPointReadings } from '../hooks/useTestPointReadings'
import SheetHeader from '../../components/SheetHeader'
import { TestPointReadingOptions } from '../../../../constants/global'
import { TestPointReadingOptionLabels } from '../../../../constants/labels'
import { translateBottomSheet } from '../../../../localization'
import BottomSheetContentScrollView from '../../components/BottomSheetContentScrollView'


const TestPointReadingList = ({ closeSheet, visible }) => {
    const { onSelect, selectedReading } = useTestPointReadings({ closeSheet })
    return (
        <>
            <SheetHeader
                title={translateBottomSheet('readings')}
                onClosePress={closeSheet} />
            <BottomSheetContentScrollView isActive={visible}>
                {Object.values(TestPointReadingOptions).map(reading =>
                    <RadioListItem
                        key={reading}
                        title={TestPointReadingOptionLabels[reading]}
                        onSelect={onSelect}
                        value={reading}
                        checked={reading === selectedReading} />
                )}
            </BottomSheetContentScrollView>
        </>
    )
}

export default TestPointReadingList
