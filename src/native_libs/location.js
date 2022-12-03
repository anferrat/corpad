import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'


export const requestLocationAsync = async () => {
    const locationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location permission",
        message: "App reqiures access to location service to display your current position",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
    })
    if (locationPermission === 'granted')
        try {
            return await new Promise((resolve, reject) => {
                Geolocation.getCurrentPosition(loc => resolve({
                    status: 200,
                    location: loc
                }),
                    (er) => {
                        if (er?.code === 3)
                            resolve({ status: 803 })
                        else
                            resolve({ status: 800 })
                    },
                    {
                        timeout: 6000,
                        accuracy: { android: 'high' },
                        enableHighAccuracy: true,
                        maximumAge: 4000,
                        distanceFilter: 1
                    })
            })
        }
        catch (er) {
            if (er?.code === 3)
                return {
                    status: 803
                }
            else
                return ({
                    status: 800
                })
        }
    else return ({
        status: 900
    })
}