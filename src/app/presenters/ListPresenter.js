export class ListPresenter {
    constructor () { }

    execute(list) {
        return list.map(item => ({ ...item }))
    }
}