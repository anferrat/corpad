import { SubscriptionStatuses } from "../../../constants/global"

export class PurchaseSubscription {
    constructor(purchaseRepo, networkRepo) {
        this.purchaseRepo = purchaseRepo
        this.networkRepo = networkRepo
    }

    async execute(pack) {
        await this.networkRepo.isInternetOnCheck()
        const { expirationTime, isActive, managmentUrl } = await this.purchaseRepo.purchase(pack)
        if (isActive) {
            return {
                status: SubscriptionStatuses.GRANTED,
                expirationTime: expirationTime,
                managmentUrl
            }
        }
        else
            return {
                status: SubscriptionStatuses.NOT_GRANTED,
                expirationTime: expirationTime,
                managmentUrl
            }
    }
}