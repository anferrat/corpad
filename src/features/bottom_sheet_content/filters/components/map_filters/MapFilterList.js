import React from 'react'
import FilterListItem from '../FilterListItem'
import { MapFilterScreens } from '../../constants/constants'
import SheetHeader from '../../../components/SheetHeader'
import { useMapFilterCounter } from '../../hooks/map_filters/useMapFilterCounter'
import { translateBottomSheet } from '../../../../../localization'


const MapFilterList = ({ onPressListItem, closeSheet }) => {
    const { statusCounter, markerTypeCounter } = useMapFilterCounter()
    return (
        <>
            <SheetHeader
                title={translateBottomSheet('filters')}
                onClosePress={closeSheet} />
            <FilterListItem
                title={translateBottomSheet('status')}
                onPress={onPressListItem}
                counter={statusCounter}
                routeKey={MapFilterScreens.STATUS_FILTER}
                disabled={false} />
            <FilterListItem
                title={translateBottomSheet('markerType')}
                onPress={onPressListItem}
                counter={markerTypeCounter}
                routeKey={MapFilterScreens.MARKER_TYPE_FILTER}
                disabled={false} />
        </>
    )
}

export default MapFilterList
