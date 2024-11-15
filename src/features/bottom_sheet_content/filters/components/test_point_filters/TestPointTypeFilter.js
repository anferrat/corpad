import React from 'react'
import SheetHeader from '../../../components/SheetHeader'
import { useTestPointTypeFilter } from '../../hooks/test_point_filters/useTestPointTypeFilter'
import TestPointTypeFilter from '../TestPointTypeFilter'



const TestPointTestPointTypeFilter = ({ onBackPress, closeSheet, visible }) => {
    const { filter, onApply } = useTestPointTypeFilter()
    return (
        <>
            <SheetHeader
                title='Test point type'
                onBackPress={onBackPress}
                onClosePress={closeSheet} />
            <TestPointTypeFilter
                excluded={filter}
                onApply={onApply}
                visible={visible}
            />
        </>
    )
}

export default TestPointTestPointTypeFilter
