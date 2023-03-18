import { EventRegister } from "react-native-event-listeners"

export class DeleteSubitem {
    constructor(subitemRepo) {
        this.subitemRepo = subitemRepo
    }

    async execute(itemId, subitemId, subitemType) {
        const currentTime = Date.now()
        await this.subitemRepo.delete(itemId, subitemId, subitemType, currentTime)
        EventRegister.emit('SUBITEM_DELETED', { itemId, subitemId, subitemType, timeModified: currentTime })
    }
}