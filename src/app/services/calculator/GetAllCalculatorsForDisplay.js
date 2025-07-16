export class GetAllCalculatorsForDisplay {
    constructor(calculatorRepo) {
        this.calculatorRepo = calculatorRepo
    }

    execute() {
        return this.calculatorRepo.getAllForMap()
    }
}