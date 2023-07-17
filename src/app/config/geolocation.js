import Geolocation from '@react-native-community/geolocation'

//@react-native-comumity/geolocation is used for capturing GNSS time for ON/OFF cycle syncronization only. Uses android API by default
Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'android' })

export const timeFix = { //global store for timeFix. store timestamps of exact moment from gnss and device. Maybe NTP will be added here later.
    gnss: null,
    device: null
}