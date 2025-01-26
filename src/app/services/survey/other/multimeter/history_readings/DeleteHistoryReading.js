export class DeleteHistoryReading {
    constructor(multimeterReadingRepo) {
        this.multimeterReadingRepo = multimeterReadingRepo
    }

    async execute(id) {
        return await this.multimeterReadingRepo.delete(id)
    }
}