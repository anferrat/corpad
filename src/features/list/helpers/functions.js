import { DisplayCardDataTypes, ItemTypes } from '../../../constants/global'
import { PipelineMaterialLabels, CoarseFineOptionLabels, TestPointTypeLabels, ItemTypeLabels } from '../../../constants/labels'
import { getFormattedDate } from '../../../helpers/functions'
import { errorHandler } from "../../../helpers/error_handler"
import { getItemDisplayData, getItemIdList } from '../../../app/controllers/survey/items/ItemController'
import { getCurrentPosition } from '../../../app/controllers/survey/other/GeolocationController'
import { ItemTypeSingleIcons, TestPointTypeIcons } from '../../../constants/icons'

export const firstReading = (readingList) => {
    if (readingList.length !== 0)
        return readingList.findIndex(({ v1, v2 }) => v1 !== null || (v2 !== null && v2 !== undefined))
    else return -1
}

export const nextReading = (i, readingList) => {
    if (!readingList[i])
        return -1
    else
        if (!readingList[i + 1])
            return firstReading(readingList)
        else
            if (readingList[i + 1].v1 === null && (readingList[i + 1].v2 === null || readingList[i + 1].v2 === undefined))
                return nextReading(i + 1, readingList)
            else return i + 1
}

const getTapSettings = (tapSetting, tapCoarse, tapFine, tapValue) => {
    if (tapSetting === 0 && CoarseFineOptionLabels[tapCoarse] && CoarseFineOptionLabels[tapFine])
        return `C${CoarseFineOptionLabels[tapCoarse]} - F${CoarseFineOptionLabels[tapFine]}`
    else if (tapSetting === 1 && tapValue !== null)
        return tapValue + ' %'
    else if (tapSetting === 2)
        return 'Automatic'
    else return null
}

const itemDataHandler = (type, value) => {
    switch (Number(type)) {
        case DisplayCardDataTypes.TIME_MODIFIED:
            return getFormattedDate(value)
        case DisplayCardDataTypes.MATERIAL:
            return PipelineMaterialLabels[value] ?? null
        case DisplayCardDataTypes.LOCATION:
            return value
        case DisplayCardDataTypes.TAP:
            return getTapSettings(value.setting, value.coarse, value.fine, value.value)
        case DisplayCardDataTypes.ASSETS:
            return `Images: ${value}`
        default: return null
    }
}

const dataListHandler = (dataList) => Object.fromEntries(
    Object.keys(dataList)
        .map(key => [key, itemDataHandler(key, dataList[key])])
        .filter(([_, value]) => value !== null))

const readingListHandler = (readingList, displayedReading) => readingList.map((item) => ({
    ...item,
    v1: displayedReading === 4 ? valueFormatter(item.v1 ? 'Shorted' : null) : valueFormatter(item.v1),
    v2: valueFormatter(item.v2)
}))


export const fetchData = async (itemType, idList, filters, displayedReading) => {
    const { status, response } = await getItemDisplayData({ itemType, displayedReading, idList, readingTypeFilter: filters?.readingTypeFilter })
    if (status === 200)
        return response.map((displayData, index) => {
            try {
                const { dataList, id, itemType, name, readingList, status, timeModified, uid, testPointType } = displayData
                return ({
                    id: id,
                    uid: uid,
                    name: name,
                    itemType: itemType,
                    status: status,
                    timeModified: timeModified,
                    firstReadingIndex: firstReading(readingList),
                    dataList: dataListHandler(dataList),
                    icon: itemType === ItemTypes.TEST_POINT ? TestPointTypeIcons[testPointType] : ItemTypeSingleIcons[itemType],
                    subtitle: itemType === ItemTypes.TEST_POINT ? TestPointTypeLabels[testPointType] : ItemTypeLabels[itemType],
                    readingList: readingListHandler(readingList, displayedReading)
                })
            }
            catch (er) {
                return {
                    id: -1 * index,
                    uid: index + 'ErrorListItem',
                    firstReadingIndex: -1,
                    timeModified: Date.now(),
                    status: 3,
                    name: '#ERROR#',
                    subtitle: 'Item not found',
                    icon: 'default',
                    dataList: {},
                    readingList: [],
                }
            }
        })
    else return []
}

export const fetchIdList = async (itemType, filters = undefined, sorting = 0, latitude = undefined, longitude = undefined) => {
    // fetches Id's off all items from the list
    const { status, response } = await getItemIdList({ itemType, filters, sorting, latitude, longitude }, er => errorHandler(er))
    return status === 200 ? response : []
}

export const getLocationAsync = async () => {
    //Don't unite into one service with fetching id list
    const { response, status } = await getCurrentPosition()
    if (status === 200) {
        const { latitude, longitude } = response
        return { latitude, longitude }
    }
    else {
        errorHandler(800)
        return { latitude: 0, longitude: 0 }
    }
}

const valueFormatter = (a) => {
    if (a === undefined || a === null)
        return null
    else
        if (isNaN(a))
            return a + ' '
        else {
            const abs = Math.abs(a)
            if (abs >= 1000)
                return Math.floor((a / 1000)) + ' K'
            else if (abs < 1000 && abs > 1)
                return a.toPrecision(4) + ' '
            else if (abs <= 0.001) {
                return a.toFixed(3) + ' '
            }
            else return a.toFixed(3) + ' '
        }
}

export const dataListIcons = {
    0: {
        icon: 'clock-outline',
        pack: null
    },
    1: {
        icon: 'cube-outline',
        pack: null
    },
    2: {
        icon: 'map-outline',
        pack: null
    },
    3: {
        icon: 'options-outline',
        pack: null
    },
    4: {
        icon: 'image-outline',
        pack: null
    }
}