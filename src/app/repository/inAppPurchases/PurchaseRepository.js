import { SubscriptionStatus } from "../../entities/survey/other/SubscriptionStatus";

export class PurchaseRepository {
    _freeStatus() {
        return new SubscriptionStatus('free', true, 2059974000000, false, null)
    }

    init() {}

    async getOfferings() { return null }

    async purchase() { return this._freeStatus() }

    async getStatus() { return this._freeStatus() }

    async restorePurchases() { return this._freeStatus() }
}
