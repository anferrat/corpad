import React from 'react'
import RadioListItem from '../../components/RadioListItem'
import SheetHeader from '../../components/SheetHeader'
import { RectifierReadingOptions } from '../../../../constants/global'
import { RectifierReadingOptionLabels } from '../../../../constants/labels'
import { useRectifierReadings } from '../hooks/useRectifierReadings'
import { translateBottomSheet } from '../../../../localization'
import BottomSheetContentScrollView from '../../components/BottomSheetContentScrollView'


const RectifierReadingList = ({ closeSheet, visible }) => {
    const { onSelect, selectedReading } = useRectifierReadings({ closeSheet })
    return (
        <>
            <SheetHeader
                title={translateBottomSheet('readings')}
                onClosePress={closeSheet} />
            <BottomSheetContentScrollView isActive={visible}>
                {Object.values(RectifierReadingOptions).map(reading =>
                    <RadioListItem
                        key={reading}
                        title={RectifierReadingOptionLabels[reading]}
                        onSelect={onSelect}
                        value={reading}
                        checked={reading === selectedReading} />
                )}
            </BottomSheetContentScrollView>
        </>
    )
}

export default RectifierReadingList
