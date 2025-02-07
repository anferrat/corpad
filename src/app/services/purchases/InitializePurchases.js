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
                expirationTime: status.expirationTime,
                managementUrl: status.managementUrl
            }
        }
        else {
            await this.settingRepo.updateOfflineCount(offlineCount + 1)
            return {
                status: SubscriptionStatuses.UNKNOWN_GRANTED,
                expirationTime: status.expirationTime,
                managementUrl: status.managementUrl
            }
        }
    }

    async execute() {
        try {
            this.purchaseRepo.init()
            const isInternetOn = await this.networkRepo.checkConnection()
            const status = await this.purchaseRepo.getStatus()
            if (!status.isActive)
                return {
                    status: SubscriptionStatuses.NOT_GRANTED,
                    expirationTime: status.expirationTime,
                    managementUrl: null
                }
            else if (isInternetOn) {
                await this.settingRepo.updateOfflineCount(0)
                return {
                    status: SubscriptionStatuses.GRANTED,
                    expirationTime: status.expirationTime,
                    managementUrl: status.managementUrl,
                }
            }
            else {
                //Here the status we recieve is from the cache, so we need to verify if cashed value satisfies checks
                const [offlineCount] = await Promise.all([this.settingRepo.getOfflineCount()])
                if (offlineCount >= this.OFFLINE_COUNT_LIMIT)
                    return {
                        status: SubscriptionStatuses.UNKNOWN_NOT_GRANTED,
                        expirationTime: status.expirationTime,
                        managementUrl: status.managementUrl,
                    }
                else
                    /*
                    LOCATION BASED TIME VERIFICATION - POSSIBLY MOVE IT TO A SEPARATE SERVICE
                    */
                    return await this._getStatus(Date.now(), status, offlineCount)
            }
        }
        catch (er) {
            return {
                status: SubscriptionStatuses.UNKNOWN_NOT_GRANTED,
                expirationTime: null,
                managementUrl: null
            }
        }
    }
}