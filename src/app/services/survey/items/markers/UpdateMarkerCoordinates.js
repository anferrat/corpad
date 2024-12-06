import { ItemTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class UpdateMarkerCoordinates {
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
        else throw new Error(errors.GENERAL, `Item type ${itemType} is not supported`)
    }

    _getMarker({ itemType, itemId }) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.getById([itemId])
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.getById([itemId])
            default:
                throw new Error(errors.GENERAL, `Item type ${itemType} is not supported`)
        }
    }

    async execute({ itemType, itemId, latitude, longitude }) {
        const currentTime = Date.now()
        const [marker] = await this._getMarker({ itemId, itemType })
        marker.updateCoordinates({ latitude, longitude, timeModified: currentTime })
        return this.basicPresenter.execute(await this._updateMarker(marker))
    }

}