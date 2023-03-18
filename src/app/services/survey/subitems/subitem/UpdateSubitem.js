import { EventRegister } from "react-native-event-listeners"

export class UpdateSubitem {
    constructor(subitemRepo, subitemPresenter, subitemFactory) {
        this.subitemRepo = subitemRepo
        this.subitemPresenter = subitemPresenter
        this.subitemFactory = subitemFactory
    }

    async execute(subitemData) {
        const { id, uid, parentId, type, name, defaultName } = subitemData
        const currentTime = Date.now()
        const savedName = name === null || name === '' ? defaultName : name
        const subitem = this.subitemFactory.execute(id, uid, savedName, type, parentId, subitemData)
        const result = this.subitemPresenter.executeWithUpdate(await this.subitemRepo.update(subitem, currentTime), currentTime)
        EventRegister.emit('SUBITEM_UPDATED', result)
        return result
    }
}