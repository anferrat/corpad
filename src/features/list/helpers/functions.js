import { pipeMaterials } from '../../../constants/constants'
import { getFormattedDate, iconHandlerItem, subtitleHandlerItem, getTapSettings, displayReadingValue } from '../../../helpers/functions'
import { sendRequest } from "../../../api/database/index"
import { errorHandler } from "../../../helpers/functions"
import { requestLocationAsync } from "../../../native_libs/location"

export const firstReading = (readingList) => {
    if (readingList !== 'none')
        return readingList.findIndex(list => list.readings !== 'none')
    else return -1
}

export const nextReading = (i, readingList) => {
    if (!readingList[i])
        return null
    else
        if (!readingList[i + 1])
            return firstReading(readingList)
        else
            if (readingList[i + 1].readings === 'none')
                return nextReading(i + 1, readingList)
            else return i + 1
}

const genErrorDisplayCard = (id) => (
    {
        id: id,
        uid: id + 'ErrorListItem',
        firstReadingIndex: -1,
        timeModified: Date.now(),
        status: 3,
        name: '#ERROR#',
        subtitle: 'Item not found',
        mainIcon: 'default',
        dataList: [{ type: 'timeModified', value: getFormattedDate(Date.now()) }],
        readingList: 'none',
    }
)

const genDisplayCardData = (dataType, itemData, readings, displayedReading) => {
    const readingList = readingListHandler(readings, dataType, displayedReading)
    return ({
        id: itemData.id,
        uid: itemData.uid,
        firstReadingIndex: firstReading(readingList),
        timeModified: itemData.timeModified,
        status: itemData.status ?? 'none',
        name: itemData.name,
        subtitle: subtitleHandlerItem(dataType, itemData.type),
        mainIcon: iconHandlerItem(dataType, itemData.type),
        dataList: dataListHandler(dataType, itemData),
        readingList: readingList,
    })
}

const typeSpecificDataHandler = (dataType, itemData) => {
    switch (dataType) {
        case 'RECTIFIER':
            const setting = getTapSettings(itemData.tapSetting, itemData.tapCoarse, itemData.tapFine, itemData.tapValue)
            return setting !== null ? [{ type: 'options-outline', value: getTapSettings(itemData.tapSetting, itemData.tapCoarse, itemData.tapFine, itemData.tapValue) }] : []
        case 'PIPELINE':
            return pipeMaterials[itemData.material] ? [{ type: 'cube-outline', value: pipeMaterials[itemData.material] }] : []
        case 'TEST_POINT':
            return itemData.location !== null ? [{ type: 'map-outline', value: itemData.location }] : []
        default:
            return []
    }
}

const dataListHandler = (dataType, itemData) => {
    return [{ type: 'timeModified', value: getFormattedDate(itemData.timeModified) }, ...typeSpecificDataHandler(dataType, itemData)]
}

const readingListHandler = (readings, dataType, displayedReading) => {
    if (readings.length === 0)
        return 'none'
    else {
        const single = readings[0]?.v2 === undefined
        const unit = displayedReadingsValues[dataType][displayedReading].unit
        return readings.map(reading => ({
            uid: reading.uid,
            name: reading.name,
            iconName: reading.type,
            readings: (reading.v1 === null && single) || (reading.v1 === null && reading?.v2 === null) ? 'none' : single ? [displayReadingValue(reading.v1, unit), null] : [displayReadingValue(reading.v1, unit), displayReadingValue(reading.v2, unit)]
        }))
    }
}

const fetchReadings = async (id, dataType, displayedReading, filters) => {
    switch (dataType) {
        case 'TEST_POINT':
            switch (displayedReading) {
                case 0:
                    return await sendRequest('SELECT', 'CARD_LIST_WITH_POTENTIALS', { testPointId: id, filters: filters, leftPermType: 'PERM_ON', rightPermType: 'PERM_OFF' })
                case 1:
                    return await sendRequest('SELECT', 'CARD_LIST_WITH_POTENTIALS', { testPointId: id, filters: filters, leftPermType: 'PERM_OFF', rightPermType: 'PERM_NATIVE' })
                case 2:
                    return await sendRequest('SELECT', 'CARD_LIST_WITH_CURRENT', { testPointId: id, filters: filters })
                case 3:
                    return await sendRequest('SELECT', 'CARD_LIST_WITH_DENSITY', { testPointId: id, filters: filters })
                case 4:
                    return await sendRequest('SELECT', 'CARD_LIST_WITH_IK_CURRENT', { testPointId: id, filters: filters })
            }
        case 'RECTIFIER':
            switch (displayedReading) {
                case 0:
                    return await sendRequest('SELECT', 'CIRCUIT_LIST_WITH_CURRENT', { rectifierId: id })
                case 1:
                    return await sendRequest('SELECT', 'CIRCUIT_LIST_WITH_VOLTAGE', { rectifierId: id })
                case 2:
                    return await sendRequest('SELECT', 'CIRCUIT_LIST_WITH_TARGET', { rectifierId: id })
            }
        default: return {
            status: 200,
            result: [],
        }
    }
}

export const fetchData = async (dataType, idList, filters, displayedReading) => {
    const data = await Promise.all(idList.map(async id => await Promise.all([
        await sendRequest('SELECT', `${dataType}_ITEM_DATA`, { id: id }),
        await fetchReadings(id, dataType, displayedReading, filters)
    ])))
    return data.map((item, index) => {
        if (item.every(i => i.status === 200))
            try {
                return genDisplayCardData(dataType, item[0].result, item[1].result, displayedReading)
            }
            catch (er) {
                genErrorDisplayCard(idList[index])
            }
        else return genErrorDisplayCard(idList[index])
    })
}

export const fetchIdList = async (dataType, filters = undefined, sorting = undefined, latitude = undefined, longitude = undefined) => {
    // fetches Id's off all items from the list
    const list = await sendRequest('SELECT', `${dataType}_LIST`, { filters: filters, sorting: sorting, latitude: latitude, longitude: longitude })
    if (list.status === 200)
        return list.result
    else {
        errorHandler(613)
        return []
    }
}

export const getLocationAsync = async () => {

    const loc = await requestLocationAsync()
    if (loc.status === 200)
        return loc.location.coords
    else {
        errorHandler(loc.status)
        return { latitude: 0, longitude: 0 }
    }
}

export const displayedReadingsValues = {
    TEST_POINT: [
        {
            title: 'Potentials: ON/OFF',
            icon: ['On', 'Off'],
            pack: 'cp',
            unit: 'V'
        },
        {
            title: 'Potentials: OFF/Native',
            icon: ['Off', 'Depol'],
            pack: 'cp',
            unit: 'V'
        },
        {
            title: 'Current: Shunts and bonds',
            icon: 'flash-outline',
            pack: null,
            unit: 'A'
        },
        {
            title: 'Current density: Coupons',
            icon: 'keypad-outline',
            pack: null,
            unit: 'A/m2',
            unitSuperscript: '2'
        },
        {
            title: 'Shorting current: Isolation',
            icon: 'flash-outline',
            pack: null,
            unit: 'A'
        }
    ],
    RECTIFIER: [
        {
            title: 'Current',
            icon: 'flash-outline',
            pack: null,
            unit: 'A'
        },
        {
            title: 'Voltage',
            icon: 'voltage',
            pack: 'cp',
            unit: 'V'
        },
        {
            title: 'Current target',
            icon: 'trending-up-outline',
            pack: null,
            unit: ''
        }
    ]
}