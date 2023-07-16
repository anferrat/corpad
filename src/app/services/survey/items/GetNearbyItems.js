import { ItemTypes, SortingOptions } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class GetNearbyItems { //Need to rework this
    constructor(testPointRepo, rectifierRepo, geolocationRepo, geolocationCalculator) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.geolocationRepo = geolocationRepo
        this.geolocationCalculator = geolocationCalculator
        this.NUMBER_OF_SITES = 5
    }

    _getRepo(itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo
            default:
                throw new Error(errors.GENERAL, 'No such tem type', 'itemType is not supported for this action')
        }
    }

    _getIdList(latitude, longitude) {
        const repo = this._getRepo(itemType)
        return repo.getIdList({ sorting: SortingOptions.NEAREST, latitude, longitude })
    }

    _getItems(itemType, idList) {
        const repo = this._getRepo(itemType)
        return repo.getById(idList.filter((_, i) => i < this.NUMBER_OF_SITES))
    }

    async execute() {
        const { latitude, longitude } = await this.geolocationRepo.getCurrent()
        const idList = await this._getIdList(itemType, latitude, longitude)
        const items = await this._getItems(itemType, idList)
        return items
            .filter(({ latitude, longitude }) => latitude !== null && longitude !== null)
            .map(item => ({
                ...item,
                distance: this.geolocationCalculator.haversine(latitude, longitude, item.latitude, item.longitude)
            }))
            .sort((a, b) => a.distance - b.distance)
    }
}