export class CreateHistoryReading {
    constructor(multimeterReadingRepo) {
        this.multimeterReadingRepo = multimeterReadingRepo
    }

    async execute(reading) {
        return await this.multimeterReadingRepo.create(reading)
    }
}