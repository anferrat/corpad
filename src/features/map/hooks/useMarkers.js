import { useCallback, useRef, useEffect, useState } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { useSelector, useDispatch } from 'react-redux'
import { getMarker, getMarkerList } from '../../../app/controllers/survey/items/MarkerController'
import { getInitialMapRegion, shareLocationWithExtarnalApp } from '../../../app/controllers/survey/other/GeolocationController'
import { errorHandler } from '../../../helpers/error_handler'
import { activateMarker, clearPendingMapMarker, deleteMarker, loadMarkers, resetMap, resetActiveMarkers, setMapReady, setNewItemMarker, toggleSatellite, updateMarker } from '../../../store/actions/map'
import { updateMarkerCoordinates } from '../../../app/controllers/survey/items/MarkerController'
import { hapticMapPress, hapticMedium, hapticMap } from '../../../native_libs/haptics'
import { useIsFocused } from '@react-navigation/native'
import { createItem } from '../../../app/controllers/survey/items/ItemController'
import { roundCoord } from '../helpers/functions'
import { alertHandler } from '../../../app/controllers/_instances/general_services'
import { translateMap } from '../../../localization'

const useMarkers = ({ navigateToEdit, ref }) => {
    const map = useSelector(state => state.map)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const { loading, activeMarker, markers, newItemMarker, satelliteMode, activeMapLayerMarker, isFirstLoad, filters, activeCalculatorMarker, mapReady, pendingMarker, fitMarkersAfterLoad } = map
    const [initialCameraState, setInitialCameraState] = useState('idle')

    const currentRegion = useRef({
        latitudeDelta: 0.0135,
        longitudeDelta: 0.0135,
        latitude: 0,
        longitude: 0,
    })
    const userLocation = useRef({
        latitude: 0,
        longitude: 0,
    })
    const pendingCameraTimeoutRef = useRef(null)
    const pendingCameraRef = useRef(false)
    const initialCameraMarkersRef = useRef(null)
    const mountedRef = useRef(true)
    const activeMarkerRef = useRef({
        itemType: null,
        itemId: null
    })

    const activateMarkerFromSource = useCallback(async ({ itemId, itemType }) => {
        const { status, response } = await getMarker({ itemType, itemId })
        if (status === 200)
            if (response.latitude !== null && response.longitude !== null && response.name !== null) {
                //check null for name as well. newly created items may be
                dispatch(activateMarker(response))
                return response
            }
        return null
    }, [dispatch])

    const loadData = useCallback(async () => {
        const shouldFitMarkers = fitMarkersAfterLoad
        const { status, response } = await getMarkerList({ filters }, er => errorHandler(er))
        if (status === 200) {
            dispatch(loadMarkers(response))
            if (shouldFitMarkers && !pendingMarker) {
                initialCameraMarkersRef.current = response
                setInitialCameraState('waiting')
            }
            else if (isFirstLoad) {
                //The initial camera waits for both marker loading and map readiness.
                if (pendingMarker)
                    return

                if (activeMarkerRef.current.itemType === null) {
                    initialCameraMarkersRef.current = response
                    setInitialCameraState('waiting')
                }
                else
                    activateMarkerFromSource(activeMarkerRef.current)
            }
        }
        else {
            dispatch(loadMarkers([]))
            if (isFirstLoad && !pendingMarker && activeMarkerRef.current.itemType === null) {
                initialCameraMarkersRef.current = []
                setInitialCameraState('waiting')
            }
        }
    }, [activateMarkerFromSource, dispatch, filters, fitMarkersAfterLoad, isFirstLoad, pendingMarker])

    useEffect(() => {
        if (loading && isFocused)
            loadData()
    }, [loading, isFocused, loadData])

    useEffect(() => {
        const onUpdateHandler = EventRegister.addEventListener('GLOBAL_ITEM_UPDATED', async ({ itemType, itemId }) => {
            if (!loading && (itemType === 'TEST_POINT' || itemType === 'RECTIFIER')) {
                const { status, response } = await getMarker({ itemType, itemId })
                if (status === 200)
                    dispatch(updateMarker(response))
            }
        })

        const onDeleteHandler = EventRegister.addEventListener('GLOBAL_ITEM_DELETED', ({ itemId, itemType }) => {
            if (activeMarkerRef.current.itemId === itemId && activeMarkerRef.current.itemType === itemType) {
                activeMarkerRef.current.itemId = null
                activeMarkerRef.current.itemType = null
            }
            if (!loading && (itemType === 'TEST_POINT' || itemType === 'RECTIFIER'))
                dispatch(deleteMarker(itemId, itemType))
        })

        const onAnimateToRegion = EventRegister.addEventListener('animateToRegion', (mapRegion) => {
            if (mapRegion?.valid === true && ref.current?.animateToRegion)
                ref.current.animateToRegion(mapRegion, 1000)
        })

        return () => {
            EventRegister.removeEventListener(onUpdateHandler)
            EventRegister.removeEventListener(onDeleteHandler)
            EventRegister.removeEventListener(onAnimateToRegion)
        }
    }, [loading, activeMarkerRef, dispatch, ref])

    useEffect(() => {
        if (!loading && isFocused && !pendingCameraRef.current && activeMarkerRef.current.itemId !== null && activeMarkerRef.current.itemType !== null) {
            activateMarkerFromSource(activeMarkerRef.current)
            activeMarkerRef.current.itemType = null
            activeMarkerRef.current.itemId = null
        }
    }, [activateMarkerFromSource, isFocused, loading, activeMarkerRef])

    useEffect(() => {
        if (mapReady && isFocused && initialCameraState === 'idle' && !pendingCameraRef.current && activeMarker.latitude !== null && activeMarker.longitude !== null)
            animateToCoordinates(activeMarker.latitude, activeMarker.longitude)
    }, [activeMarker.latitude, activeMarker.longitude, animateToCoordinates, initialCameraState, isFocused, mapReady])

    const zoomToCoordinates = useCallback((latitude, longitude) => {
        const LATITUDE_OFFSET = 0.00007 //offset due to info view overlay
        const DELTA = 0.001
        ref.current.animateToRegion({
            latitude: latitude - LATITUDE_OFFSET,
            latitudeDelta: DELTA,
            longitude: longitude,
            longitudeDelta: DELTA,
        }, 300)
    }, [ref])

    const animateToCoordinates = useCallback((latitude, longitude) => {
        const LATITUDE_OFFSET_MULTIPLIER = 0.15 //offset due to info view overlay
        ref.current.animateToRegion({
            latitude: latitude - LATITUDE_OFFSET_MULTIPLIER * currentRegion.current.latitudeDelta,
            latitudeDelta: currentRegion.current.latitudeDelta,
            longitude: longitude,
            longitudeDelta: currentRegion.current.longitudeDelta,
        }, 300)
    }, [currentRegion, ref])

    useEffect(() => {
        if (initialCameraState !== 'waiting' || loading || !isFocused || !mapReady)
            return

        if (pendingMarker) {
            initialCameraMarkersRef.current = null
            setInitialCameraState('idle')
            return
        }

        const markersForRegion = initialCameraMarkersRef.current
        if (!markersForRegion)
            return

        const noMarkersLoaded = !markersForRegion.some(({latitude, longitude}) => Number.isFinite(latitude) && Number.isFinite(longitude))
        initialCameraMarkersRef.current = null
        setInitialCameraState('preparing')
        let cancelled = false

        const animateInitialRegion = async () => {
            const regionData = await getInitialMapRegion({ markers: markersForRegion })
            if (cancelled || !mountedRef.current)
                return

            if (regionData.status === 200 && ref.current?.animateToRegion) {
                if (noMarkersLoaded)
                    alertHandler.execute(translateMap('noMarkersLoaded'))
                setInitialCameraState('animating')
                ref.current.animateToRegion(regionData.response)
            }
            else
                setInitialCameraState('idle')
        }

        animateInitialRegion()

        return () => {
            cancelled = true
        }
    }, [initialCameraState, isFocused, loading, mapReady, pendingMarker, ref])

    useEffect(() => {
        if (!pendingMarker || loading || !isFocused || !mapReady || initialCameraState !== 'idle')
            return

        pendingCameraRef.current = true
        dispatch(clearPendingMapMarker())
        activateMarkerFromSource(pendingMarker).then(marker => {
            if (!mountedRef.current)
                return

            if (!marker) {
                pendingCameraRef.current = false
                return
            }

            if (pendingCameraTimeoutRef.current !== null)
                clearTimeout(pendingCameraTimeoutRef.current)

            pendingCameraTimeoutRef.current = setTimeout(() => {
                pendingCameraTimeoutRef.current = null
                pendingCameraRef.current = false
                if (isFocused && mapReady)
                    zoomToCoordinates(marker.latitude, marker.longitude)
            }, 300)
        })
    }, [activateMarkerFromSource, dispatch, initialCameraState, isFocused, loading, mapReady, pendingMarker, zoomToCoordinates])

    useEffect(() => () => {
        mountedRef.current = false
        if (pendingCameraTimeoutRef.current !== null)
            clearTimeout(pendingCameraTimeoutRef.current)
        dispatch(resetMap())
    }, [dispatch])


    const onRegionChange = useCallback(({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
        currentRegion.current.latitude = latitude
        currentRegion.current.longitude = longitude
        currentRegion.current.latitudeDelta = latitudeDelta
        currentRegion.current.longitudeDelta = longitudeDelta
        if (initialCameraState === 'animating')
            setInitialCameraState('idle')
    }, [currentRegion, initialCameraState])

    const onUserLocationChange = useCallback(({ nativeEvent }) => {
        if (nativeEvent && nativeEvent.coordinate && Number.isFinite(nativeEvent.coordinate.latitude) && Number.isFinite(nativeEvent.coordinate.longitude)) {
            userLocation.current.latitude = nativeEvent.coordinate.latitude
            userLocation.current.longitude = nativeEvent.coordinate.longitude
        }
    }, [userLocation])

    const onMapPress = useCallback(() => {
        //Reseting active and newItem markers if selected
        if (activeMarker.id !== null || newItemMarker.active || activeMapLayerMarker.layerId !== null || activeCalculatorMarker.calculatorId !== null)
            dispatch(resetActiveMarkers())
    }, [activeMarker.id !== null, newItemMarker.active, dispatch, activeMapLayerMarker.layerId !== null, activeCalculatorMarker.calculatorId !== null])

    const updateMarkerHandler = useCallback(async (marker, lat, lon) => {
        const latitide = roundCoord(lat)
        const longitude = roundCoord(lon)
        dispatch(updateMarker({ ...marker, latitude: latitide, longitude: longitude })) //timeModified is not updated. Doesnt break anything, but keep in mind
        await updateMarkerCoordinates({ itemId: marker.id, itemType: marker.itemType, latitude: latitide, longitude: longitude },
            er => {
                dispatch(updateMarker(marker))
                errorHandler(er)
            },
            () => animateToCoordinates(lat, lon)
        )

    }, [dispatch, animateToCoordinates])

    const onDragStart = useCallback(() => {
        hapticMedium()
        dispatch(resetActiveMarkers())
    }, [dispatch])

    const onDragActiveStart = useCallback(() => {
        hapticMedium()
    }, [dispatch])

    const newItemMarkerHandler = useCallback(({ nativeEvent: { coordinate: { latitude, longitude } } }) => {
        hapticMap()
        const lat = roundCoord(latitude)
        const lon = roundCoord(longitude)
        dispatch(setNewItemMarker(lat, lon))
    }, [dispatch])

    const zoomToUserLocation = useCallback(() => {
        if (Number.isFinite(userLocation.current.latitude) && Number.isFinite(userLocation.current.longitude)) {
            zoomToCoordinates(userLocation.current.latitude, userLocation.current.longitude)
        }
        else errorHandler(112)
    }, [userLocation, zoomToCoordinates])

    const onMarkerPress = useCallback((marker) => {
        hapticMapPress()
        dispatch(activateMarker(marker))
    }, [dispatch])

    const createItemHandler = useCallback(async (itemType) => {
        const { latitude, longitude } = newItemMarker
        const { status, response } = await createItem({ itemType, latitude, longitude }, er => errorHandler(er))
        if (status === 200) {
            navigateToEdit(response.id, itemType)
            activeMarkerRef.current.itemId = response.id
            activeMarkerRef.current.itemType = itemType
            dispatch(resetActiveMarkers())
        }
    }, [navigateToEdit, newItemMarker.latitude, newItemMarker.longitude])

    const shareActiveLocation = useCallback((latitude, longitude, name) => {
        if (Number.isFinite(latitude) && Number.isFinite(longitude))
            shareLocationWithExtarnalApp({
                latitude,
                longitude,
                name
                //provider: 'google' //attempt to open in GoogleMaps if possible on iOS
            },
                er => errorHandler(er))
    }, [])

    const shareNewItemLocation = useCallback(() => {
        if (Number.isFinite(newItemMarker.latitude) && Number.isFinite(newItemMarker.longitude))
            shareLocationWithExtarnalApp({
                latitude: newItemMarker.latitude,
                longitude: newItemMarker.longitude,
                name: 'Location'
                //provider: 'google' //attempt to open in GoogleMaps if possible on iOS
            },
                er => errorHandler(er))
    }, [newItemMarker.latitude, newItemMarker.longitude])

    const toggleSatelliteMode = useCallback(() => dispatch(toggleSatellite()), [dispatch])

    const onMapReady = useCallback(() => { dispatch(setMapReady()) }, [dispatch])

    return {
        markers,
        satelliteMode,
        activeMarker,
        newItemMarker,
        isFocused,
        ref,
        onRegionChange,
        onUserLocationChange,
        zoomToUserLocation,
        onDragStart,
        onDragActiveStart,
        updateMarkerHandler,
        onMapPress,
        onMarkerPress,
        animateToCoordinates,
        newItemMarkerHandler,
        createItemHandler,
        shareActiveLocation,
        shareNewItemLocation,
        toggleSatelliteMode,
        zoomToCoordinates,
        onMapReady,
    }
}

export default useMarkers
