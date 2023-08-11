import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import PointMarker from './components/markers/PointMarker'
import ActiveMarker from './components/markers/ActiveMarker'
import { mapStyle } from './components/map_style/style'
import MapView from 'react-native-maps'
import MarkerInfo from './components/MarkerInfo'
import NewItemMarker from './components/markers/NewItemMarker'
import NewItemView from './components/NewItem'
import LoadingView from './components/LoadingView'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import useMarkers from './hooks/useMarkers'
import ControlBar from './ControlBar'

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
                        //timeModified={m.timeModified}
                        //timeCreated={m.timeCreated}
                        //comment={m.comment}
                        testPointType={m.testPointType}
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
            <ControlBar
                loading={loading}
                satelliteMode={satelliteMode}
                setMarkerActive={setMarkerActive}
                resetActiveMarker={resetActiveMarker}
                toggleSatelliteMode={toggleSatelliteMode}
                zoomToUserLocation={zoomToUserLocation}
                animateToCoordinates={animateToCoordinates}
            />
        </>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})