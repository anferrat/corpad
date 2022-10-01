import React, { useState, useRef, useEffect } from 'react'
import { View } from 'react-native'
import { Animated, StyleSheet, PermissionsAndroid, ActivityIndicator } from 'react-native'
import { Text } from '@ui-kitten/components'
import Geolocation from 'react-native-geolocation-service'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/core'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { magnetometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors"
import { errorHandler } from '../errorHandler'
import { primary } from '../../styles/GlobalStyle'

const twoPi = Math.PI * 2
const R = 6371e3
const PiOver180 = Math.PI / 180
setUpdateIntervalForType(SensorTypes.magnetometer, 50); // defaults to 100ms

export default NavigationWidget = () => {
    const latitude = useSelector(state => state.item.view?.latitude)
    const longitude = useSelector(state => state.item.view?.longitude)
    const enableWidget = latitude !== null && longitude !== null && latitude && longitude
    const [active, setActive] = useState(false)
    const [distance, setDistance] = useState(null)
    const [direction, setDirection] = useState(null)
    const [permissionGranted, setPermissionGranted] = useState(null)

    const arrowAngle = useRef(new Animated.Value(0)).current
    const headingData = useRef(new Array())
    const pointBearing = useRef(0)

    const componentMounted = useRef(true)

    const rotation = arrowAngle.interpolate({
        inputRange: [-Math.PI, +Math.PI],
        outputRange: ['-180deg', '180deg']
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
        try {
            if (enableWidget && active) {
                if (permissionGranted === true) {
                    const watchId = Geolocation.watchPosition(updateLocation, errorHandler.bind(this, 800, setActive.bind(this, false)), { enableHighAccuracy: true, distanceFilter: 1, interval: 500, })
                    //const headingSubscription = magnetometer.subscribe(updateHeading) //figure this out! hopefully they'll release update soon
                    return () => {
                        // headingSubscription.unsubscribe()
                        Geolocation.clearWatch(watchId)
                    }
                }
                else if (permissionGranted === false) {
                    errorHandler(900)
                    setActive(false)
                }
            }
        }
        catch (er) {
            errorHandler(800)
            setActive(false)
        }
    }, [active, enableWidget, permissionGranted]))

    /* Heading calculation - !!!CURRENTLY NOT IN USE, need to update formula for more accurate heading calculation with z-axis!!!
    1. Create array wihth headingData (pointBearing minus phoneBearing) of a fixed size. (headingData) (from 0 to 2Pi)
    2. On each heading update that changes bearingData more than a minStep value (in degrees), we updating the array pushing a new value to the begining of the array, and deleteing the last value from array keeping its size fixed
    */


    const updateHeading = React.useCallback((magnetometerData) => {
        const arraySize = 10 // 
        const minStep = .05 //in Radians
        const phoneBearing = bearingTransform(magnetometerData.x, magnetometerData.y)
        const heading_raw = headingCalculator(pointBearing.current, phoneBearing) // from 0 to 2 pi
        if (Math.abs(heading_raw - headingData.current[0]) > minStep || (headingData.current.length === 0)) {
            headingData.current = [heading_raw].concat(headingData.current)
            headingData.current = headingData.current.slice(0, arraySize)
            const heading_new = circularMean(headingData.current) // from (-Pi to Pi)
            Animated.timing(arrowAngle, {
                toValue: heading_new,
                duration: 10,
                useNativeDriver: true
            }).start()
        }
    }, [])

    const updateLocation = React.useCallback((locationObject) => {
        if (enableWidget) {
            const data = coordTransform(latitude, longitude, locationObject.coords.latitude, locationObject.coords.longitude)
            pointBearing.current = data.bearing
            const direction_new = getDirection(Math.round(data.bearing / Math.PI * 180) + 180)
            setDirection(direction_new)
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
                    <View style={styles.main}>
                        {/*
                    <Animated.View style={{ ...styles.arrow, transform: [{ rotate: rotation }] }}>
                        <Icon name='navigation' fill={primary} style={{ height: 20, width: 20 }} />
                    </Animated.View>
                    */}
                        <Text appearance='hint' style={styles.direction}>{direction}</Text>
                        <Text appearance='hint'>{distance}</Text>
                    </View>
                )
        else
            return (
                <View style={styles.main}>
                    <SingleIconButton
                        iconName='navigation'
                        onPress={setActive.bind(this, true)} />
                </View>
            )
}

const headingCalculator = (pointBearing, phoneBearing) => {
    const a = pointBearing - phoneBearing
    if (a < 0)
        return a + twoPi
    else if (a > twoPi)
        return a - twoPi
    else return a
}

const bearingTransform = (x, y) => {
    return Math.atan2(y, x) + Math.PI / 2
}

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
    return { distance: d, bearing: b }
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
        marginHorizontal: 6,
        width: 20,
        height: 20,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12
    },
    activity: {
        marginRight: 22
    }
})
