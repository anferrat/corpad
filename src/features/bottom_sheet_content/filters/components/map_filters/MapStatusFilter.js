import React from 'react'
import SheetHeader from '../../../components/SheetHeader'
import StatusFilter from '../StatusFilter'
import { useMapStatusFilter } from '../../hooks/map_filters/useMapStatusFilter'


const MapStatusFilter = ({ onBackPress, closeSheet, visible }) => {
    const { filter, onApply } = useMapStatusFilter()
    return (
        <>
            <SheetHeader
                title='Status'
                onBackPress={onBackPress}
                onClosePress={closeSheet} />
            <StatusFilter
                excluded={filter}
                onApply={onApply}
                visible={visible} />
        </>
    )
}

export default MapStatusFilter
