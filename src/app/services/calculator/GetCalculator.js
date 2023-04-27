export class GetCalculator {
    constructor(calculatorRepo, basicPresenter) {
        this.calculatorRepo = calculatorRepo
        this.basicpresenter = basicPresenter
    }

    async execute(id) {
        const calculator = await this.calculatorRepo.getById(id)
        return this.basicPresenter.execute(calculator)
    }
}