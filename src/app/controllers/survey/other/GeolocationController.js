import { Controller } from "../../../utils/Controller"
import { GetCurrentPosition } from "../../../services/location/GetCurrentPosition"
import { WatchPosition } from "../../../services/location/WatchPosition"
import { GetInitialMapRegion } from "../../../services/location/GetInitialMapRegion"
import { WatchDistanseAndBearing } from "../../../services/location/WatchDistanseAndBearing"
import { GetDeclination } from "../../../services/location/GetDeclination"
import { ShareLocationWithExternalApp } from "../../../services/location/ShareLocationWithExternalApp"
import { GeolocationValidation } from "../../../validation/GeolocationValidation"
import { geolocationRepo } from "../../_instances/repositories"
import { geolocationCalculator, getMapRegionFromBbox, linkingService, permissions } from "../../_instances/general_services"

class GeolocationController extends Controller {
    constructor(geolocationRepo, geolocationCalculator, permissions, linkingService, getMapRegionFromBbox) {
        super()
        this.geolocationRepo = geolocationRepo
        this.permissions = permissions
        this.linkingService = linkingService
        this.getCurrentPositionService = new GetCurrentPosition(geolocationRepo, permissions)
        this.watchPositionService = new WatchPosition(geolocationRepo)
        this.getMapRegionService = new GetInitialMapRegion(geolocationRepo, geolocationCalculator, permissions, getMapRegionFromBbox)
        this.watchDistanceAndBearingService = new WatchDistanseAndBearing(geolocationRepo, geolocationCalculator)
        this.getDeclinationService = new GetDeclination(geolocationRepo)
        this.shareLocationWithExternalAppService = new ShareLocationWithExternalApp(this.linkingService)

        this.validation = new GeolocationValidation()
    }

    watch(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 800, () => {
            return this.watchPositionService.addListener(callback)
        })
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
            return this.permissions.location()
        })
    }

    getDeclination(params, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 801, () => {
            const { latitude, longitude } = params
            return this.getDeclinationService.execute(latitude, longitude)
        })
    }

    shareWithExternalApp(params, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 823, () => {
            const { latitude, longitude, provider, name } = this.validation.shareWithExternalApp(params)
            return this.shareLocationWithExternalAppService.execute(latitude, longitude, provider, name)
        })
    }
}

const geolocationController = new GeolocationController(
    geolocationRepo,
    geolocationCalculator,
    permissions,
    linkingService,
    getMapRegionFromBbox)

export const getLocationPermission = (onError, onSuccess) => geolocationController.getPermission(onError, onSuccess)

export const watchPosition = (callback, onError, onSuccess) => geolocationController.watch(callback, onError, onSuccess)

export const watchDistanceAndBearing = ({ onUpdate, latitude, longitude }, onError, onSuccess) => geolocationController.watchDistanceAndBearing({ onUpdate, latitude, longitude }, onError, onSuccess)

export const getCurrentPosition = (onError, onSuccess) => geolocationController.getCurrent(onError, onSuccess)

export const getInitialMapRegion = ({ markers }, onError, onSuccess) => geolocationController.getMapRegion({ markers }, onError, onSuccess)

export const getDeclination = ({ latitude, longitude }, onError, onSuccess) => geolocationController.getDeclination({ latitude, longitude }, onError, onSuccess)

export const shareLocationWithExtarnalApp = ({ latitude, longitude, name, provider }) => geolocationController.shareWithExternalApp({ latitude, longitude, name, provider })
