
import { Controller } from "../../../utils/Controller"
import { GetCurrentPosition } from "../../../services/location/GetCurrentPosition"
import { WatchPosition } from "../../../services/location/WatchPosition"
import { GeolocationRepository } from "../../../repository/geolocation/GeolocationRepository"
import { GetMapRegion } from "../../../services/location/GetMapRegion"
import { GeolocationCalculator } from "../../../services/other/GeolocationCalculator"

class GeolocationController extends Controller {
    constructor(geolocationRepo, geolocationCalculator) {
        super()
        this.getCurrentPositionService = new GetCurrentPosition(geolocationRepo)
        this.watchPositionService = new WatchPosition(geolocationRepo)
        this.getMapRegionService = new GetMapRegion(geolocationRepo, geolocationCalculator)
    }

    watch(callback, onError = null, onSuccess = null) {
        return this.watchPositionService.execute(data =>
            super.controllerHandler(onSuccess, onError, 800, async () => {
                callback(data)
            }))

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
}

const geolocationController = new GeolocationController(
    new GeolocationRepository(), new GeolocationCalculator())

export const watchPosition = (callback, onError, onSuccess) => geolocationController.watch(callback, onError, onSuccess)

export const getCurrentPosition = (onError, onSuccess) => geolocationController.getCurrent(onError, onSuccess)

export const getInitialMapRegion = ({ markers }, onError, onSuccess) => geolocationController.getMapRegion({ markers }, onError, onSuccess)
