export class SubscriptionStatus {
    constructor(identifier, isActive, expirationTime, offlineFlag) {
        this.isActive = isActive
        this.identifier = identifier
        this.expirationTime = expirationTime
        this.offlineFlag = offlineFlag
    }
}