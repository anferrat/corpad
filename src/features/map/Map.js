import React, { useRef } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import PointMarker from './components/markers/PointMarker'
import ActiveMarker from './components/markers/ActiveMarker'
import { mapStyle } from './components/map_style/style'
import MapView from 'react-native-maps'
import MarkerInfo from './components/MarkerInfo'
import NewItemMarker from './components/markers/NewItemMarker'
import NewItemView from './components/NewItem'
import LoadingView from './components/LoadingView'
import ControlBar from './components/ControlBar'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { enableLatestRenderer } from 'react-native-maps'
import useMarkers from './hooks/useMarkers'
import SearchBar from './SearchBar'


enableLatestRenderer()

const Map = ({ navigateToView, navigateToEdit }) => {
    const ref = useRef()
    const {
        markers,
        satelliteMode,
        activeMarker,
        newItemMarker,
        isFocused,
        loading,

        onRegionChange,
        animateToCoordinates,
        newItemMarkerHandler,
        onUserLocationChange,
        zoomToUserLocation,
        onDragStart,
        onDragActiveStart,
        updateMarkerHandler,
        onMapPress,
        onMarkerPress,
        createItemHandler,
        shareActiveLocation,
        shareNewItemLocation,
        viewActiveMarkerData,
        toggleSatelliteMode,
        zoomToCoordinates,
        onMapReady,
        setMarkerActive,
        resetActiveMarker
    } = useMarkers({ navigateToEdit, navigateToView, ref })

    return (
        <>
            <FocusAwareStatusBar
                backgroundColor='transparent'
                translucent={true}
                barStyle={satelliteMode ? 'light-content' : 'dark-content'} />
            <MapView
                onMapReady={onMapReady}
                showsCompass={false}
                mapType={satelliteMode ? "satellite" : "standard"}
                onRegionChangeComplete={onRegionChange}
                onLongPress={newItemMarkerHandler}
                onPress={onMapPress}
                customMapStyle={mapStyle}
                showsUserLocation={isFocused ? true : false}
                showsMyLocationButton={false}
                moveOnMarkerPress={false}
                onUserLocationChange={onUserLocationChange}
                ref={ref}
                showsPointsOfInterest={false}
                showsBuildings={false}
                showsIndoors={false}
                style={styles.map}>
                {markers.map(m =>
                    <PointMarker
                        key={m.uid}
                        uid={m.uid}
                        id={m.id}
                        name={m.name}
                        onPress={onMarkerPress}
                        updateMarkerHandler={updateMarkerHandler}
                        onDragStart={onDragStart}
                        active={activeMarker.uid === m.uid}
                        latitude={m.latitude}
                        longitude={m.longitude}
                        status={m.status}
                        markerType={m.markerType}
                        itemType={m.itemType}
                        location={m.location}
                    />)}
                <ActiveMarker
                    updateMarkerHandler={updateMarkerHandler}
                    onDragStart={onDragActiveStart}
                    {...activeMarker} />
                <NewItemMarker
                    latitude={newItemMarker.latitude}
                    longitude={newItemMarker.longitude} />
            </MapView >
            <MarkerInfo
                viewActiveMarkerData={viewActiveMarkerData}
                shareActiveLocation={shareActiveLocation}
                zoomToCoordinates={zoomToCoordinates}
                {...activeMarker} />
            <NewItemView
                shareNewItemLocation={shareNewItemLocation}
                active={newItemMarker.active}
                createItemHandler={createItemHandler} />
            <LoadingView
                loading={loading} />
            <SearchBar
                satelliteMode={satelliteMode}
                setMarkerActive={setMarkerActive}
                resetActiveMarker={resetActiveMarker}
            />
            <ControlBar
                loading={loading}
                satelliteMode={satelliteMode}
                toggleSatelliteMode={toggleSatelliteMode}
                zoomToUserLocation={zoomToUserLocation}
                animateToCoordinates={animateToCoordinates} />
        </>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})