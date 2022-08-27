// Functions applied to survey JSON object (e.g. validate if object is a survey, clear values to generate empty survey, generateMetaData)

import { testPointReadings } from "../../constants/constants"
import validation from "../../components/fieldValidation"
import { tables, fields } from "../../database/db"
import idGen from '../../components/IdGen'
import { getName } from "../../components/customFunctions"


//functions that control json file output format and verify json files to be a survey

export const validateSurvey = (file, deep = false) => {
    //deep prop is used when every field of the survey file is needed to be checked
    try {
        //first checking if there are meta wrapper with version and type of the file
        if (isMeta(file))
            //check if data prop is survey - simple check if there are properties of array type 
            if (isSurvey(file.data)) {
                //filter out all values that don't pass checker functions
                const surveyTempData = tables.map(table => ([table, validateTable(table, file.data[table])])).filter(item => item[1] !== null)
                const deepPassed = deep ? surveyTempData.every((table, tableIndex) => table[1].every((row) => row.every((value, valueIndex) => v(value, valueIndex, tableIndex)))) : true
                const clearedData = Object.fromEntries(surveyTempData)
                //now make sure all survey specific requirements are fulfilled
                /*
                    1. At least one reference cell in survey,
                    2. At least two potential type in survey (default is 5 which can only be edited manually)
                    ... add here for more 
                */
                if (clearedData.referenceCells.length >= 1 && clearedData.potentialTypes.length >= 2) {
                    const allPassed = tables.every(table => clearedData[table].length === file.data[table].length) && (!deep || deep && deepPassed)
                    return {
                        corrupted: !allPassed,
                        status: 200,
                        result: {
                            version: file.version,
                            type: file.type,
                            data: clearedData
                        }
                    }
                }
                else return { status: 412 }
            }
            else return { status: 412 }
    }
    catch (er) {
        return { status: 412 }
    }
}

export const validateDeep = (surveyObject) => {
    try {
        return {
            version: surveyObject.version,
            type: surveyObject.type,
            data: Object.fromEntries(Object.keys(surveyObject.data).map((table) => [table, surveyObject.data[table].filter(row => row.every((value, valueIndex) =>
                v(value, valueIndex, tables.indexOf(table))
            ))]))
        }
    }
    catch (er) {
        return {
            version: surveyObject.version,
            type: surveyObject.type,
            data: []
        }
    }
}

export const surveyZeroing = (surveyObject) => {
    return {
        ...surveyObject,
        data: {
            ...surveyObject.data,
            testPoints: statusReset(surveyObject.data.testPoints, 8),
            cards: itemZeroing(surveyObject.data.cards, [9, 14, 18, 25]),
            potentials: itemZeroing(surveyObject.data.potentials, [3]),
            rectifiers: statusReset(surveyObject.data.rectifiers, 7),
            circuits: itemZeroing(surveyObject.data.circuits, [6, 7, 8]),
        }
    }
}

export const genereateMetaData = (fileName, fileData, timeModified, filePath = null, hash = null, isCloud = false, cloudId = null) => {
    const surveyObject = validateSurvey(fileData)
    if (surveyObject.status === 200) {
        return {
            name: surveyObject.result.data.survey[0][1],
            tpCount: surveyObject.result.data.testPoints.length,
            rectifierCount: surveyObject.result.data.rectifiers.length,
            pipelineCount: surveyObject.result.data.pipelines.length,
            good: surveyObject.result.data.testPoints.filter(tp => tp[8] === 0).length,
            timeModified: timeModified,
            uid: surveyObject.result.data.survey[0][0],
            filePath: filePath,
            hash: hash,
            isCloud: isCloud,
            cloudId: cloudId,
            fileName: fileName,
        }
    }
    else return null
}


function isString(value) {
    return typeof value === 'string' || value instanceof String || value === null
}

function isInteger(value) {
    return Number.isInteger(value) || value === null
}


function isNumber(value) {
    return !isNaN(value) || value === null
}

function isCardType(value) {
    return testPointReadings.indexOf(value) !== -1
}


const isMeta = (object) => {
    if (object)
        if (object.hasOwnProperty('version') &&
            object.hasOwnProperty('type') &&
            object.hasOwnProperty('data'))
            if (isInteger(object.version))
                return true
    return false
}

