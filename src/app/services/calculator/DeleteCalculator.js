export class DeleteCalculator {
    constructor(calculatorRepo) {
        this.calculatorRepo = calculatorRepo
    }

    async executeById(id) {
        return await this.calculatorRepo.delete(id)
    }

    async executeByType(type) {
        return await this.calculatorRepo.deleteAll(type)
    }
}