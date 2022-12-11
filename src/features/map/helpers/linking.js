import { Linking } from "react-native"

//Android only
export const extMapHandler = async (lat, lng) => {
    if (lat !== null && lng !== null) {
        const url = 'geo:' + lat + ',' + lng + '?q=' + lat + ',' + lng
        const supported = await Linking.canOpenURL(url)
        if (supported)
            await Linking.openURL(url)
    }
}