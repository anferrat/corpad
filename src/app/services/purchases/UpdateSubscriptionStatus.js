import { SubscriptionStatuses } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"

export class UpdateSubscriptionStatus {
    constructor(networkRepo, purchaseRepo) {
        this.networkRepo = networkRepo
        this.purchaseRepo = purchaseRepo
    }

    async execute() {
        await this.networkRepo.isInternetOnCheck()
        const status = await this.purchaseRepo.getStatus()
        if (status.isActive)
            return {
                status: SubscriptionStatuses.GRANTED,
                expirationTime: status.expirationTime,
                managementUrl: status.managementUrl
            }
        else
            return {
                status: SubscriptionStatuses.NOT_GRANTED,
                expirationTime: status.expirationTime,
                managementUrl: status.managementUrl
            }
    }
}