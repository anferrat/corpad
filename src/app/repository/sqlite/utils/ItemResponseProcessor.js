import { DisplayCardReading } from "../../../entities/survey/other/DisplayCard/DisplayCardReading"
import { DisplayCard } from "../../../entities/survey/other/DisplayCard/DisplayCard"
import { ItemTypes, IconTypes, ItemStatuses, DisplayCardDataTypes, SortingOptions } from "../../../../constants/global"

export class ItemResponseProcessor {
    constructor() {
        this.natSortASC = ` ORDER BY 
        (CASE
        WHEN (CAST(name AS INTEGER)==0 AND substr(name, 1) <> '0') THEN NULL
        ELSE CAST(name AS INTEGER)
        END) ASC NULLS LAST,
        (CASE
        WHEN (name IS NULL) OR (length(name)==1) OR ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN substr(name, 1, length(name)-1) COLLATE NOCASE
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'000')) THEN substr(name, 1, length(name)-2) COLLATE NOCASE
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'0000')) THEN substr(name, 1, length(name)-3) COLLATE NOCASE
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00000')) THEN substr(name, 1, length(name)-4) COLLATE NOCASE
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'000000')) THEN substr(name, 1, length(name)-5) COLLATE NOCASE
        ELSE substr(name, 1, length(name)-6) COLLATE NOCASE
        END),
        (CASE
        WHEN ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN CAST(substr(name, -1) AS INTEGER)
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'00')) THEN CAST(substr(name, -2) AS INTEGER)
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'00')) THEN CAST(substr(name, -3) AS INTEGER)
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00')) THEN CAST(substr(name, -4) AS INTEGER)
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'00')) THEN CAST(substr(name, -5) AS INTEGER)
        ELSE CAST(substr(name, -6) AS INTEGER)
        END) NULLS FIRST,
        name`
        this.natSortDESC = ` ORDER BY 
        (CASE
        WHEN (CAST(name AS INTEGER)==0 AND substr(name, 1) <> '0') THEN NULL
        ELSE CAST(name AS INTEGER)
        END) DESC NULLS FIRST, 
        (CASE
        WHEN (name IS NULL) OR (length(name)==1) OR ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN substr(name, 1, length(name)-1) COLLATE NOCASE 
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'000')) THEN substr(name, 1, length(name)-2) COLLATE NOCASE
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'0000')) THEN substr(name, 1, length(name)-3) COLLATE NOCASE
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00000')) THEN substr(name, 1, length(name)-4) COLLATE NOCASE
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'000000')) THEN substr(name, 1, length(name)-5) COLLATE NOCASE
        ELSE substr(name, 1, length(name)-6) COLLATE NOCASE
        END) DESC,
        (CASE
        WHEN ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN CAST(substr(name, -1) AS INTEGER)
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'00')) THEN CAST(substr(name, -2) AS INTEGER)
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'00')) THEN CAST(substr(name, -3) AS INTEGER)
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00')) THEN CAST(substr(name, -4) AS INTEGER)
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'00')) THEN CAST(substr(name, -5) AS INTEGER)
        ELSE CAST(substr(name, -6) AS INTEGER)
        END) DESC,
        name DESC
        `
    }


    sortingQuery(sorting, latitude = undefined, longitude = undefined) {
        switch (sorting) {
            case SortingOptions.ASCENDING_NAME:
                return this.natSortASC
            case SortingOptions.DESCENDING_NAME:
                return this.natSortDESC
            case SortingOptions.NEW_TO_OLD:
                return ' ORDER BY timeModified DESC'
            case SortingOptions.OLD_TO_NEW:
                return ' ORDER BY timeModified ASC'
            case SortingOptions.NEAREST:
                if (latitude && longitude)
                    return ' ORDER BY ((latitude-' + latitude + ')*(latitude-' + latitude + ')) + ((longitude - ' + longitude + ')*(longitude - ' + longitude + ')) ASC NULLS LAST'
                else return ''
            default: return ''
        }
    }

    generateDisplayCardList(result, idList, itemType) {
        let map = new Map()
        let savedValue
        for (i = 0; i < result.rows.length; i++) {
            let value = result.rows.item(i)
            if (value?.itemId !== savedValue?.itemId) {
                if (savedValue)
                    map.set(savedValue.itemId, savedValue)
                savedValue = { ...value, readingList: [], dataMap: {} }

                if (value?.timeModified)
                    savedValue.dataMap[DisplayCardDataTypes.TIME_MODIFIED] = value.timeModified
                if (value?.location !== null && value?.location !== undefined)
                    savedValue.dataMap[DisplayCardDataTypes.LOCATION] = value.location
                if (value?.material !== null && value?.material !== undefined)
                    savedValue.dataMap[DisplayCardDataTypes.MATERIAL] = value.material
                if (value?.tapSetting != null)
                    savedValue.dataMap[DisplayCardDataTypes.TAP] = {
                        setting: value.tapSetting,
                        value: value.tapValue,
                        fine: value.tapFine,
                        coarse: value.tapCoarse
                    }
            }
            if (value.type && value.name)
                savedValue.readingList.push(new DisplayCardReading(value.uid, value.name, value.type, value.v1, value.v2))

            if (i === result.rows.length - 1) {
                map.set(savedValue.itemId, savedValue)
            }
        }

        return idList.map(id => {
            const value = map.get(id)
            if (value) {
                const { itemId, itemUid, timeModified, status, itemName, dataMap, readingList, testPointType } = map.get(id)
                return new DisplayCard(itemId, itemUid, timeModified, status ?? ItemStatuses.NO_STATUS, itemName, itemType, dataMap, readingList, testPointType)
            }
            else return null
        }
        )
    }
}