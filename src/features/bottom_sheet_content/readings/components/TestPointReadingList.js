import React from 'react'
import RadioListItem from '../../components/RadioListItem'
import { useTestPointReadings } from '../hooks/useTestPointReadings'
import SheetHeader from '../../components/SheetHeader'
import { TestPointReadingOptions } from '../../../../constants/global'
import { TestPointReadingOptionLabels } from '../../../../constants/labels'


const TestPointReadingList = ({ closeSheet }) => {
    const { onSelect, selectedReading } = useTestPointReadings({ closeSheet })
    return (
        <>
            <SheetHeader
                title='Readings'
                onClosePress={closeSheet} />
            {Object.values(TestPointReadingOptions).map(reading =>
                <RadioListItem
                    key={reading}
                    title={TestPointReadingOptionLabels[reading]}
                    onSelect={onSelect}
                    value={reading}
                    checked={reading === selectedReading} />
            )}
        </>
    )
}

export default TestPointReadingList