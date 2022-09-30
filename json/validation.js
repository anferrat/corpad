import { testPointReadings } from "../constants/constants"
import validation from "../components/fieldValidation"
import { tables, fields } from "./base"

export const validateSurvey = (surveyObject) => {
    // validates survey using 4 parameters. if general survey file format is preserved (isSurveyObject) returns status 200 with corrupted flag set to true, in order to attempt to recover after
    try {
        if (isSurveyObject(surveyObject)) {
            // fieldRowFormat - checks types and number of values in each table row for every table
            const fieldRowFormat = tables.every(table => validateTable(table, surveyObject.data[table]))
            // fieldValidation - checks if each value passes a general validation function based on type of field (property)
            const fieldValidation = tables.every((table, tableIndex) => surveyObject.data[table].every((row) => row?.every((value, valueIndex) => validateTableField(value, valueIndex, tableIndex))))
            // referenceCellCheck - each survey must have at least one reference cell
            const referenceCellCheck = surveyObject.data.referenceCells.length >= 1
            // potentialTypesCheck - each survey must have at least two of standard potential types
            const potentialTypesCheck = surveyObject.data.potentialTypes.length >= 2
            return {
                corrupted: !(fieldRowFormat && fieldValidation && referenceCellCheck && potentialTypesCheck),
                status: 200,
                result: {
                    version: surveyObject.version,
                    type: surveyObject.type,
                    validation: {
                        fieldRowFormatPassed: fieldRowFormat,
                        fieldValidationPassed: fieldValidation,
                        referenceCellPassed: referenceCellCheck,
                        potentialTypesPassed: potentialTypesCheck
                    }
                }
            }
        }
        else return { status: 412 }
    }
    catch (er) {
        return { status: 412 }
    }
}

export const recoverSurvey = (surveyObject, validation) => {

    const updateTable = (tableIndex, data) => {
        switch (tableIndex) {
            case 6:
                return data.filter(row => isCard(row))
            case 7:
                return data.filter(row => isPotential(row))
            case 1:
                return data.filter(row => isTestPoint(row))
            case 2:
                return data.filter(row => isRectifier(row))
            case 3:
                return data.filter(row => isPipeline(row))
            case 9:
                return data.filter(row => isSide(row))
            case 8:
                return data.filter(row => isCircuit(row))
            case 5:
                return data.filter(row => isReferenceCell(row))
            case 0:
                return data.filter(row => isSurveyTableRow(row))
            case 4:
                return data.filter(row => isPotentialType(row))
            default:
                return null
        }
    }
    const convertToSurveyObject = (tableData) => (Object.assign(...tables.map((table, i) => ({ [table]: tableData[i] }))))
    const rowCorrection = (surveyObject) => ({ ...surveyObject, data: convertToSurveyObject(tables.map((table, tableIndex) => updateTable(tableIndex, surveyObject.data[table]))) })
    const fieldCorrection = (surveyObject) => ({ ...surveyObject, data: convertToSurveyObject(tables.map((table, tableIndex) => surveyObject.data[table].filter(row => row.every((value, fieldIndex) => validateTableField(value, fieldIndex, tableIndex))))) })
    const refCellCorrection = (surveyObject) => ({ ...surveyObject, data: { ...surveyObject.data, referenceCells: [[1, "7affda84-58db-de22-0225-c2ca19cc223d", 0, "RC1", 1]] } })
    const potentialTypeCorrection = (surveyObject) => ({ ...surveyObject, data: { ...surveyObject.data, potentialTypes: [[1, "079acf2a-1fc5-8b9a-2e1a-90dc191f2346", "On", 0, "PERM_ON"], [2, "cde46a48-4d64-c177-6c8e-83c6cb6ced49", "Off", 0, "PERM_OFF"], [3, "95677c6c-31d5-7856-de00-4dc9d1f36fa4", "Native", 0, "PERM_NATIVE"], [4, "d90d73d2-2144-b4ed-33b7-91aa78e83700", "Connected", 0, "PERM_CONNECTED"], [5, "a3c6edd2-90d2-f83f-1951-5f4ee3b6f4fd", "Disconnected", 0, "PERM_DISCONNECTED"]] } })

    const surveyObjectRowCorrected = validation.fieldRowFormatPassed ? surveyObject : rowCorrection(surveyObject)
    const surveyObjectFieldCorrected = validation.fieldValidationPassed ? surveyObjectRowCorrected : fieldCorrection(surveyObjectRowCorrected)
    const surveyObjectRefCellCorrected = validation.referenceCellPassed ? surveyObjectFieldCorrected : refCellCorrection(surveyObjectFieldCorrected)
    const surveyObjectPotentialTypesCorrected = validation.potentialTypesCheck ? surveyObjectRefCellCorrected : potentialTypeCorrection(surveyObjectRefCellCorrected)

    const surveyValidation = validateSurvey(surveyObjectPotentialTypesCorrected)

    if (surveyValidation.status === 200 && !surveyValidation.corrupted)
        return {
            status: 200,
            result: surveyObjectPotentialTypesCorrected
        }
    else
        return { status: 412 }
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


const isSurveyObject = (surveyObject) => {
    if (surveyObject)
        if (surveyObject.hasOwnProperty('version') &&
            surveyObject.hasOwnProperty('type') &&
            surveyObject.hasOwnProperty('data'))
            if (isInteger(surveyObject.version))
                if (tables.every(table => surveyObject.data.hasOwnProperty(table)))
                    if (tables.every(table => Array.isArray(surveyObject.data[table])))
                        if (surveyObject.data.survey.length > 0)
                            if (isSurveyTableRow(surveyObject.data.survey[0]))
                                return true
    return false
}


export const validateTable = (table, content) => {
    switch (table) {
        case 'cards':
            return content.every(row => isCard(row))
        case 'potentials':
            return content.every(row => isPotential(row))
        case 'testPoints':
            return content.every(row => isTestPoint(row))
        case 'rectifiers':
            return content.every(row => isRectifier(row))
        case 'pipelines':
            return content.every(row => isPipeline(row))
        case 'sides':
            return content.every(row => isSide(row))
        case 'circuits':
            return content.every(row => isCircuit(row))
        case 'referenceCells':
            return content.every(row => isReferenceCell(row))
        case 'survey':
            return isSurveyTableRow(content[0])
        case 'potentialTypes':
            return content.every(row => isPotentialType(row))
        default:
            return null
    }
}

export const validateTableField = (value, fieldIndex, tableIndex) => {
    // checks if passed value can be used as field value with passed table and field indexes
    const property = fields[tableIndex][fieldIndex] === 'name' ? 'name_not_empty' : fields[tableIndex][fieldIndex]
    return validation(value, property).valid
}


const isSurveyTableRow = (array) => {
    if (array)
        if (Array.isArray(array))
            if (array.length >= 3)
                if (isString(array[0]) &&
                    isString(array[1]) &&
                    validateTableField(array[1], 1, 0) &&
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