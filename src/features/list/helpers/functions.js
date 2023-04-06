import { pipeMaterials, labels, tapOptions } from '../../../constants/constants'
import { getFormattedDate } from '../../../helpers/functions'
import { errorHandler } from "../../../helpers/functions"
import { requestLocationAsync } from "../../../native_libs/location"
import { getItemDisplayData, getItemIdList } from '../../../app/controllers/survey/items/ItemController'

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
    if (tapSetting === 0 && tapOptions[tapCoarse] !== undefined && tapOptions[tapFine] !== undefined)
        return `C${tapOptions[tapCoarse]} - F${tapOptions[tapFine]}`
    else if (tapSetting === 1 && tapValue !== null)
        return tapValue + ' %'
    else if (tapSetting === 2)
        return 'Automatic'
    else return null
}

const itemDataHandler = (type, value) => {
    switch (Number(type)) {
        case 0:
            return getFormattedDate(value)
        case 1:
            return pipeMaterials[value] ?? null
        case 2:
            return value
        case 3:
            return getTapSettings(value.setting, value.coarse, value.fine, value.value)
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
    const { status, response, errorMessage } = await getItemDisplayData({ itemType, displayedReading, idList, readingTypeFilter: filters?.readingTypeFilter })
    if (status === 200)
        return response.map((displayData, index) => {
            try {
                const { dataList, id, itemType, markerType, name, readingList, status, timeModified, uid } = displayData
                return ({
                    id: id,
                    uid: uid,
                    name: name,
                    itemType: itemType,
                    status: status,
                    timeModified: timeModified,
                    firstReadingIndex: firstReading(readingList),
                    dataList: dataListHandler(dataList),
                    icon: markerType,
                    subtitle: itemType === 'TEST_POINT' ? labels[markerType].label : labels[itemType].label,
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
    const loc = await requestLocationAsync()
    if (loc.status === 200)
        return loc.location.coords
    else {
        errorHandler(loc.status)
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
    }
}

export const displayedReadingsValues = {
    TEST_POINT: [
        {
            title: 'Potentials: ON/OFF',
            icons: [{ icon: 'On', pack: 'cp', unit: 'V' }, { icon: 'Off', pack: 'cp', unit: 'V' }],
            unit: 'V'
        },
        {
            title: 'Potentials: OFF/Native',
            icons: [{ icon: 'Off', pack: 'cp', unit: 'V' }, { icon: 'Depol', pack: 'cp', unit: 'V' }],
            unit: 'V'
        },
        {
            title: 'Current: Shunts and bonds',
            icons: [{ icon: 'flash-outline', pack: null, unit: 'A' }],
        },
        {
            title: 'Current density: Coupons',
            icons: [{ icon: 'keypad-outline', pack: null, unit: 'A/m2' }],
        },
        {
            title: 'Shorting current: Isolation',
            icons: [{ icon: 'alert-triangle-outline', pack: null, unit: '' }, { icon: 'flash-outline', pack: null, unit: 'A' }],
        }
    ],
    RECTIFIER: [
        {
            title: 'Current and voltage',
            icons: [{ icon: 'flash-outline', pack: null, unit: 'A' }, { icon: 'voltage', pack: 'cp', unit: 'V' }]
        },
        {
            title: 'Current target',
            icons: [{ icon: 'diagonal-arrow-right-up-outline', pack: null, unit: 'A' }, { icon: 'diagonal-arrow-right-down-outline', pack: null, unit: 'A' }],
        }
    ]
}