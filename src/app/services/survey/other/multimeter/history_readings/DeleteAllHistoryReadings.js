export class DeleteAllHistoryReadings {
    constructor(multimeterReadingRepo) {
        this.multimeterReadingRepo = multimeterReadingRepo
    }

    async execute() {
        return await this.multimeterReadingRepo.deleteAll()
    }
}