import { Calculator } from "../../entities/Calculator"

export class SaveCalculator {
    constructor(calculatorRepo, basicPresenter) {
        this.calculatorRepo = calculatorRepo
        this.basicPresenter = basicPresenter
    }

    async execute(calculatorData) {
        const { name, calculatorType, data, latitude, longitude, timeCreated } = calculatorData
        const calculator = new Calculator(null, name, calculatorType, data, timeCreated, latitude, longitude)
        return this.basicPresenter.execute(await this.calculatorRepo.save(calculator))
    }
}