import React from 'react'
import { View, StyleSheet } from 'react-native'
import Router from '../../../../../components/Router/Router'
import Route from '../../../../../components/Router/Route'
import { MapFilterScreens } from '../../constants/constants'
import FilterButtons from '../FilterButtons'
import MapFilterList from './MapFilterList'
import useMapFilterRouter from '../../hooks/map_filters/useMapFilterRouter'
import { useMapResetButton } from '../../hooks/map_filters/useMapResetButton'
import MapStatusFilter from './MapStatusFilter'
import MapMarkerTypeFilter from './MapMarkerTypeFilter'


const MapFilter = ({ closeSheet }) => {
    const { screen, navigateToScreen, goToList, applyButtonVisible } = useMapFilterRouter()
    const { onResetPress, resetVisible } = useMapResetButton({ closeSheet })
    return (
        <>
            <Router
                selectedRoute={screen}>
                <Route
                    routeKey={MapFilterScreens.LIST}>
                    <MapFilterList
                        onPressListItem={navigateToScreen}
                        closeSheet={closeSheet} />
                </Route>
                <Route
                    routeKey={MapFilterScreens.STATUS_FILTER}>
                    <MapStatusFilter
                        key={screen === MapFilterScreens.STATUS_FILTER}
                        onBackPress={goToList}
                        closeSheet={closeSheet}
                        visible={screen === MapFilterScreens.STATUS_FILTER} />
                </Route>
                <Route
                    routeKey={MapFilterScreens.MARKER_TYPE_FILTER}>
                    <MapMarkerTypeFilter
                        key={screen === MapFilterScreens.MARKER_TYPE_FILTER}
                        onBackPress={goToList}
                        closeSheet={closeSheet}
                        visible={screen === MapFilterScreens.MARKER_TYPE_FILTER} />
                </Route>
            </Router>
            <FilterButtons
                onResetPress={onResetPress}
                resetVisible={resetVisible}
                applyVisible={applyButtonVisible}
                closeSheet={closeSheet} />
        </>
    )
}

export default MapFilter
