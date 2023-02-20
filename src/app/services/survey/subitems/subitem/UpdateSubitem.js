export class UpdateSubitem {
    constructor (subitemRepo, subitemPresenter, subitemFactory) {
        this.subitemRepo = subitemRepo
        this.subitemPresenter = subitemPresenter
        this.subitemFactory = subitemFactory
    }

    async execute(subitemData) {
        const { id, uid, parentId, type, name } = subitemData
        const currentTime = Date.now()
        const subitem = this.subitemFactory.execute(id, uid, name, type, parentId, subitemData)
        return this.subitemPresenter.executeWithUpdate(await this.subitemRepo.update(subitem, currentTime), currentTime)
    }
}