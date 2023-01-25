import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"
import { DefaultNameRepository } from "../../../../repository/sqlite/DefaultNameRepository"
import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"


export class GetRectifierById {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
        this.defaultNameRepo = new DefaultNameRepository()
    }
    async execute(id) {
        const [rectifier, defualtName] = await Promise.all([
            this.rectifierRepo.getById(id),
            this.defaultNameRepo.getByType(ItemTypes.RECTIFIER)
        ])
        rectifier.setDefaultName(defualtName)
        return rectifier
    }
}