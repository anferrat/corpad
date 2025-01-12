import { Platform } from "react-native"
import Purchases from 'react-native-purchases';
import { appStoreKey, playStoreKey } from "../../config/purchases";
import { Error, errors } from "../../utils/Error";
import { SubscriptionStatus } from "../../entities/survey/other/SubscriptionStatus";

export class PurchaseRepository {
    constructor() {
    }

    init() {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
        Purchases.configure({
            apiKey: Platform.select({
                ios: appStoreKey,
                macos: appStoreKey,
                android: playStoreKey,
                default: null
            })
        })
    }

    async getOfferings() {
        try {
            const offerings = await Purchases.getOfferings()
            if (offerings.all["default"] !== null && offerings.all["default"].availablePackages.length !== 0)
                return offerings.all["default"].availablePackages[0]
            else throw "No available packages"
        }
        catch (er) {
            throw new Error(errors.PURCHASE, 'Unable to get offers', er)
        }
    }

    async purchase(pack) {
        //package is a package from getOfferings method
        try {
            const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pack)
            if (typeof customerInfo.entitlements.active['Premium'] !== "undefined") {
                const { identifier, isActive, expirationDate } = customerInfo.entitlements.active['Premium']
                return new SubscriptionStatus(identifier, isActive, Date.parse(expirationDate), false)
            }
            else throw 'Identifier was not updated'
        }
        catch (er) {
            if (er.userCancelled)
                throw new Error(errors.PURCHASE, 'Unable to complete the purchase', 'Cancelled by user', 101)
            else
                throw new Error(errors.PURCHASE, 'Unable to complete the purchase', er)
        }
    }

    async getStatus() {
        try {
            const customerInfo = await Purchases.getCustomerInfo()
            if (customerInfo.entitlements.active.isEmpty)
                throw 'No entitlements'
            const { identifier, isActive, expirationDate } = customerInfo.entitlements.active['Premium']
            return new SubscriptionStatus(identifier, isActive, Date.parse(expirationDate), false)
        }
        catch (er) {
            return new SubscriptionStatus(null, false, null, false)
        }
    }

    async restorePurchases() {
        try {
            const customerInfo = await Purchases.restorePurchases()
            if (customerInfo.entitlements.active.isEmpty)
                return new SubscriptionStatus(null, false, null, false)
            else {
                const { identifier, isActive, expirationDate } = customerInfo.entitlements.active['Premium']
                return new SubscriptionStatus(identifier, isActive, Date.parse(expirationDate), false)
            }
        }
        catch (er) {
            throw new Error(errors.PURCHASE, 'Unable to restore purchases', er)
        }
    }
}