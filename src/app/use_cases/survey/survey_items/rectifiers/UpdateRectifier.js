import { Rectifier } from "../../../../entities/survey/items/Rectifier"
import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"


export class UpdateRectifier {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
    }
    async execute({ id, uid, name, status, timeCreated, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent, defaultName }) {
        const currentTime = Date.now()
        const newName = name ?? defaultName
        const newItem = new Rectifier(id, uid, newName, status, timeCreated, currentTime, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
        await this.rectifierRepo.update(newItem)
        return newItem
    }
}