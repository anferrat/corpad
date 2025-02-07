import { SubscriptionStatuses } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"

export class RestorePurchases {
    constructor(purchaseRepo, networkRepo) {
        this.purchaseRepo = purchaseRepo
        this.networkRepo = networkRepo
    }


    async execute() {
        await this.networkRepo.isInternetOnCheck()
        const subscriptionStatus = await this.purchaseRepo.restorePurchases()
        if (subscriptionStatus.isActive)
            return {
                status: SubscriptionStatuses.GRANTED,
                expirationTime: subscriptionStatus.expirationTime,
                managementUrl: subscriptionStatus.managementUrl
            }
        else
            throw new Error(errors.PURCHASE, 'Unable to restore purchases', 'No purchases to restore', 118)
    }
}