
import { Controller } from "../../../utils/Controller"
import { GetCurrentPosition } from "../../../services/location/GetCurrentPosition"
import { WatchPosition } from "../../../services/location/WatchPosition"
import { GeolocationRepository } from "../../../repository/geolocation/GeolocationRepository"
import { GetMapRegion } from "../../../services/location/GetMapRegion"
import { GeolocationCalculator } from "../../../services/other/GeolocationCalculator"
import { WatchDistanseAndBearing } from "../../../services/location/WatchDistanseAndBearing"
import { GetDeclination } from "../../../services/location/GetDeclination"

class GeolocationController extends Controller {
    constructor(geolocationRepo, geolocationCalculator) {
        super()
        this.geolocationRepo = geolocationRepo
        this.getCurrentPositionService = new GetCurrentPosition(geolocationRepo)
        this.watchPositionService = new WatchPosition(geolocationRepo)
        this.getMapRegionService = new GetMapRegion(geolocationRepo, geolocationCalculator)
        this.watchDistanceAndBearingService = new WatchDistanseAndBearing(geolocationRepo, geolocationCalculator)
        this.getDeclinationService = new GetDeclination(geolocationRepo)
    }

    watch(callback, onError = null, onSuccess = null) { //wrong plese redoo
        return this.watchPositionService.execute(data =>
            super.controllerHandler(onSuccess, onError, 800, async () => {
                callback(data)
            }))

    }

    watchDistanceAndBearing({ latitude, longitude, onUpdate }, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 800, () => {
            return this.watchDistanceAndBearingService.execute(onUpdate, latitude, longitude)
        })
    }

    getCurrent(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 800, async () => {
            return this.getCurrentPositionService.execute()
        })
    }

    getMapRegion(params, onError = null, onSuccess = null) {
        const { markers } = params
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return this.getMapRegionService.execute(markers)
        })
    }

    getPermission(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 902, async () => {
            return (await this.geolocationRepo.getPermission()) === 'granted'
        })
    }

    getDeclination(params, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 801, () => {
            const { latitude, longitude } = params
            return this.getDeclinationService.execute(latitude, longitude)
        })
    }
}

const geolocationController = new GeolocationController(
    new GeolocationRepository(), new GeolocationCalculator())

export const getLocationPermission = (onError, onSuccess) => geolocationController.getPermission(onError, onSuccess)

export const watchPosition = (callback, onError, onSuccess) => geolocationController.watch(callback, onError, onSuccess)

export const watchDistanceAndBearing = ({ onUpdate, latitude, longitude }, onError, onSuccess) => geolocationController.watchDistanceAndBearing({ onUpdate, latitude, longitude }, onError, onSuccess)

export const getCurrentPosition = (onError, onSuccess) => geolocationController.getCurrent(onError, onSuccess)

export const getInitialMapRegion = ({ markers }, onError, onSuccess) => geolocationController.getMapRegion({ markers }, onError, onSuccess)

export const getDeclination = ({ latitude, longitude }, onError, onSuccess) => geolocationController.getDeclination({ latitude, longitude }, onError, onSuccess)
