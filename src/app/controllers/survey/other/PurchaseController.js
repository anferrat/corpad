import { Controller } from "../../../utils/Controller"
import { GetOfferings } from "../../../services/purchases/GetOfferings"
import { PurchaseSubscription } from "../../../services/purchases/PurchaseSubscription"
import { UpdateSubscriptionStatus } from "../../../services/purchases/UpdateSubscriptionStatus"
import { networkRepo, purchaseRepo } from "../../_instances/repositories"
import { RestorePurchases } from "../../../services/purchases/RestorePurchases"

class PurchaseController extends Controller {
    constructor(purchaseRepo, networkRepo) {
        super()
        this.getOfferingsService = new GetOfferings(purchaseRepo, networkRepo)
        this.purchaseSubscriptionService = new PurchaseSubscription(purchaseRepo, networkRepo)
        this.updateSubscriptionStatusService = new UpdateSubscriptionStatus(networkRepo, purchaseRepo)
        this.restorePurchasesService = new RestorePurchases(purchaseRepo, networkRepo)
    }

    getOfferings(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 114, async () => {
            return this.getOfferingsService.execute()
        })
    }

    purchase(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 115, async () => {
            const { pack } = params
            return this.purchaseSubscriptionService.execute(pack)
        })
    }

    updateStatus(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 117, async () => {
            return this.updateSubscriptionStatusService.execute()
        })
    }

    restore(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 118, async () => {
            return this.restorePurchasesService.execute()
        })
    }



}

const purchaseController = new PurchaseController(
    purchaseRepo,
    networkRepo
)

export const getOfferings = (onError, onSuccess) => purchaseController.getOfferings(onError, onSuccess)

export const purchaseSubscription = ({ pack }, onError, onSuccess) => purchaseController.purchase({ pack }, onError, onSuccess)

export const updateSubscriptionStatus = (onError, onSuccess) => purchaseController.updateStatus(onError, onSuccess)

export const restorePurchases = (onError, onSuccess) => purchaseController.restore(onError, onSuccess)