//resets status field to number 3 (unknown status) for items
const statusReset = (itemList, z) => itemList.map(item => item.map((value, index) => index === z ? 3 : value))

//resets values to null for items of surveyObjects via array of indexes. check db.js to see what indexes correspond to
const itemZeroing = (itemList, z) => itemList.map(item => item.map((value, index) => {
    if (z.indexOf(index) === -1)
        return value
    else return null
}))

export const isSurvey = (survey) => {
    if (survey)
        if (tables.every(table => survey.hasOwnProperty(table)))
            if (tables.every(table => Array.isArray(survey[table])))
                return true
    return false
}


export const validateTable = (table, content) => {
    switch (table) {
        case 'cards':
            return content.filter(row => isCard(row))
        case 'potentials':
            return content.filter(row => isPotential(row))
        case 'testPoints':
            return content.filter(row => isTestPoint(row))
        case 'rectifiers':
            return content.filter(row => isRectifier(row))
        case 'pipelines':
            return content.filter(row => isPipeline(row))
        case 'sides':
            return content.filter(row => isSide(row))
        case 'circuits':
            return content.filter(row => isCircuit(row))
        case 'referenceCells':
            return content.filter(row => isReferenceCell(row))
        case 'survey':
            return isSurveyTable(content[0]) ? content : null
        case 'potentialTypes':
            return content.filter(row => isPotentialType(row))
        default:
            return null
    }
}

const v = (value, fieldIndex, tableIndex) => {
    const property = fields[tableIndex][fieldIndex] === 'name' ? 'name_not_empty' : fields[tableIndex][fieldIndex]
    return validation(value, property).valid
}


const isSurveyTable = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 3)
                if (isString(array[0]) &&
                    isString(array[1]) &&
                    v(array[1], 1, 0) &&
                    isString(array[2]))
                    return true
    return false
}

const isTestPoint = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 11)
                if (isInteger(array[0]) &&
                    isInteger(array[7]) &&
                    isInteger(array[8]) &&
                    isInteger(array[9]) &&
                    isInteger(array[10]) &&
                    isNumber(array[4]) &&
                    isNumber(array[5]) &&
                    isString(array[1]) &&
                    isString(array[2]) &&
                    isString(array[3]) &&
                    isString(array[6]))
                    return true
    return false
}

const isRectifier = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 21)
                if (isInteger(array[0]) &&
                    isString(array[1]) &&
                    isString(array[2]) &&
                    isString(array[3]) &&
                    isNumber(array[4]) &&
                    isNumber(array[5]) &&
                    isString(array[6]) &&
                    isInteger(array[7]) &&
                    isInteger(array[8]) &&
                    isInteger(array[9]) &&
                    isString(array[10]) &&
                    isString(array[11]) &&
                    isInteger(array[12]) &&
                    isNumber(array[13]) &&
                    isNumber(array[14]) &&
                    isInteger(array[15]) &&
                    isNumber(array[16]) &&
                    isInteger(array[17]) &&
                    isInteger(array[18]) &&
                    isNumber(array[19]) &&
                    isNumber(array[20]))
                    return true
    return false
}

const isPipeline = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 11)
                if (isInteger(array[0]) &&
                    isString(array[1]) &&
                    isString(array[2]) &&
                    isInteger(array[3]) &&
                    isInteger(array[4]) &&
                    isInteger(array[5]) &&
                    isString(array[6]) &&
                    isInteger(array[7]) &&
                    isInteger(array[8]) &&
                    isInteger(array[9]) &&
                    isString(array[10]))
                    return true
    return false
}

const isCard = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 26)
                if (isInteger(array[0]) &&
                    isInteger(array[1]) &&
                    isString(array[2]) &&
                    isCardType(array[3]) &&
                    isString(array[4]) &&
                    isInteger(array[5]) &&
                    isInteger(array[6]) &&
                    isInteger(array[7]) &&
                    isInteger(array[8]) &&
                    isNumber(array[9]) &&
                    isString(array[10]) &&
                    isInteger(array[11]) &&
                    isInteger(array[12]) &&
                    isInteger(array[13]) &&
                    isNumber(array[14]) &&
                    isNumber(array[15]) &&
                    isString(array[16]) &&
                    isInteger(array[17]) &&
                    isInteger(array[18]) &&
                    isInteger(array[19]) &&
                    isInteger(array[20]) &&
                    isNumber(array[21]) &&
                    isNumber(array[22]) &&
                    isInteger(array[23]) &&
                    isNumber(array[24]) &&
                    isNumber(array[25]))
                    return true
    return false
}

