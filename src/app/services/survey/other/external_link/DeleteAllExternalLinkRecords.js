export class DeleteAllExternalLinkRecords {
    constructor(externalLinkRepo) {
        this.externalLinkRepo = externalLinkRepo
    }


    async execute() {
        return await this.externalLinkRepo.deleteAll()
    }
}