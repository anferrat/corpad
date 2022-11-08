import React, { useState, useRef, useEffect } from 'react'
import { Animated, StyleSheet, PermissionsAndroid, ActivityIndicator, Pressable } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import Geolocation from 'react-native-geolocation-service'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/core'
import SingleIconButton from '../_Stateless/SingleIconButton'
import * as Sensors from "react-native-sensors"
import { errorHandler } from '../errorHandler'
import { basic200, primary } from '../../styles/GlobalStyle'
//leave it in case of manual calculation of tilt-compensated heading

const twoPi = Math.PI * 2
const R = 6371e3
const PiOver180 = Math.PI / 180


//Sensors.setUpdateIntervalForType(Sensors.SensorTypes['orientation'], 50)


//Sensors.setUpdateIntervalForType(Sensors.orientation, 200)

export default NavigationWidget = () => {
    const latitude = useSelector(state => state.item.view?.latitude)
    const longitude = useSelector(state => state.item.view?.longitude)
    const enableWidget = latitude !== null && longitude !== null && latitude && longitude
    const [active, setActive] = useState(false)
    const [distance, setDistance] = useState(null)
    const [direction, setDirection] = useState(null)
    const [permissionGranted, setPermissionGranted] = useState(null)

    //Holds animated value for arrow angle turning
    const arrowAngle = useRef(new Animated.Value(0))

    //holds bearing values for averaging in Rad from -Pi to Pi
    const bearingData = useRef(new Array())

    //heading of the test point location in Rad
    const pointHeading = useRef(0)

    //holds last average bearing value
    const displacementAngle = useRef({
        prev: 0, // current average bearing in Rad (-infinity, +infinity)
        loop: 0  // number of 2Pi loops in avergae bearing (for smooth arrow animation)
    })

    const componentMounted = useRef(true)

    const rotation = arrowAngle.current.interpolate({
        inputRange: [-twoPi, 0],
        outputRange: ['-360deg', '0deg']
    })

    useEffect(() => {
        if (active) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: "Location permission",
                message: "App reqiures access to location service to record current position",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }).then((status => componentMounted.current ? setPermissionGranted(status === 'granted') : null))
        }
    }, [active])

    useEffect(() => () => componentMounted.current = false, [])

    useFocusEffect(React.useCallback(() => {
        if (enableWidget && active) {
            if (permissionGranted === true) {
                const watchId = Geolocation.watchPosition(updateLocation, errorHandler.bind(this, 800, setActive.bind(this, false)), { enableHighAccuracy: true, interval: 200, distanceFilter: 0 })
                //const subscribe = Sensors.orientation.subscribe(updateHeading)
                return () => {
                    //subscribe.unsubscribe()
                    Geolocation.clearWatch(watchId)
                }
            }
            else if (permissionGranted === false) {
                errorHandler(900)
                setActive(false)
            }
        }
    }, [active, enableWidget, permissionGranted]))


    const updateHeading = React.useCallback((orientation) => {
        const arraySize = 3 // 
        const minStep = .02 //in Radians
        const bearing = bearingCalculator(pointHeading.current, orientation.yaw) // from -Pi to Pi

        //adding new heading to the array, removing the oldest one and finding average
        if (Math.abs(bearing - bearingData.current[0]) > minStep || (bearingData.current.length < arraySize)) {
            bearingData.current = [bearing].concat(bearingData.current)
            bearingData.current = bearingData.current.slice(0, arraySize)
            const headingAverage = circularMean(bearingData.current) + Math.PI // from (0 to 2Pi)

            const diff = displacementAngle.current.prev - headingAverage - (displacementAngle.current.loop * twoPi)

            //if average heading jumps from 0 to 2Pi or vise versa, add/remove another loop, for continueous displacementAngle.current.prev values
            if (Math.abs(diff) > 6) {
                if (diff > 0)
                    displacementAngle.current.loop++
                else
                    displacementAngle.current.loop--
            }
            displacementAngle.current.prev = headingAverage + (displacementAngle.current.loop * twoPi)
            Animated.timing(arrowAngle.current, {
                toValue: displacementAngle.current.prev,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }, [arrowAngle, pointHeading, bearingData])

    const updateLocation = React.useCallback((locationObject) => {
        if (enableWidget) {
            const data = coordTransform(latitude, longitude, locationObject.coords.latitude, locationObject.coords.longitude)
            pointHeading.current = data.heading
            setDirection(getDirection(Math.round(data.heading / Math.PI * 180) + 180))
            setDistance(getDistance(data.distance))
        }
    }, [latitude, longitude])

    if (!enableWidget)
        return null
    else
        if (active)
            if (direction === null || distance === null)
                return <ActivityIndicator style={styles.activity} color={primary} />
            else
                return (
                    <Pressable style={styles.main} android_ripple={{ color: basic200 }}>
                        {/*
                        <Animated.View style={{ ...styles.arrow, transform: [{ rotate: rotation }] }}>
                            <Icon name='navigation' fill={primary} style={{ height: 20, width: 20 }} />
                        </Animated.View>
                */}
                        <Text appearance='hint' style={styles.direction}>{direction}</Text>
                        <Text appearance='hint'>{distance}</Text>
                    </Pressable>
                )
        else
            return (
                <SingleIconButton
                    iconName='navigation'
                    onPress={setActive.bind(this, true)} />
            )
}

const bearingCalculator = (pointHeading, phoneHeading) => pointHeading - phoneHeading

const circularMean = (angles) => Math.atan2(
    angles.reduce((sin_sum, a) => sin_sum + Math.sin(a), 0) / angles.length,
    angles.reduce((cos_sum, a) => cos_sum + Math.cos(a), 0) / angles.length
)

export const coordTransform = (lat1, lon1, lat2, lon2) => {
    const fi1 = lat1 * PiOver180
    const fi2 = lat2 * PiOver180
    const deltaL = (lon2 - lon1) * PiOver180
    const b = Math.atan2(deltaL * Math.cos(fi2), Math.cos(fi1) * Math.sin(fi2) - Math.sin(fi1) * Math.cos(fi2) * Math.cos(deltaL))
    const d = Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(deltaL)) * R
    return { distance: d, heading: b }
}

const getDirection = (b) => {
    if (b >= 338 || b < 23)
        return 'N'
    else if (b >= 23 && b < 68)
        return 'NE'
    else if (b >= 68 && b < 113)
        return 'E'
    else if (b >= 113 && b < 158)
        return 'SE'
    else if (b >= 158 && b < 203)
        return 'S'
    else if (b >= 203 && b < 248)
        return 'SW'
    else if (b >= 248 && b < 293)
        return 'W'
    else return 'NW'
}

export const getDistance = (d) => {
    const dR = Math.round(d)
    if (dR === -1)
        return '-'
    if (dR === 0)
        return '< 1 m'
    else if (dR > 0 && dR < 1000)
        return dR.toString() + ' m'
    else if (dR > 999 && dR < 10000)
        return (dR / 1000).toPrecision(3) + ' km'
    else if (dR > 10000 && dR < 100000)
        return Math.round(dR / 1000).toString() + ' km'
    else if (dR > 100000)
        return '> 100 km'

}

const styles = StyleSheet.create({
    direction: {
        marginRight: 12
    },
    arrow: {
        marginHorizontal: 12,
        width: 20,
        height: 20,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        padding: 6,
        borderRadius: 10,
    },
    activity: {
        marginRight: 22
    }
})
