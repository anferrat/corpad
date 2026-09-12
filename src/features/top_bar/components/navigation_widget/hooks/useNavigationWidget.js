import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getLocationPermission, watchDistanceAndBearing } from '../../../../../app/controllers/survey/other/GeolocationController'
import { errorHandler } from '../../../../../helpers/error_handler'
import { getCardinalDirection, smoothBearing, updateNearbyState } from '../helpers/functions'

const initLocation = {
    bearing: null,
    distance: null,
    accuracy: null
}

const LOCATION_TIMEOUT = 12000

const useNavigationWidget = () => {
    const pointLatitude = useSelector(state => state.item.view.latitude)
    const pointLongitude = useSelector(state => state.item.view.longitude)
    const name = useSelector(state => state.item.view.name)
    const [location, setLocation] = useState(initLocation)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sensorEnabled, setSensorEnabled] = useState(false)
    const [nearby, setNearby] = useState(false)
    const filteredBearing = useRef(null)
    const locationReady = useRef(false)
    const sensorUnavailable = useRef(false)
    const enabled = pointLatitude !== null && pointLatitude !== undefined && pointLongitude !== null && pointLongitude !== undefined
    const direction = getCardinalDirection(location.bearing)

    const showModal = useCallback(() => {
        if (enabled)
            setVisible(true)
    }, [enabled])

    const hideModal = useCallback(() => {
        setVisible(false)
        setSensorEnabled(false)
        setLoading(true)
    }, [])

    const handleSensorUnavailable = useCallback(() => {
        sensorUnavailable.current = true
        if (locationReady.current) {
            hideModal()
            errorHandler(103)
        }
    }, [hideModal])

    const handleArrowReady = useCallback(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        let positionWatch
        let locationTimeout
        let cancelled = false

        const loadLocation = async () => {
            if (!visible)
                return

            const { status } = await getLocationPermission()
            if (cancelled)
                return

            if (status === 200) {
                setSensorEnabled(true)
                locationTimeout = setTimeout(() => {
                    if (!cancelled && !locationReady.current) {
                        hideModal()
                        errorHandler(800)
                    }
                }, LOCATION_TIMEOUT)
                positionWatch = watchDistanceAndBearing({
                    onUpdate: ({ distance, bearing, accuracy }) => {
                        if (cancelled)
                            return

                        const smoothedBearing = smoothBearing(filteredBearing.current, bearing, distance, accuracy)
                        filteredBearing.current = smoothedBearing
                        setNearby(current => updateNearbyState(current, distance, accuracy))

                        if (!locationReady.current) {
                            locationReady.current = true
                            clearTimeout(locationTimeout)
                            if (sensorUnavailable.current) {
                                hideModal()
                                errorHandler(103)
                                return
                            }
                        }

                        setLocation(state => ({ ...state, distance, bearing: smoothedBearing, accuracy }))
                    },
                    latitude: pointLatitude,
                    longitude: pointLongitude,
                    watchOptions: {
                        maximumAge: 1000,
                        fastestInterval: 500,
                        interval: 1000
                    }
                }, er => errorHandler(er))
            }
            else {
                hideModal()
                errorHandler(902)
            }
        }

        loadLocation()

        return () => {
            cancelled = true
            setSensorEnabled(false)
            clearTimeout(locationTimeout)
            if (positionWatch?.response?.remove)
                positionWatch.response.remove()
            setLocation(initLocation)
            filteredBearing.current = null
            setNearby(false)
            locationReady.current = false
            sensorUnavailable.current = false
        }
    }, [hideModal, pointLatitude, pointLongitude, visible])

    useEffect(() => {
        if (!nearby)
            setLoading(true)
    }, [nearby])

    return {
        name,
        enabled,
        showModal,
        visible,
        location,
        hideModal,
        direction,
        loading,
        nearby,
        sensorEnabled,
        handleSensorUnavailable,
        handleArrowReady
    }
}

export default useNavigationWidget
