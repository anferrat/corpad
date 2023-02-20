import React, { useRef, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PointMarker from './PointMarker'
import ActiveMarker from './ActiveMarker'
import { sendRequest } from '../../api/database/index'
import { loadMarkers, setActiveMarker, addMarker, updateMarker, deleteMarker, setNewItemMarker, setMyLocationActive, refreshMarkers, setMarkerUpdate, setShowMarker } from '../../store/actions/map'
import { useIsFocused } from '@react-navigation/native'
import { mapStyle } from './mapStyle'
import MapView from 'react-native-maps'
import MarkerInfo from './MarkerInfo'
import NewItemMarker from './NewItemMarker'
import NewItemView from './NewItemView'
import LoadingView from './components/LoadingView'
import OverlayView from './OverlayView'
import { hapticMap, hapticMedium } from '../../native_libs/haptics'
import { calculateInitRegion, genRequestObject } from '../../helpers/functions'
import { requestLocationAsync } from '../../native_libs/location'
import FocusAwareStatusBar from './components/FocusAwareStatusBar'
import { errorHandler } from '../../helpers/error_handler'
import { enableLatestRenderer } from 'react-native-maps'
import fieldValidation from '../../helpers/validation'

const getMyLocationRegion = async () => {
    const myLoc = await requestLocationAsync()
    if (myLoc.status === 200)
        return {
            latitudeDelta: 0.25,
            longitude: myLoc.location.coords.longitude,
            longitudeDelta: 0.25,
            latitude: myLoc.location.coords.latitude
        }
    else return null

}

const getInitRegion = async (markers, initialRegion) => {
    // calculates initial region to display when map is loaded for the first time.
    // if there are markers - calculates region that can include all of the markers
    // if there are no markers - zooms to current user location
    // if location isn't available - zooms to pre-defined north america region
    const calcRegion = calculateInitRegion(markers)
    if (calcRegion !== null)
        return calcRegion
    else {
        const locationRegion = await getMyLocationRegion()
        if (locationRegion !== null)
            return locationRegion
        else return initialRegion
    }

}

enableLatestRenderer()

const initRegion = { // default init region of NA if there's no data to calculate actual init region
    latitude: 38.910594121910854,
    latitudeDelta: 69.4862269475757,
    longitude: -101.67061429470778,
    longitudeDelta: 58.88461388647556
}

const Map = (props) => {
    const dispatch = useDispatch()
    const activeMarker = useSelector(state => state.map.activeMarker) //selected Marker
    const refreshing = useSelector(state => state.map.refreshing) // markers are being loaded from database
    const updating = useSelector(state => state.map.updating) // markers are being updated because test point or rectifier data has been changed
    const markers = useSelector(state => state.map.markers) //markers data
    const showMarker = useSelector(state => state.map.showMarker)
    const newItemMarker = useSelector(state => state.map.newItemMarker) // when longPress on Map new marker apperas and offers to create an item at that coordinate
    const isFocused = useIsFocused() // used for map statusBar. statusbar color changed bases on satellite/regular view. 
    const locationActive = useRef(false)
    const ref = useRef()
    const region = useRef()
    const componentMounted = useRef(true)
    const satellite = useSelector(state => state.map.satellite)
    const userLocation = useRef({ latitude: null, longitude: null })

    useEffect(() => {
        componentMounted.current = true
        const fetchData = async () => {
            if (refreshing && isFocused) {
                const markersData = await sendRequest('SELECT', 'MARKERS', {})
                if (markersData.status === 200) {
                    if (showMarker.id === null) {
                        //if there will be an active marker no need to calculate init region
                        const startRegion = await getInitRegion(markersData.result, initRegion)
                        if (startRegion !== initRegion)
                            ref.current.animateToRegion(startRegion, 400)
                    }
                    dispatch(loadMarkers(markersData.result))
                }
                else errorHandler(615)
            }
        }
        fetchData()
    }, [refreshing, isFocused])

    useEffect(() => () => {
        componentMounted.current = false
        dispatch(refreshMarkers())
    }, [])

    useEffect(() => {
        const updateHandler = async () => {
            if (updating?.action === 'DELETE') {
                dispatch(deleteMarker(updating?.id, updating?.dataType))
            }
            else if (updating?.action === 'INSERT' || updating?.action === 'UPDATE') {
                const marker = await sendRequest('SELECT', 'MARKER', { id: updating?.id, dataType: updating?.dataType })
                if (marker.status === 200) {
                    if (componentMounted.current && marker.result !== null)
                        if (updating?.action === 'INSERT')
                            dispatch(addMarker(marker.result))
                        else dispatch(updateMarker(marker.result))
                }
                else {
                    dispatch(setMarkerUpdate('RESET'))
                    //errorHandler(616)
                }
            }
        }
        if (updating !== null && updating)
            updateHandler()

    }, [updating])

    useEffect(() => {
        //showMarker - external request to display marker on map (e.g.  from View screen)
        if (!refreshing) {
            if (showMarker.id !== null && showMarker.dataType !== null) {
                const markerIndex = markers.findIndex(marker => marker.id === showMarker.id && marker.dataType === showMarker.dataType)
                if (markerIndex !== -1)
                    dispatch(setActiveMarker(markers[markerIndex]))
                else dispatch(setShowMarker())
            }
        }
    }, [showMarker, refreshing])

    const zoomToTestPoint = useCallback((latitude, longitude) => {
        if (!refreshing && latitude !== null && longitude !== null)
            ref.current.animateToRegion({
                latitude: region.current?.latitudeDelta ? latitude - 0.15 * region.current?.latitudeDelta : latitude - 0.002,
                latitudeDelta: region.current?.latitudeDelta ?? 0.0135,
                longitude: longitude,
                longitudeDelta: region.current?.longitudeDelta ?? 0.0135,
            }, 300)
    }, [ref, region, refreshing])

    const activeMarkerHandler = useCallback((marker) => {
        dispatch(setActiveMarker(marker))
    }, [dispatch])

    const mapOnPressHandler = useCallback(() => {
        if (activeMarker.uid !== null)
            dispatch(setActiveMarker(null))
        if (newItemMarker.latitude !== null)
            dispatch(setNewItemMarker())
    }, [dispatch, activeMarker, newItemMarker])

    const onDragStart = (isActive) => {
        hapticMedium()
        if (!isActive)
            dispatch(setActiveMarker())
    }

    const onDragEnd = React.useCallback(async (e, marker, isActive) => {
        const newLat = e.nativeEvent?.coordinate?.latitude
        const newLon = e.nativeEvent?.coordinate?.longitude
        const lat = fieldValidation(newLat, 'latitude')
        const lon = fieldValidation(newLon, 'longitude')
        if (lat.valid && lon.valid) {
            const updateRequest = await sendRequest('UPDATE', marker.dataType + '_PROPERTY', [
                { ...genRequestObject(marker.dataType, marker.id), property: 'latitude', value: lat.value },
                { ...genRequestObject(marker.dataType, marker.id), property: 'longitude', value: lon.value }
            ])
            if (updateRequest.status === 200) {
                dispatch(updateMarker({
                    dataType: marker.dataType,
                    id: marker.id,
                    uid: marker.uid,
                    status: marker.status,
                    latitude: lat.value,
                    longitude: lon.value,
                    testPointType: marker.testPointType,
                    name: marker.name,
                    location: marker.location
                }))
                if (!isActive) {
                    zoomToTestPoint(lat.value, lon.value)
                }
                return
            }
        }
        // figure out a way to reset marker to it's original position in case of error
        errorHandler(614)
    }, [dispatch, zoomToTestPoint])

    const displayNewItemMarker = useCallback((e) => {
        hapticMap()
        dispatch(setNewItemMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude))
    }, [dispatch])

    const regionTracker = useCallback((r) => {
        region.current = r
    }, [region])

    const myLocationNotActive = useCallback(() => {
        if (locationActive.current) {
            dispatch(setMyLocationActive(false))
            locationActive.current = false
        }
    }, [dispatch, locationActive])

    const updateUserLocation = useCallback((e) => {
        userLocation.current.latitude = e.nativeEvent.coordinate.latitude
        userLocation.current.longitude = e.nativeEvent.coordinate.longitude
    }, [userLocation])

    const zoomToMyLocation = useCallback(() => {
        if (userLocation.current.latitude !== null && userLocation.current.longitude !== null) {
            ref.current.animateToRegion({
                latitude: userLocation.current.latitude,
                latitudeDelta: 0.0135,
                longitude: userLocation.current.longitude,
                longitudeDelta: 0.0135,
            }, 300)
            setTimeout(() => { // I dont like it, but works most of the time
                dispatch(setMyLocationActive(true))
                locationActive.current = true
            }, 350)

        }
    }, [ref, userLocation, locationActive])

    const renderMarkers = React.useMemo(() => markers.map(m =>
        <PointMarker
            key={m.uid}
            uid={m.uid}
            id={m.id}
            name={m.name}
            onPress={activeMarkerHandler}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart.bind(this, false)}
            active={activeMarker.uid === m.uid}
            latitude={m.latitude}
            longitude={m.longitude}
            status={m.status}
            testPointType={m.testPointType}
            dataType={m.dataType}
            location={m.location}
        />, [activeMarker.uid, markers, onDragEnd, onDragStart]))
    return (
        <>
            <FocusAwareStatusBar
                backgroundColor='transparent'
                translucent={true}
                barStyle={satellite && isFocused ? 'light-content' : 'dark-content'} />
            <MapView
                showsCompass={false}
                mapType={satellite ? "satellite" : "standard"}
                onRegionChangeComplete={regionTracker}
                onRegionChange={myLocationNotActive}
                onLongPress={displayNewItemMarker}
                onPress={mapOnPressHandler}
                customMapStyle={mapStyle}
                showsUserLocation={isFocused ? true : false}
                showsMyLocationButton={false}
                moveOnMarkerPress={false}
                onUserLocationChange={updateUserLocation}
                ref={ref}
                showsPointsOfInterest={false}
                showsBuildings={false}
                showsIndoors={false}
                style={styles.map}
                initialRegion={initRegion}>
                {renderMarkers}
                <ActiveMarker
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart.bind(this, true)}
                    zoomToTestPoint={zoomToTestPoint}
                    {...activeMarker} />
                <NewItemMarker
                    latitude={newItemMarker.latitude}
                    longitude={newItemMarker.longitude} />
            </MapView >
            <MarkerInfo
                zoomToTestPoint={zoomToTestPoint}
                navigateToView={props.navigateToView}
                {...activeMarker} />
            <NewItemView
                navigateToEdit={props.navigateToEdit}
                latitude={newItemMarker.latitude}
                longitude={newItemMarker.longitude} />
            <LoadingView
                refreshing={refreshing} />
            <OverlayView
                zoomToMyLocation={zoomToMyLocation}
                zoomToTestPoint={zoomToTestPoint} />
        </>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})