export class SubscriptionStatus {
    constructor(identifier, isActive, expirationTime, offlineFlag, managementUrl) {
        this.isActive = isActive
        this.identifier = identifier
        this.expirationTime = expirationTime
        this.offlineFlag = offlineFlag
        this.managementUrl = managementUrl
    }
}