import { Marker } from "../../../../entities/survey/items/Marker"
import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"
import { Error } from "../../../../utils/Error"

export class UpdateMarker {
    constructor(testPointRepo, rectifierRepo, basicPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.basicPresenter = basicPresenter
    }

    _updateMarker(marker) {
        const { itemType } = marker
        if (itemType === ItemTypes.TEST_POINT)
            return this.testPointRepo.updateMarker(marker)
        else if (itemType === ItemTypes.RECTIFIER)
            return this.rectifierRepo.updateMarker(marker)
        else throw new Error('CorpadError', `Item type ${itemType} is not supported`)
    }

    async execute(markerData) {
        const { id, uid, latitude, longitude, comment, location, status, testPointType, timeCreated, name, itemType } = markerData
        const currentTime = Date.now()
        const marker = new Marker(id, uid, name, status, timeCreated, currentTime, comment, itemType, testPointType, location, latitude, longitude)
        return this.basicPresenter.execute(await this._updateMarker(marker))
    }

}