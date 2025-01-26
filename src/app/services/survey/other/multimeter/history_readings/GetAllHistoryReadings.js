export class GetAllHistoryReadings {
    constructor(multimeterReadingRepo) {
        this.multimeterReadingRepo = multimeterReadingRepo
    }

    async execute() {
        return await this.multimeterReadingRepo.getAll()
    }
}