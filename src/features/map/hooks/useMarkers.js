import { useCallback, useRef, useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { useSelector, useDispatch } from 'react-redux'
import { getMarker, getMarkerList } from '../../../app/controllers/survey/items/MarkerController'
import { getInitialMapRegion } from '../../../app/controllers/survey/other/GeolocationController'
import { errorHandler } from '../../../helpers/error_handler'
import { activateMarker, deleteMarker, loadMarkers, refreshMarkers, resetActiveMarkers, setActiveMarker, setMapReady, setNewItemMarker, toggleSatellite, updateMarker } from '../../../store/actions/map'
import { updateMarker as updateMarkerRequest } from '../../../app/controllers/survey/items/MarkerController'
import { hapticMedium, hapticMap } from '../../../native_libs/haptics'
import { useIsFocused } from '@react-navigation/native'
import { createItem } from '../../../app/controllers/survey/items/ItemController'
import { extMapHandler } from '../helpers/linking'
import { roundCoord } from '../helpers/functions'

const useMarkers = ({ navigateToEdit, navigateToView, ref }) => {
    const map = useSelector(state => state.map)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const { loading, activeMarker, markers, newItemMarker, satelliteMode } = map
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
    const activeMarkerRef = useRef({
        itemType: null,
        itemId: null
    })

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getMarkerList(er => errorHandler(er))
            if (status === 200) {
                dispatch(loadMarkers(response))
                //onLoad animate to initial region. if active marker exist on load, it will animate to active marker instead
                if (activeMarkerRef.current.itemType === null) {
                    const regionData = await getInitialMapRegion({ markers: response })
                    ref.current.animateToRegion(regionData.response)
                }
                else {
                    dispatch(setActiveMarker(activeMarkerRef.current.itemId, activeMarkerRef.current.itemType))
                }
            }
        }
        if (loading)
            loadData()

        const onUpdateHandler = EventRegister.addEventListener('GLOBAL_ITEM_UPDATED', async ({ itemType, itemId }) => {
            if (!loading && (itemType === 'TEST_POINT' || itemType === 'RECTIFIER')) {
                const { status, response } = await getMarker({ itemType, itemId }, er => errorHandler(er))
                if (status === 200) {
                    dispatch(updateMarker(response))
                }
            }
        })

        const onDeleteHandler = EventRegister.addEventListener('GLOBAL_ITEM_DELETED', ({ itemId, itemType }) => {
            if (!loading && (itemType === 'TEST_POINT' || itemType === 'RECTIFIER'))
                dispatch(deleteMarker(itemId, itemType))
        })


        const onDisplayHandler = EventRegister.addEventListener('selectOnMap', ({ itemId, itemType }) => {
            if (!loading) {
                if (activeMarkerRef.current.itemId !== itemId && activeMarkerRef.current.itemType !== itemType)
                    dispatch(setActiveMarker(itemId, itemType))
            }
            else {
                activeMarkerRef.current.itemId = itemId
                activeMarkerRef.current.itemType = itemType
            }
        })

        return () => {
            EventRegister.removeEventListener(onUpdateHandler)
            EventRegister.removeEventListener(onDeleteHandler)
            EventRegister.removeEventListener(onDisplayHandler)
        }
    }, [loading])

    useEffect(() => () => {
        dispatch(refreshMarkers())
    }, [])

    useEffect(() => {
        if (!loading && isFocused && activeMarkerRef.current.itemId !== null && activeMarkerRef.current.itemType !== null) {
            dispatch(setActiveMarker(activeMarkerRef.current.itemId, activeMarkerRef.current.itemType))
            activeMarkerRef.current.itemType = null
            activeMarkerRef.current.itemId = null
        }
    }, [isFocused, loading, activeMarkerRef])

    useEffect(() => {
        if (activeMarker.latitude && activeMarker.longitude)
            animateToCoordinates(activeMarker.latitude, activeMarker.longitude)
    }, [activeMarker.latitude, activeMarker.longitude])

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


    const onRegionChange = useCallback(({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
        currentRegion.current.latitude = latitude
        currentRegion.current.longitude = longitude
        currentRegion.current.latitudeDelta = latitudeDelta
        currentRegion.current.longitudeDelta = longitudeDelta
    }, [currentRegion])

    const onUserLocationChange = useCallback(({ nativeEvent: { coordinate: { latitude, longitude } } }) => {
        userLocation.current.latitude = latitude
        userLocation.current.longitude = longitude
    }, [userLocation])

    const onMapPress = useCallback(() => {
        //Reseting active and newItem markers if selected
        if (activeMarker.id !== null || newItemMarker.active)
            dispatch(resetActiveMarkers())
    }, [activeMarker.id !== null, newItemMarker.active, dispatch])

    const updateMarkerHandler = useCallback(async (marker, lat, lon) => {

        const latitide = roundCoord(lat)
        const longitude = roundCoord(lon)
        dispatch(updateMarker({ ...marker, latitude: latitide, longitude: longitude })) //timeModified is not updated. Doesnt break anything, but keep in mind
        const { errorMessage } = await updateMarkerRequest({ ...marker, latitude: latitide, longitude: longitude },
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

    const zoomToUserLocation = useCallback(() => zoomToCoordinates(userLocation.current.latitude, userLocation.current.longitude), [userLocation, zoomToCoordinates])

    const onMarkerPress = useCallback((marker) => dispatch(activateMarker(marker)), [dispatch])

    const createItemHandler = useCallback(async (itemType) => {
        const { latitude, longitude } = newItemMarker
        const { status, response } = await createItem({ itemType, latitude, longitude }, er => errorHandler(er))
        if (status === 200) {
            navigateToEdit(response.id, itemType)
            activeMarkerRef.current.itemId = response.id
            activeMarkerRef.current.itemType = itemType
        }
    }, [navigateToEdit, newItemMarker.latitude, newItemMarker.longitude])

    const shareActiveLocation = useCallback(() => {
        if (activeMarker.latitude && activeMarker.longitude)
            extMapHandler(activeMarker.latitude, activeMarker.longitude)
    }, [activeMarker.latitude, activeMarker.longitude])

    const shareNewItemLocation = useCallback(() => {
        if (newItemMarker.latitude && newItemMarker.longitude)
            extMapHandler(newItemMarker.latitude, newItemMarker.longitude)
    }, [newItemMarker.latitude, newItemMarker.longitude])

    const viewActiveMarkerData = useCallback(() => {
        navigateToView(activeMarker.id, activeMarker.itemType)
    }, [activeMarker.id, activeMarker.itemType])

    const toggleSatelliteMode = useCallback(() => dispatch(toggleSatellite()), [dispatch])

    const onMapReady = useCallback(() => { dispatch(setMapReady()) }, [dispatch])

    const setMarkerActive = useCallback((itemId, itemType) => dispatch(setActiveMarker(itemId, itemType)), [dispatch])

    const resetActiveMarker = useCallback(() => dispatch(resetActiveMarkers()), [dispatch])

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
        viewActiveMarkerData,
        toggleSatelliteMode,
        zoomToCoordinates,
        onMapReady,
        setMarkerActive,
        resetActiveMarker
    }
}

export default useMarkers