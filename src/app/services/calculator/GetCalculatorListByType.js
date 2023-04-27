export class GetCalculatorListByType {
    constructor(calculatorRepo, listPresenter) {
        this.calculatorRepo = calculatorRepo
        this.listPresenter = listPresenter
    }

    async execute(type) {
        const list = await this.calculatorRepo.getList(type)
        return this.listPresenter.execute(list)
    }
}