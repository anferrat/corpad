import { ItemTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class FindItemInSurvey {
    constructor(testPointRepo, rectifierRepo, geolocationCalculator, surveyRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.geolocationCalculator = geolocationCalculator
        this.surveyRepo = surveyRepo
        this.DISTANCE_FILTER = 50
    }

    async _getItems(itemType) {
        if (itemType === ItemTypes.TEST_POINT)
            return await this.testPointRepo.getAll()
        else if (itemType === ItemTypes.RECTIFIER)
            return await this.rectifierRepo.getAll()
        else throw new Error(errors.GENERAL, 'Unable to get items from survey', 'Item type is not supported')
    }

    _searchByName(name, searchedItems) {
        return [...searchedItems].sort((a, b) => {
            const aMatch = a.name === name
            const bMatch = b.name === name
            return aMatch && !bMatch ? -1 : (!aMatch && bMatch ? 1 : a.name.localeCompare(b.name))
        }).filter((_, i) => i <= 10)
    }

    _searchByUid(uid, items) {
        const uidMatch = items.findIndex(item => item.uid === uid)
        return ~uidMatch ? items[uidMatch] : null
    }

    _searchByCoordinates(latitide, longitude, items) {
        let filteredItems = []
        for (let i = 0; i < items.length; i++) {
            if (items[i].latitide === null || items[i].longitude === null || filteredItems.length >= 20)
                continue
            else {
                const { distance } = this.geolocationCalculator.haversine(latitide, longitude, items[i].latitude, items[i].longitude)
                if (distance > this.DISTANCE_FILTER)
                    continue
                else
                    filteredItems.push({
                        distance,
                        item: items[i]
                    })
            }
        }
        filteredItems.sort((a, b) => a.distance - b.distance)
        return filteredItems
    }

    async execute({ uid, name, itemType }) {
        const [items, searchedItems] = await Promise.all([this._getItems(itemType), this.surveyRepo.searchItem(name)])
        //using survey repo here to offload search from JS thread to sqlite
        const uidMatch = this._searchByUid(uid, items)
        const nameMatches = this._searchByName(name, searchedItems)
        return {
            nameMatches,
            uidMatch
        }
    }

    async executeByDistance({ itemType, latitude, longitude }) {
        const items = await this._getItems(itemType)
        return this._searchByCoordinates(latitude, longitude, items)
    }
}