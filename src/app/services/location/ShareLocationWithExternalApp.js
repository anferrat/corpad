import { Platform } from "react-native"

export class ShareLocationWithExtarnalApp {
    constructor(linkingService) {
        this.linkingService = linkingService
        this.mapSchema = {
            ios: 'maps://0,0?q=',
            google: 'geo:0,0?q='
        }
    }

    async _getUrl(provider, latitude, longitude, label) {
        const googleSchema = `${this.mapSchema.google}${latitude},${longitude}(${label})`
        const iosSchema = `${this.mapSchema.ios}${label}@${latitude},${longitude}`
        if (Platform.OS === 'android')
            return 'google'
        else if (provider === 'google') {
            const googleMapsAvailable = await this.linkingService.canOpenUrl(googleSchema)
            if (googleMapsAvailable)
                return googleSchema
        }
        return iosSchema
    }

    async execute(latitude, longitude, provider, name) {
        const url = await this._getUrl(provider, latitude, longitude, name)
        this.linkingService.openUrl(url)
    }
}