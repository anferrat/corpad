import React from 'react'
import SheetHeader from '../../../components/SheetHeader'
import { useTestPointReadingTypeFilter } from '../../hooks/test_point_filters/useTestPointReadingTypeFilter'
import ReadingTypeFilter from '../ReadingTypeFilter'
import { ItemTypes } from '../../../../../constants/global'



const TestPointReadingTypeFilter = ({ onBackPress, closeSheet, visible }) => {
    const { filter, onApply } = useTestPointReadingTypeFilter()
    return (
        <>
            <SheetHeader
                title='Readings'
                onBackPress={onBackPress}
                onClosePress={closeSheet} />
            <ReadingTypeFilter
                excluded={filter}
                onApply={onApply}
                visible={visible}
                itemType={ItemTypes.TEST_POINT}
            />
        </>
    )
}

export default TestPointReadingTypeFilter
