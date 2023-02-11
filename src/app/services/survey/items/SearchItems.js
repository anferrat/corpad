export class SearchItem {
    constructor (surveyRepo, listPresenter) {
        this.surveyRepo = surveyRepo
        this.listPresenter = listPresenter
    }

    async execute(keyword) {
        const SEARCH_RESULT_LIMIT = 20
        return this.listPresenter.execute(await this.surveyRepo.searchItem(keyword, SEARCH_RESULT_LIMIT))
    }
}