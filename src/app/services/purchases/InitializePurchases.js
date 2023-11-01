import { SubscriptionStatuses } from "../../../constants/global"

export class InitializePurchases {
    constructor(purchaseRepo, networkRepo, geolocationRepo, settingRepo, permissions) {
        this.purchaseRepo = purchaseRepo
        this.networkRepo = networkRepo
        this.geolocationRepo = geolocationRepo
        this.settingRepo = settingRepo
        this.permissions = permissions
        this.OFFLINE_COUNT_LIMIT = 30
    }

    async _isLocationAvailable() {
        try {
            await this.permissions.location()
            return true
        }
        catch (er) {
            return false
        }
    }

    async _getStatus(currentTime, status, offlineCount) {
        const remainingTime = status.expirationTime - currentTime
        if (remainingTime <= 0) {
            await this.settingRepo.updateOfflineCount(this.OFFLINE_COUNT_LIMIT)
            return {
                status: SubscriptionStatuses.UNKNOWN_NOT_GRANTED,
                expirationTime: status.expirationTime
            }
        }
        else {
            await this.settingRepo.updateOfflineCount(offlineCount + 1)
            return {
                status: SubscriptionStatuses.UNKNOWN_GRANTED,
                expirationTime: status.expirationTime
            }
        }
    }

    async execute() {
        this.purchaseRepo.init()
        try {
            const isInternetOn = await this.networkRepo.checkConnection()
            const status = await this.purchaseRepo.getStatus()
            if (!status.isActive)
                return {
                    status: SubscriptionStatuses.NOT_GRANTED,
                    expirationTime: status.expirationTime
                }
            else
                if (isInternetOn && status.isActive) {
                    await this.settingRepo.updateOfflineCount(0)
                    return {
                        status: SubscriptionStatuses.GRANTED,
                        expirationTime: status.expirationTime
                    }
                }
                else {
                    //Here the status is from the cache, so we need to verify if cashed value satisfies checks
                    const [offlineCount] = await Promise.all([this.settingRepo.getOfflineCount()])
                    if (offlineCount >= this.OFFLINE_COUNT_LIMIT)
                        return {
                            status: SubscriptionStatuses.UNKNOWN_NOT_GRANTED,
                            expirationTime: status.expirationTime
                        }
                    else
                        /*
                    /* LOCATION BASED TIME VERIFICATION - POSSIBLY MOVE IT TO A SEPARATE SERVICE
                            {
                            const isLocation = await this._isLocationAvailable()
                            if (isLocation) {
                                const { gnss } = await this.geolocationRepo.getGpsTimeAdjustment(5000)
                                console.log(gnss)
                                if (gnss)
                                    return await this._getStatus(gnss, status, offlineCount)
                            }}
                            */
                        return await this._getStatus(Date.now(), status, offlineCount)
                }
        }
        catch (er) {
            return {
                status: SubscriptionStatuses.UNKNOWN_NOT_GRANTED,
                expirationTime: null
            }
        }
    }
}