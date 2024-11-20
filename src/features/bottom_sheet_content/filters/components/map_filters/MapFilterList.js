import React from 'react'
import FilterListItem from '../FilterListItem'
import { MapFilterScreens } from '../../constants/constants'
import SheetHeader from '../../../components/SheetHeader'
import { useMapFilterCounter } from '../../hooks/map_filters/useMapFilterCounter'


const MapFilterList = ({ onPressListItem, closeSheet }) => {
    const { statusCounter, markerTypeCounter } = useMapFilterCounter()
    return (
        <>
            <SheetHeader
                title='Filters'
                onClosePress={closeSheet} />
            <FilterListItem
                title='Status'
                onPress={onPressListItem}
                counter={statusCounter}
                routeKey={MapFilterScreens.STATUS_FILTER}
                disabled={false} />
            <FilterListItem
                title='Marker type'
                onPress={onPressListItem}
                counter={markerTypeCounter}
                routeKey={MapFilterScreens.MARKER_TYPE_FILTER}
                disabled={false} />
        </>
    )
}

export default MapFilterList
