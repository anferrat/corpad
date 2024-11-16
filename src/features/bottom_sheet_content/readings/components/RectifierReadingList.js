import React from 'react'
import RadioListItem from '../../components/RadioListItem'
import SheetHeader from '../../components/SheetHeader'
import { RectifierReadingOptions } from '../../../../constants/global'
import { RectifierReadingOptionLabels } from '../../../../constants/labels'
import { useRectifierReadings } from '../hooks/useRectifierReadings'


const RectifierReadingList = ({ closeSheet }) => {
    const { onSelect, selectedReading } = useRectifierReadings({ closeSheet })
    return (
        <>
            <SheetHeader
                title='Readings'
                onClosePress={closeSheet} />
            {Object.values(RectifierReadingOptions).map(reading =>
                <RadioListItem
                    key={reading}
                    title={RectifierReadingOptionLabels[reading]}
                    onSelect={onSelect}
                    value={reading}
                    checked={reading === selectedReading} />
            )}
        </>
    )
}

export default RectifierReadingList