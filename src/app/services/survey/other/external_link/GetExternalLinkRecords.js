export class GetExternalLinkRecords {
    constructor(externalLinkRepo) {
        this.externalLinkRepo = externalLinkRepo
    }

    async execute() {
        return await this.externalLinkRepo.getAll()
    }
}