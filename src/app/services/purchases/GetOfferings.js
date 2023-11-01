export class GetOfferings {
    constructor(purchaseRepo, networkRepo) {
        this.purchaseRepo = purchaseRepo
        this.networkRepo = networkRepo
    }

    async execute() {
        await this.networkRepo.isInternetOnCheck()
        return await this.purchaseRepo.getOfferings()
    }
}