const isPotential = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 8)
                if (isInteger(array[0]) &&
                    isInteger(array[1]) &&
                    isString(array[2]) &&
                    isNumber(array[3]) &&
                    isInteger(array[4]) &&
                    isString(array[5]) &&
                    isInteger(array[6]) &&
                    isInteger(array[7]))
                    return true
    return false
}

const isCircuit = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 11)
                if (isInteger(array[0]) &&
                    isString(array[1]) &&
                    isString(array[2]) &&
                    isInteger(array[3]) &&
                    isNumber(array[4]) &&
                    isNumber(array[5]) &&
                    isNumber(array[6]) &&
                    isNumber(array[7]) &&
                    isNumber(array[8]) &&
                    isNumber(array[9]) &&
                    isNumber(array[10]))
                    return true
    return false
}

const isReferenceCell = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 5)
                if (isInteger(array[0]) &&
                    isString(array[1]) &&
                    isInteger(array[2]) &&
                    isString(array[3]) &&
                    isInteger(array[4]))
                    return true
    return false
}


const isPotentialType = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 5)
                if (isInteger(array[0]) &&
                    isString(array[1]) &&
                    isString(array[2]) &&
                    isInteger(array[3]) &&
                    isString(array[4]))
                    return true
    return false
}

const isSide = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 4)
                if (isInteger(array[0]) &&
                    isInteger(array[1]) &&
                    isInteger(array[2]) &&
                    isInteger(array[3]))
                    return true
    return false
}

// JS converter encodes test point data object (tpdo) into a CCD string (Corpad Corrosion Data) and decodes it from it. 


