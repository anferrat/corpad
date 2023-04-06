import { useState, useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

const getLocationPermission = async () => {
    return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location permission",
        message: "App reqiures access to location service to display your current position",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
    })
}

export const requestLocationAsync = async () => {
    const locationPermission = await getLocationPermission()
    if (locationPermission === 'granted')
        return await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(location => {
                resolve({
                    status: 200,
                    location: location
                })
            },
                (er) => {
                    if (er?.code === 3)
                        resolve({ status: 803 })
                    else
                        resolve({ status: 800 })
                },
                {
                    timeout: 2000,
                    accuracy: { android: 'high' },
                    enableHighAccuracy: true,
                    maximumAge: 10,
                    distanceFilter: 0.1,
                    showLocationDialog: true,
                    forceRequestLocation: true,
                })
        })
}

export const useLocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        accuracy: null
    })
    useEffect(() => {
        const permission = getLocationPermission()
        if (permission)
            watchId = Geolocation.watchPosition(({ coords }) => {
                const { accuracy, latitude, longitude } = coords
                setLocation({ accuracy, latitude, longitude })
            }, () => { },
                {
                    maximumAge: 200,
                    accuracy: { android: 'high' },
                    distanceFilter: 0.1,
                    fastestInterval: 1000,
                    interval: 1000,
                    timeout: 200

                })
        return () => {
            if (permission)
                Geolocation.clearWatch(watchId)
        }
    }, [])

    return location
}
