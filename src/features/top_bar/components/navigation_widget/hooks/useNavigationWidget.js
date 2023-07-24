import { useState, useRef, useEffect, useCallback } from 'react'
import { Animated } from 'react-native'
import { useSelector } from "react-redux"
import { getLocationPermission, watchDistanceAndBearing } from "../../../../../app/controllers/survey/other/GeolocationController"
import { watchDeviceHeading } from '../../../../../app/controllers/survey/other/SensorController'
import { calculateRotationAngle, calculateResultHeading, getCardinalDirection } from '../helpers/functions'
import { errorHandler } from '../../../../../helpers/error_handler'

const initLocation = {
    bearing: null, // in deg (0-360) of remote point in respect to True North (Spherical Earth)
    distance: null, //in m, distance between device and remote point
    accuracy: null, // in m, accuracy of current user position
    heading: null, // in deg (0 - 360) device position in respect to Magnetic North
    declination: null //in deg difference between Magnetic and True North
}

const initArroRotation = new Animated.Value(0)

const useNavigationWidget = () => {
    const pointLatitude = useSelector(state => state.item.view.latitude)
    const pointLongitude = useSelector(state => state.item.view.longitude)
    const name = useSelector(state => state.item.view.name)
    const [location, setlocation] = useState(initLocation)
    const enabled = pointLatitude && pointLongitude //determines if widget can be used for test point
    const [visible, setVisisble] = useState(false)
    const [loading, setLoading] = useState(true) // true when orientation and location data available and obtained
    const componentMounted = useRef(true)
    const direction = getCardinalDirection(location.bearing)
    const arrowRotation = useRef(initArroRotation) //holds animated rotation value for arrow in deg (-infinity to infinity)
    const rotation = useRef(null) //hold prevoius rotation value in deg (-infinity to infinity)

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        let positionWatch
        let headingWatch
        const onLoad = async () => {
            if (visible) {
                const { status } = await getLocationPermission()
                if (status == 200) {
                    positionWatch = watchDistanceAndBearing({
                        onUpdate: ({ distance, bearing, accuracy, declination }) => {
                            setlocation(state => ({ ...state, distance, bearing, accuracy, declination }))
                        },
                        latitude: pointLatitude,
                        longitude: pointLongitude
                    },
                        er => errorHandler(er))
                    headingWatch = watchDeviceHeading(({ heading }) => setlocation(state => ({ ...state, heading })),
                        () => {
                            hideModal()
                            errorHandler(103)
                        })
                }
                else {
                    setVisisble(false)
                    setLoading(true)
                    errorHandler(902)
                }
            }
        }
        onLoad()
        return () => {
            if (visible) {
                if (headingWatch)
                    headingWatch.response.remove()
                if (positionWatch)
                    positionWatch.response.remove()
            }
            setlocation(initLocation)
            rotation.current = null
            arrowRotation.current.setValue(0)
        }
    },
        [visible])


    useEffect(() => {
        if (location.heading && location.bearing) {
            const diff = calculateResultHeading(location.heading, location.bearing, location.declination) //result heading of the user device in respect to remote point in deg (0 - 360) 
            const angle = calculateRotationAngle(rotation.current, diff) // arrow rotation angle. takes prev value and result heading to determine rotation (-infinity - +infinity)
            const firstReading = rotation.current === null
            rotation.current = angle
            if (firstReading)
                arrowRotation.current.setValue(angle)
            else
                Animated.timing(arrowRotation.current, {
                    toValue: angle,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            if (loading)
                setLoading(false)
        }
    }, [location, arrowRotation, rotation])

    const showModal = useCallback(() => {
        if (enabled)
            setVisisble(true)
    }, [enabled])

    const hideModal = useCallback(() => {
        setVisisble(false)
        setLoading(true)
    }, [])

    return {
        name,
        enabled,
        showModal,
        visible,
        location,
        arrowRotation,
        hideModal,
        direction,
        loading
    }
}

export default useNavigationWidget