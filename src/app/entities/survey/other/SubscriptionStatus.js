export class SubscriptionStatus {
    constructor(identifier, isActive, expirationTime, offlineFlag, managmentUrl) {
        this.isActive = isActive
        this.identifier = identifier
        this.expirationTime = expirationTime
        this.offlineFlag = offlineFlag
        this.managmentUrl = managmentUrl
    }
}