const decodeTestPoint = (string) => {
    const initialTestPoint = {
        version: 1,
        type: 'tpdo',
        data: {
            testPoint: fields[1].map(() => null),
            pipelines: [],
            cards: [],
            sides: []
        }
    }

    const readValues = (string, data = []) => {
        if (string === '')
            return data
        else {
            const pointer = string.search('>>')
            if (pointer !== -1)
                return readValues(string.slice(pointer + 2), data.concat([string.substr(0, pointer)]))
            else return readValues('', data.concat([string]))
        }
    }

    const createTableRow = (numberOfElements, dataArray, indexArray, id = 0) => {
        //creates an array with specified number of elements. inserts data inside the new array according to index array
        const resultArray = [id]
        for (i = 1; i < numberOfElements; i++) {
            const indexMatch = indexArray.indexOf(i)
            resultArray.push(indexMatch !== -1 ? dataArray[indexMatch] : null)
        }
        return resultArray
    }

    const getPipelineName = (data, index, defaultName) => {
        if (isNaN(index))
            return defaultName
        else if (data.data.pipelines[index])
            return data.data.pipelines[index][2]
        else return defaultName
    }

    const createSidesRows = (value, isSideA, length, initId) => {

        const readSide = (string, data = []) => {
            if (string === '')
                return data
            else {
                const pointer = string.search(',')
                if (pointer !== -1)
                    return readValues(string.slice(pointer + 1), data.concat([string.substr(0, pointer)]))
                else return readValues('', data.concat([string]))
            }
        }
        const side = readSide(value).filter(s => !isNaN(s) && s < length).map(s => parseInt(s))
        return side.map((s, index) => [initId + index, isSideA ? s : null, !isSideA ? s : null, length])
    }

    const readDataType = (string, testPointData = initialTestPoint) => {
        //reads string from the start and generates tpdo formatted values as result. Outputs object
        if (string === '')
            return testPointData
        else {
            const pointer = string.search('[*]')
            if (pointer !== -1) {
                const data = readValues(string.substr(0, pointer))
                const defaultName = getName(0, data[0])
                switch (data[0]) {
                    case 'TP':
                        if (data.length === 9)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        testPoint: createTableRow(fields[1].length, data.slice(1), [1, 2, 3, 4, 5, 6, 7, 8])
                                    }
                                })
                    case 'PP':
                        if (data.length === 7)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        pipelines: testPointData.data.pipelines.concat(
                                            [createTableRow(fields[3].length, data.slice(1), [2, 3, 4, 5, 6, 9], testPointData.data.pipelines.length)]
                                        )
                                    }
                                })
                    case 'PL':
                        if (data.length === 4) {
                            const pipelineNamePL = getPipelineName(testPointData, data[1], defaultName)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), pipelineNamePL].concat(data), [1, 2, 4, 3, 11, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }

                                }
                            )
                        }
                    case 'AN':
                        if (data.length === 4)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName].concat(data), [1, 2, 4, 3, 5, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'RE':
                        if (data.length === 4)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName].concat(data), [1, 2, 4, 3, 19, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'OT':
                        if (data.length === 4)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen()].concat(data), [1, 2, 3, 4, 6, 7], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'RS':
                        if (data.length === 3) {
                            const pipelineNameRS = getPipelineName(testPointData, data[1], defaultName)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), pipelineNameRS].concat(data), [1, 2, 4, 3, 11, 20], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                        }
                    case 'FC':
                        if (data.length === 2)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen()].concat(data), [1, 2, 3, 4], testPointData.data.cards.length)]
                                        )
                                    }
                                }
                            )
                    case 'SH':
                        if (data.length === 6) {
                            const sidesSH = createSidesRows(data[1], true, testPointData.data.cards.length, testPointData.data.sides.length)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName, data[0], data[3], data[4], data[5]], [1, 2, 4, 3, 22, 21, 24], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesSH).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesSH.length))
                                    }
                                }
                            )
                        }
                    case 'BD':
                        if (data.length === 3) {
                            const sidesBD = createSidesRows(data[1], true, testPointData.data.cards.length, testPointData.data.sides.length)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName, data[0]], [1, 2, 4, 3], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesBD).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesBD.length))
                                    }
                                }
                            )
                        }
                    case 'IK':
                        if (data.length === 5) {
                            const sidesIK = createSidesRows(data[1], true, testPointData.data.cards.length, testPointData.data.sides.length)
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName, data[0], data[3], data[4]], [1, 2, 4, 3, 17, 18], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesIK).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesIK.length))
                                    }
                                }
                            )
                        }
                    case 'CN':
                        if (data.length === 6) {
                            return readDataType(string.slice(pointer + 1),
                                {
                                    ...testPointData,
                                    data: {
                                        ...testPointData.data,
                                        cards: testPointData.data.cards.concat(
                                            [createTableRow(fields[6].length, [0, idGen(), defaultName].concat(data), [1, 2, 4, 3, 13, 15, 6, 7], testPointData.data.cards.length)]
                                        ),
                                        sides: testPointData.data.sides.concat(sidesIK).concat(createSidesRows(data[2], false, testPointData.data.cards.length, testPointData.data.sides.length + sidesIK.length))
                                    }
                                }
                            )
                        }
                    default: return readDataType(string.slice(pointer + 1), testPointData)
                }
            }
            else return testPointData
        }
    }

    if (string.search('[**]') !== -1) {
        return readDataType(string)
    }
    else return {
        status: 508
    }
}

console.log(decodeTestPoint('TP>>729382382-198sj922>>Test point>>MyPlace>>23.232322>>-112.212323>>SomethingHere>>0>>3*PP>>Mypipejdjd>>34>>1>>0>>72625628938>>2*PP>>ksdkdkdkd>>32>>1>>0>>4354353>>2*PL>>1>>8>>6*AN>>2>>6>>6*RE>>1>>7>>1*OT>>nahjana>>3>>3*RS>>0>>6*FC>>hshshshs*SH>>2,3>>0,1>>50>>15>>0.6*BD>>1,2>>2,1*IK>>2,3>>0,1>>3>>0*').data.sides)

/*
example of tpdo
{
    version: 1,
    type: 'tpdo',
    data: {
        testPoint: [],
        cards: [[],[]...
        ],
        pipelines: [
        ],
        sides: []
    },
}
*/