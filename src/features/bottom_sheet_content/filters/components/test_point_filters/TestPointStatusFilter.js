import React from 'react'
import { useTestPointStatusFilter } from '../../hooks/test_point_filters/useTestPointStatusFilter'
import SheetHeader from '../../../components/SheetHeader'
import StatusFilter from '../StatusFilter'



const TestPointStatusFilter = ({ onBackPress, closeSheet, visible }) => {
    const { filter, onApply } = useTestPointStatusFilter()
    return (
        <>
            <SheetHeader
                title='Status'
                onBackPress={onBackPress}
                onClosePress={closeSheet}
            />
            <StatusFilter
                excluded={filter}
                onApply={onApply}
                visible={visible}
            />
        </>
    )
}

export default TestPointStatusFilter
