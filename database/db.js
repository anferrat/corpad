import SQLite from 'react-native-sqlite-storage'
import { defaultNames } from '../constants/constants'


//TABLES AND FIELDS ARE USED FOR EXPORTING DATABASE. MAKE SURE TO UPDATE THEM WHEN ADDING MORE FIELDS TO THE TABLE. ORDER MATTERS!
export const tables = ['survey', 'testPoints', 'rectifiers', 'pipelines', 'potentialTypes', 'referenceCells', 'cards', 'potentials', 'circuits', 'sides']
export const fields = [
    ['uid', 'name', 'technician'],
    [`id`, 'uid', 'name', 'location', 'latitude', 'longitude', 'comment', 'testPointType', 'status', 'timeCreated', 'timeModified'],
    ['id', 'uid', 'name', 'location', 'latitude', 'longitude', 'comment', 'status', 'timeCreated', 'timeModified', 'model', 'serialNumber', 'powerSource', 'acVoltage', 'acCurrent', 'tapSetting', 'tapValue', 'tapCoarse', 'tapFine', 'maxVoltage', 'maxCurrent'],
    ['id', 'uid', 'name', 'nps', 'material', 'coating', 'licenseNumber', 'timeCreated', 'timeModified', 'product', 'comment'],
    ['id', 'uid', 'name', 'custom', 'permType'],
    ['id', 'uid', 'rcType', 'name', 'mainReference'],
    ['id', 'testPointId', 'uid', 'type', 'name', 'anodeMaterial', 'wireColor', 'wireGauge', 'fromAtoB', 'current', 'currentUnit', 'pipelineId', 'pipelineCardId', 'couponType', 'density', 'area', 'description', 'isolationType', 'shorted', 'rcType', 'nps', 'ratioCurrent', 'ratioVoltage', 'factorSelected', 'factor', 'voltageDrop'],
    ['id', 'cardId', 'uid', 'value', 'type', 'unit', 'portableReferenceId', 'permanentReferenceId'],
    ['id', 'uid', 'name', 'rectifierId', 'ratioCurrent', 'ratioVoltage', 'voltageDrop', 'current', 'voltage', 'targetMin', 'targetMax'],
    ['id', 'sideAId', 'sideBId', 'parentCardId'],
]

const surveyFileVersion = 1 //current version of JSON file format

const db = SQLite.openDatabase('SURVEY_PIPELINE_CURRENT.db')

db.executeSql('PRAGMA foreign_keys = ON;')


/*
All database interaction is executed through sendRequest(QUERY_TYPE, DATA_TYPE, payload) function.

Params: 
QUERY_TYPE - type of SQL query. Values: 'SELECT', 'INSERT', 'UPDATE'
DATA_TYPE - type of data request is targeted. Values: 'TEST_POINT', 'CARD', 'REFERENCE_CELL', 'POTENTIAL', 'PIPELINE', 'REFERENCE_CELL_LIST', 'PIPELINE_LIST' and so on
payload - array of dataObject send to the query. There will be queries executed for each object of data in the array.
 
One day I'll write a very detailed description for each request... one day
*/

export const parseToFloat = (number) => isNaN(parseFloat(number)) ? null : parseFloat(number)

const convertArrayToInStatement = (array) => array.length === 0 ? '()' : '("' + array.join('", "') + '")'

const convertArrayToColumList = (array) => array.length === 0 ? "()" : ',' + array.join(", ")

const rowToArray = (object, fields) => fields.map(f => object[f] ?? null)


const getTestPointSortingQuery = (sorting, lat, lon) => {
    switch (sorting) {
        //somewhat natsort. couldn't manage to find a better way
        case 0:
            return ' ORDER BY CAST(trim(substr(name, 1, 4)) AS INTEGER), CAST(trim(substr(name, 1, 3)) AS INTEGER), CAST(trim(substr(name, 1, 2)) AS INTEGER), CAST(substr(name, 1, 1) AS INTEGER), substr(name, 1, 1), substr(name, 2, 1), CAST(trim(substr(name, - 4, 4)) AS INTEGER), CAST(trim(substr(name, - 3, 3)) AS INTEGER), CAST(trim(substr(name, - 2, 2)) AS INTEGER), CAST(substr(name, - 1, 1) AS INTEGER)'
        case 1:
            return ' ORDER BY CAST(trim(substr(name, 1, 4)) AS INTEGER) DESC, CAST(trim(substr(name, 1, 3)) AS INTEGER) DESC, CAST(trim(substr(name, 1, 2)) AS INTEGER) DESC, CAST(substr(name, 1, 1) AS INTEGER) DESC, substr(name, 1, 1) DESC, substr(name, 2, 1) DESC, CAST(trim(substr(name, - 4, 4)) AS INTEGER) DESC, CAST(trim(substr(name, - 3, 3)) AS INTEGER) DESC, CAST(trim(substr(name, - 2, 2)) AS INTEGER) DESC, CAST(substr(name, - 1, 1) AS INTEGER) DESC'
        case 2:
            return ' ORDER BY timeModified DESC'
        case 3:
            return ' ORDER BY timeModified ASC'
        case 4:
            return ' ORDER BY IFNULL(((latitude-' + lat + ')*(latitude-' + lat + ')) + ((longitude - ' + lon + ')*(longitude - ' + lon + ')),100000) ASC'
        default: ''
    }
}

const generateQuery = (QUERY_TYPE, DATA_TYPE, data) => {
    switch (QUERY_TYPE) {
        case 'TEST':
            return { query: testQuery, varArray: [] }
        case 'INIT':
            switch (data.table) {
                case 'survey':
                    return { query: 'CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, technician TEXT)', varArray: [] }
                case 'settings':
                    return { query: 'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, pipelineNameAsDefault BOOLEAN, defaultPotentialUnit INTEGER, autoCreatePotentials BOOLEAN, isSurveyNew BOOLEAN, isCloud BOOLEAN, originalHash TEXT, fileName TEXT, cloudId TEXT, lastSync INTEGER, onboarding TEXT)', varArray: [] }
                case 'defaultNames':
                    return { query: 'CREATE TABLE IF NOT EXISTS defaultNames (id INTEGER PRIMARY KEY NOT NULL, type TEXT, name TEXT)', varArray: [] }
                case 'rectifiers':
                    return { query: 'CREATE TABLE IF NOT EXISTS rectifiers (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, status INTEGER, timeCreated INTEGER, timeModified INTEGER, model TEXT, serialNumber TEXT, powerSource INTEGER, acVoltage REAL, acCurrent REAL, tapSetting INTEGER, tapValue REAL, tapCoarse INTEGER, tapFine INTEGER, maxVoltage REAL, maxCurrent REAL);', varArray: [] }
                case 'circuits':
                    return { query: 'CREATE TABLE IF NOT EXISTS circuits (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, rectifierId INTEGER, ratioCurrent REAL, ratioVoltage REAL, voltageDrop REAL, current REAL, voltage REAL, targetMin REAL, targetMax REAL, FOREIGN KEY(rectifierId) REFERENCES rectifiers(id) ON DELETE CASCADE)', varArray: [] }
                case 'testPoints':
                    return { query: 'CREATE TABLE IF NOT EXISTS testPoints (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, testPointType INTEGER, status INTEGER, timeCreated INTEGER, timeModified INTEGER)', varArray: [] }
                // cards - card is a subitem in TestPoint. Has different types and stored in one table, but selected base on the type
                case 'cards':
                    return { query: 'CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY NOT NULL, testPointId INTEGER NOT NULL, uid TEXT, type TEXT, name TEXT, anodeMaterial INTEGER, wireColor INTEGER, wireGauge INTEGER, fromAtoB BOOLEAN, current REAL, currentUnit TEXT, pipelineId INT, pipelineCardId INT, couponType INTEGER, density REAL, area REAL, description TEXT, isolationType INTEGER, shorted BOOLEAN, rcType INTEGER, nps INTEGER, ratioCurrent REAL, ratioVoltage REAL, factorSelected BOOLEAN, factor REAL, voltageDrop REAL, FOREIGN KEY(testPointId) REFERENCES testPoints(id) ON DELETE CASCADE, FOREIGN KEY(pipelineId) REFERENCES pipelines(id) ON DELETE SET NULL, FOREIGN KEY(pipelineCardId) REFERENCES cards(id) ON DELETE SET NULL);', varArray: [] }
                // potentials - some cards can have potentials. (e.g. PL, RS, OT) Need to add more fields before release for future implementation
                case 'potentialTypes':
                    return { query: 'CREATE TABLE IF NOT EXISTS potentialTypes (id INTEGER PRIMARY KEY NOT NULL, uid TEXT NOT NULL, name TEXT NOT NULL, custom BOOLEAN, permType TEXT);', varArray: [] }
                case 'potentials':
                    return { query: 'CREATE TABLE IF NOT EXISTS potentials (id INTEGER PRIMARY KEY NOT NULL, cardId INTEGER NOT NULL, uid TEXT, value REAL, type INTEGER NOT NULL, unit TEXT, portableReferenceId INTEGER, permanentReferenceId INTEGER, FOREIGN KEY(portableReferenceId) REFERENCES referenceCells(id) ON DELETE CASCADE, FOREIGN KEY(type) REFERENCES potentialTypes(id) ON DELETE CASCADE, FOREIGN KEY(cardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(permanentReferenceId) REFERENCES cards(id) ON DELETE CASCADE);', varArray: [] }
                case 'pipelines':
                    return { query: 'CREATE TABLE IF NOT EXISTS pipelines (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, nps INTEGER, material INTEGER, coating BOOLEAN, licenseNumber TEXT, timeCreated INTEGER, timeModified INTEGER, product INTEGER, comment TEXT);', varArray: [] }
                case 'referenceCells':
                    return { query: 'CREATE TABLE IF NOT EXISTS referenceCells (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, rcType INTEGER, name TEXT, mainReference BOOLEAN);', varArray: [] }
                //sides - table for cards, that can be linked to other cards (e.g. BD, SH)
                case 'sides':
                    return { query: 'CREATE TABLE IF NOT EXISTS sides (id INTEGER PRIMARY KEY NOT NULL, sideAId INT, sideBId INT, parentCardId INT, FOREIGN KEY(parentCardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideAId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideBId) REFERENCES cards(id) ON DELETE CASCADE);', varArray: [] }
                default:
                    {
                        return undefined
                    }
            }
        case 'DROP':
            return { query: 'DROP TABLE IF EXISTS ' + data.table, varArray: [] }
        case 'RESET':
            return { query: 'DELETE FROM ' + data.table, varArray: [] }
        case 'SELECT':
            switch (DATA_TYPE) {
                case 'SURVEY':
                    return { query: 'SELECT * FROM survey LIMIT 1' }
                case 'SURVEY_INFO_TEST_POINTS':
                    return { query: "SELECT COUNT(id) AS count, COUNT(CASE WHEN status = 0 THEN 1 END) AS good, COUNT(CASE WHEN status = 1 THEN 1 END) AS warning, COUNT(CASE WHEN status = 2 THEN 1 END) AS danger, COUNT(CASE WHEN status = 3 THEN 1 END) AS unknown FROM testPoints", varArray: [] }
                case 'SURVEY_INFO_RECTIFIERS':
                    return { query: "SELECT COUNT(id) AS count, COUNT(CASE WHEN status = 0 THEN 1 END) AS good, COUNT(CASE WHEN status = 1 THEN 1 END) AS warning, COUNT(CASE WHEN status = 2 THEN 1 END) AS danger, COUNT(CASE WHEN status = 3 THEN 1 END) AS unknown FROM rectifiers", varArray: [] }
                case 'SURVEY_INFO_LAST_MODIFIED':
                    return { query: "SELECT name, COUNT(name) AS count from testPoints ORDER BY timeModified DESC LIMIT 1", varArray: [] }
                case 'SURVEY_INFO_POTENTIALS':
                    return { query: "SELECT COUNT(id) AS count FROM potentials WHERE value IS NOT NULL", varArray: [] }
                case 'MARKERS':
                    return { query: "SELECT id, 'TEST_POINT' AS dataType, uid, status, testPointType, latitude, longitude, name, location, 0 AS active FROM testPoints UNION ALL SELECT id, 'RECTIFIER' AS dataType, uid, status, NULL AS testPointType, latitude, longitude, name, location, 0 AS active FROM rectifiers", varArray: [] }
                case 'MARKER':
                    const isTp = data.dataType === 'TEST_POINT'
                    return { query: `SELECT id, '${data.dataType}' AS dataType, uid, status, ${isTp ? '' : 'NULL AS '}testPointType, latitude, longitude, name, location, 0 AS active FROM ${isTp ? 'testPoints' : 'rectifiers'} WHERE id = ?`, varArray: [data.id] }
                case 'SEARCH':
                    return { query: "SELECT id, uid, name, timeModified, testPointType AS type, 'TEST_POINT' as dataType, length(name) AS nameLength FROM testPoints WHERE name LIKE '%" + data.searchString + "%' UNION ALL SELECT id, uid, name, timeModified, 'RT' AS type, 'RECTIFIER' as dataType, length(name) AS nameLength FROM rectifiers WHERE name LIKE '%" + data.searchString + "%' UNION ALL SELECT id, uid, name, timeModified, 'PL' AS type, 'PIPELINE' as dataType, length(name) AS nameLength FROM pipelines WHERE name LIKE '%" + data.searchString + "%' ORDER BY nameLength ASC LIMIT 20", varArray: [] }
                case 'SEARCH_MARKER':
                    return { query: "SELECT id, 'TEST_POINT' AS dataType, uid, status, testPointType, latitude, longitude, name, location, 0 AS active, length(name) AS nameLength FROM testPoints WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND name LIKE '%" + data.searchString + "%' UNION ALL SELECT id, 'RECTIFIER' AS dataType, uid, status, NULL AS testPointType, latitude, longitude, name, location, 0 AS active, length(name) AS nameLength FROM rectifiers WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND name LIKE '%" + data.searchString + "%' ORDER BY nameLength ASC LIMIT 10", varArray: [] }
                case 'DEFAULT_NAMES':
                    return { query: "SELECT * from defaultNames", varArray: [] }
                case 'DEFAULT_NAME_TYPES':
                    return { query: "SELECT type from defaultNames", varArray: [] }
                case 'POTENTIAL_TYPES':
                    return { query: "SELECT * from potentialTypes", varArray: [] }
                case 'POTENTIAL_TYPE':
                    return { query: "SELECT * from potentialTypes WHERE permType=?", varArray: [data.type] }
                case 'DEFAULT_NAME':
                    return { query: "SELECT name from defaultNames WHERE type=?", varArray: [data.type] }
                case 'SETTINGS':
                    return { query: "SELECT * from settings LIMIT 1", varArray: [] }
                case 'IS_LOADED':
                    return { query: "SELECT COUNT(id) > 0 AS isLoaded FROM settings WHERE (isSurveyNew IS NOT NULL) AND (isCloud IS NOT NULL)", varArray: [] }
                case 'CIRCUITS':
                    return { query: 'SELECT * FROM circuits WHERE rectifierId = ?', varArray: [data.rectifierId] }
                case 'CIRCUIT_LIST':
                    return { query: "SELECT id, name, 'CT' AS type, uid FROM circuits WHERE rectifierId = ?", varArray: [data.rectifierId] }
                case 'CIRCUIT':
                    return { query: 'SELECT * FROM circuits WHERE id = ?', varArray: [data.circuitId] }
                case 'RECTIFIER':
                    return { query: 'SELECT * FROM rectifiers WHERE id = ?', varArray: [data.rectifierId] }
                case 'PIPELINE':
                    return { query: 'SELECT * FROM pipelines WHERE id = ?', varArray: [data.pipelineId] }
                //Case ON_OFF_LIST needs SQL request to be rewritten. Result must match format of DisplayCard readings property. Right now it's processed in UI layer, what increases DisplayCard render time. Learn some SQL dude! 
                //Ha-ha not anymore, its all done in sql now
                case 'ON_OFF_LIST':
                    return { query: "SELECT potentials.value, cards.uid, potentials.unit, potentialTypes.permType AS title, cards.name AS cardName, cards.type as cardType, cards.id as cardId FROM ((potentials INNER JOIN potentialTypes ON potentials.type = potentialTypes.id) INNER JOIN cards ON cards.id = potentials.cardId) WHERE ((potentials.cardId IN ( SELECT id FROM cards WHERE testPointId = ? )) AND potentials.portableReferenceId IN (SELECT id from referenceCells WHERE mainReference = 1 LIMIT 1) AND potentialTypes.permType IS NOT NULL)", varArray: [data.testPointId] }
                case 'PIPELINE_TEST_POINT_COUNT':
                    return { query: "SELECT COUNT(DISTINCT testPointId) AS amount FROM cards WHERE ((type='PL' OR type='RS') AND pipelineId=?)", varArray: [data.pipelineId] }
                case 'CURRENT_LIST':
                    return { query: "SELECT uid, name, current, currentUnit AS unit, type FROM cards WHERE ((testPointId = ?) AND (current IS NOT NULL) AND (type IN ('BD', 'SH')))", varArray: [data.testPointId] }
                case 'TEST_POINT_COUPON_DENSITY':
                    return { query: "SELECT uid, name, density, type FROM cards WHERE ((testPointId = ?) AND (density IS NOT NULL) AND (type IN ('CN')))", varArray: [data.testPointId] }
                case 'TEST_POINT_SHORT_CURRENT':
                    return { query: "SELECT uid, name, current, type, shorted FROM cards WHERE ((testPointId = ?) AND (current IS NOT NULL) AND (shorted = 1) AND (type IN ('IK')))", varArray: [data.testPointId] }
                case 'TEST_POINT_LIST': {
                    if (data.filters) {
                        const statusFilter = data.filters.statusFilter.length > 0 ? "(status NOT IN ('" + data.filters.statusFilter.join("', '") + "'))" : ''
                        const testPointTypeFilter = data.filters.testPointTypeFilter.length > 0 ? (statusFilter !== '' ? ' AND ' : '') + "(testPointType NOT IN ('" + data.filters.testPointTypeFilter.join("', '") + "'))" : ''
                        const hideEmptyFilter = data.filters.hideEmptyTestPoints ? (statusFilter !== '' || testPointTypeFilter !== '' ? ' AND ' : '') + "((SELECT COUNT(cards.id) FROM cards WHERE ((cards.testPointId = testPoints.id) AND cards.type NOT IN ('" + data.filters.readingTypeFilter.join("', '") + "')))<>0)" : ''
                        const filterQuery = data.filters.statusFilter.length > 0 || data.filters.testPointTypeFilter.length > 0 || hideEmptyFilter ? ' WHERE (' + statusFilter + testPointTypeFilter + hideEmptyFilter + ')' : ''
                        const sortingQuery = getTestPointSortingQuery(data.sorting, data.latitude, data.longitude)
                        return { query: 'SELECT id FROM testPoints' + filterQuery + sortingQuery, varArray: [] }
                    }
                    else {
                        return { query: 'SELECT id FROM testPoints', varArray: [] }
                    }
                }
                case 'TEST_POINT_ITEM_DATA':
                    return {
                        query: "SELECT id, uid, name, status, timeModified, location, testPointType AS type FROM testPoints WHERE id=?", varArray: [data.id]
                    }
                case 'RECTIFIER_ITEM_DATA':
                    return {
                        query: "SELECT id, uid, name, status, timeModified, tapFine, tapCoarse, tapValue, tapSetting, 'RT' AS type FROM rectifiers WHERE id=?", varArray: [data.id]
                    }
                case 'PIPELINE_ITEM_DATA':
                    return {
                        query: "SELECT id, uid, name, timeModified, material, 'PP' AS type FROM pipelines WHERE id=?", varArray: [data.id]
                    }
                case 'CARD_LIST_WITH_POTENTIALS':
                    return {
                        query: `SELECT cards.id, cards.uid, cards.name, cards.type, MAX(CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v1, MAX(CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v2 FROM potentials INNER JOIN potentialTypes ON potentials.type = potentialTypes.id INNER JOIN referenceCells ON potentials.portableReferenceId = referenceCells.id LEFT JOIN cards ON potentials.cardId = cards.id WHERE cards.testPointId = ? AND cards.type NOT IN ${convertArrayToInStatement(data.filters.readingTypeFilter)} GROUP BY cards.id UNION ALL SELECT cards.id, cards.uid, cards.name, cards.type, potentials.value AS v1, potentials.value AS v2 FROM cards LEFT JOIN potentials ON potentials.cardId = cards.id WHERE potentials.cardId IS NULL AND cards.testPointId = ? AND cards.type NOT IN ${convertArrayToInStatement(data.filters.readingTypeFilter)}`, varArray: [data.leftPermType, data.rightPermType, data.testPointId, data.testPointId]
                    }
                case 'CARD_LIST_WITH_CURRENT':
                    return {
                        query: `SELECT id, uid, name, type, CASE WHEN type = 'BD' OR type='SH' THEN current END AS v1 from cards WHERE testPointId = ? AND type NOT IN ${convertArrayToInStatement(data.filters.readingTypeFilter)}`, varArray: [data.testPointId]
                    }
                case 'CARD_LIST_WITH_DENSITY':
                    return {
                        query: `SELECT id, uid, name, type, density AS v1 from cards WHERE testPointId = ? AND type NOT IN ${convertArrayToInStatement(data.filters.readingTypeFilter)}`, varArray: [data.testPointId]
                    }
                case 'CARD_LIST_WITH_IK_CURRENT':
                    return {
                        query: `SELECT id, uid, name, type, CASE WHEN type = 'IK' AND shorted = 1 THEN current END AS v1 from cards WHERE testPointId = ? AND type NOT IN ${convertArrayToInStatement(data.filters.readingTypeFilter)}`, varArray: [data.testPointId]
                    }
                case 'CIRCUIT_LIST_WITH_CURRENT':
                    return {
                        query: `SELECT id, uid, name, 'CT' AS type, current AS v1 FROM circuits WHERE rectifierId = ?`, varArray: [data.rectifierId]
                    }
                case 'CIRCUIT_LIST_WITH_VOLTAGE':
                    return {
                        query: `SELECT id, uid, name, 'CT' AS type, voltage AS v1 FROM circuits WHERE rectifierId = ?`, varArray: [data.rectifierId]
                    }
                case 'CIRCUIT_LIST_WITH_TARGET':
                    return {
                        query: `SELECT id, uid, name, 'CT' AS type, CASE WHEN targetMin IS NOT NULL AND targetMax IS NOT NULL THEN (printf('%.1f', targetMin) || ' A - ' || printf('%.1f', targetMax) || ' A') WHEN targetMin IS NOT NULL AND targetMax IS NULL THEN ('Min. ' || printf('%.1f', targetMin) || ' A') WHEN targetMin IS NULL AND targetMax IS NOT NULL THEN ('Max. ' || printf('%.1f', targetMax) || ' A') END AS v1 FROM circuits WHERE rectifierId = ?`, varArray: [data.rectifierId]
                    }
                case 'TEST_POINT':
                    return { query: 'SELECT * FROM testPoints WHERE id = ?', varArray: [data.testPointId] }
                case 'CARD':
                    {
                        switch (data.cardType) {
                            case 'AN':
                                return { query: 'SELECT id, uid, name, type, anodeMaterial, wireColor, wireGauge FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'BD':
                                return { query: 'SELECT id, uid, name, type, fromAtoB, current, currentUnit FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'CN':
                                return { query: 'SELECT id, uid, name, type, pipelineCardId, wireColor, wireGauge, couponType, current, currentUnit, density, area FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'FC':
                                return { query: 'SELECT id, uid, name, type, description FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'IK':
                                return { query: 'SELECT id, uid, name, type, fromAtoB, isolationType, shorted, current, currentUnit FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'OT':
                                return { query: 'SELECT id, uid, name, type, wireColor, wireGauge FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'PL':
                                return { query: 'SELECT id, uid, name, type, pipelineId, wireColor, wireGauge FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'RE':
                                return { query: 'SELECT id, uid, name, type, rcType, wireColor, wireGauge FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'RS':
                                return { query: 'SELECT id, uid, name, type, nps, pipelineId, current, currentUnit FROM cards WHERE id = ?', varArray: [data.cardId] }
                            case 'SH':
                                return { query: 'SELECT id, uid, name, type, fromAtoB, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, current FROM cards WHERE id = ?', varArray: [data.cardId] }
                            default:
                                {
                                    return undefined
                                }
                        }
                    }
                case 'POTENTIALS':
                    return { query: 'SELECT potentials.id, potentials.uid, potentials.value, potentials.type, potentials.unit, potentials.portableReferenceId, potentials.permanentReferenceId, potentialTypes.name FROM potentials LEFT JOIN potentialTypes ON potentials.type = potentialTypes.id WHERE potentials.cardId = ?', varArray: [data.cardId] }
                case 'CARDS':
                    return { query: 'SELECT * FROM cards WHERE testPointId = ?', varArray: [data.testPointId] }
                case 'CARD_LIST':
                    if (!data.filters || data?.filters?.readingTypeFilter?.length === 0)
                        return { query: 'SELECT id, uid, name, type FROM cards WHERE testPointId = ?', varArray: [data.testPointId] }
                    else {
                        return { query: "SELECT id, uid, name, type FROM cards WHERE (testPointId = ? AND type NOT IN ('" + data.filters.readingTypeFilter.join("', '") + "'))", varArray: [data.testPointId] }
                    }
                case 'REFERENCE_CELL_LIST':
                    if (data?.testPointId !== undefined)
                        return { query: "SELECT 1 AS isPortable, id, uid, rcType, name from referenceCells UNION ALL SELECT 0, id, uid, rcType, name FROM cards WHERE testPointId = ? AND type = 'RE'", varArray: [data.testPointId] }
                    else
                        return { query: "SELECT * from referenceCells", varArray: [] }
                case 'PIPELINE_LIST':
                    return { query: 'SELECT id FROM pipelines', varArray: [] }
                case 'PIPELINE_LIST_DATA':
                    return { query: 'SELECT id, uid, name FROM pipelines', varArray: [] }
                case 'RECTIFIER_LIST':
                    return { query: 'SELECT id FROM rectifiers', varArray: [] }
                case 'SIDES':
                    return { query: 'SELECT * FROM sides WHERE parentCardId = ?', varArray: [data.cardId] }
                default:
                    {
                        return undefined
                    }
            }
        case 'INSERT':
            switch (DATA_TYPE) {
                case 'SURVEY':
                    return { query: 'INSERT INTO survey (uid, name, technician) VALUES (?,?,?)', varArray: [data.uid, data.name, data.technician] }
                case 'SETTINGS':
                    return { query: "INSERT INTO settings (pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, onboarding) VALUES (?,?,?,?)", varArray: [data.pipelineNameAsDefault, data.defaultPotentialUnit, data.autoCreatePotentials, data.onboarding] }
                case 'DEFAULT_NAME':
                    return { query: "INSERT INTO defaultNames (type, name) VALUES (?,?)", varArray: [data.type, data.name] }
                case 'POTENTIAL_TYPE':
                    return { query: "INSERT INTO potentialTypes (uid, name, custom, permType) VALUES (?,?,?,?)", varArray: [data.uid, data.name, data.custom, data.permType] }
                case 'RECTIFIER':
                    return { query: "INSERT INTO rectifiers (uid, timeCreated, status, name, location, latitude, longitude, comment, timeModified, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) VALUES (?,?,3,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", varArray: [data.uid, data.timeCreated, data.name, data.location, parseToFloat(data.latitude), parseToFloat(data.longitude), data.comment, data.timeModified, data.model, data.serialNumber, data.powerSource, parseToFloat(data.acVoltage), parseToFloat(data.acCurrent), data.tapSetting, parseToFloat(data.tapValue), data.tapCoarse, data.tapFine, parseToFloat(data.maxVoltage), parseToFloat(data.maxCurrent)] }
                case 'CIRCUIT':
                    return { query: "INSERT INTO circuits (uid, rectifierId) VALUES (?,?)", varArray: [data.uid, data.rectifierId] }
                case 'TEST_POINT':
                    return { query: 'INSERT INTO testPoints (uid, timeCreated, testPointType, status, name, location, latitude, longitude, comment, timeModified) VALUES (?,?,0,3,?,?,?,?,?,?)', varArray: [data.uid, data.timeCreated, data.name, data.location, parseToFloat(data.latitude), parseToFloat(data.longitude), data.comment, data.timeModified] }
                case 'CARD':
                    return { query: 'INSERT INTO cards (uid, testPointId, type) VALUES (?,?,?)', varArray: [data.uid, data.testPointId, data.type] }
                case 'SIDE':
                    if (data.side === 'sideA')
                        return { query: 'INSERT INTO sides (sideAId, parentCardId) VALUES (?,?)', varArray: [data.value, data.cardId] }
                    else
                        return { query: 'INSERT INTO sides (sideBId, parentCardId) VALUES (?,?)', varArray: [data.value, data.cardId] }
                case 'POTENTIAL':
                    if (data.isPortable)
                        return { query: 'INSERT INTO potentials (uid, cardId, unit, portableReferenceId, type) VALUES (?,?,?,?,?)', varArray: [data.uid, data.cardId, data.unit, data.referenceCellId, data.potentialType] }
                    else return { query: 'INSERT INTO potentials (uid, cardId, unit, permanentReferenceId, type) VALUES (?,?,?,?,?)', varArray: [data.uid, data.cardId, data.unit, data.referenceCellId, data.potentialType] }
                case 'POTENTIAL_BY_TYPE': //inserts potential with default refCell
                    return { query: 'INSERT INTO potentials (uid, cardId, type, portableReferenceId, unit) VALUES (?,?,(SELECT id from potentialTypes WHERE permType=? LIMIT 1), (SELECT id from referenceCells WHERE mainReference = 1 LIMIT 1), ?)', varArray: [data.uid, data.cardId, data.permType, data.unit] }
                case 'REFERENCE_CELL':
                    return { query: 'INSERT INTO referenceCells (uid, mainReference, rcType, name) VALUES (?,?,?,?)', varArray: [data.uid, data.mainReference, data?.rcType, data?.name] }
                case 'PIPELINE':
                    return { query: 'INSERT INTO pipelines (uid, timeCreated, name, timeModified, nps, material, coating, licenseNumber, product, comment) VALUES (?,?,?,?,?,?,?,?,?,?)', varArray: [data.uid, data.timeCreated, data?.name, data.timeModified, data.nps, data.material, data.coating, data.licenseNumber, data.product, data.comment] }
                default:
                    {
                        return undefined
                    }
            }
        case 'UPDATE':
            switch (DATA_TYPE) {
                case 'SURVEY':
                    return { query: 'UPDATE survey SET name=?, technician=?', varArray: [data.name, data.technician] }
                case 'SURVEY_UID':
                    return { query: 'UPDATE survey SET uid=?', varArray: [data.uid] }
                case 'SURVEY_SETTINGS':
                    return { query: 'UPDATE settings SET isSurveyNew=?, isCloud=?, originalHash=?, fileName=?, cloudId=?, lastSync=?', varArray: [data.isSurveyNew, data.isCloud, data.originalHash, data.fileName, data.cloudId, data.lastSync] }
                case 'SETTING':
                    return { query: 'UPDATE settings SET ' + data.setting + '=?', varArray: [data.value] }
                case 'DEFAULT_NAME':
                    return { query: 'UPDATE defaultNames SET name=? WHERE type=?', varArray: [data.name, data.type] }
                case 'RECTIFIER':
                    return { query: 'UPDATE rectifiers SET name=?, status=?, latitude=?, longitude=?, location=?, comment=?, timeModified=?, model=?, serialNumber=?, powerSource=?, acCurrent=?, acVoltage=?, tapSetting=?, maxVoltage=?, maxCurrent=?, tapValue=?, tapCoarse=?, tapFine=? WHERE id=?', varArray: [data.rectifierObject.name, data.rectifierObject.status, parseToFloat(data.rectifierObject.latitude), parseToFloat(data.rectifierObject.longitude), data.rectifierObject.location, data.rectifierObject.comment, data.rectifierObject.timeModified, data.rectifierObject.model, data.rectifierObject.serialNumber, data.rectifierObject.powerSource, parseToFloat(data.rectifierObject.acCurrent), parseToFloat(data.rectifierObject.acVoltage), data.rectifierObject.tapSetting, parseToFloat(data.rectifierObject.maxVoltage), parseToFloat(data.rectifierObject.maxCurrent), parseToFloat(data.rectifierObject.tapValue), data.rectifierObject.tapCoarse, data.rectifierObject.tapFine, data.rectifierId] }
                case 'CIRCUIT':
                    return { query: 'UPDATE circuits SET name=?, ratioCurrent=?, ratioVoltage=?, current=?, voltage=?, targetMin=?, targetMax=? WHERE id=?', varArray: [data.circuitObject.name, parseToFloat(data.circuitObject.ratioCurrent), parseToFloat(data.circuitObject.ratioVoltage), parseToFloat(data.circuitObject.current), parseToFloat(data.circuitObject.voltage), parseToFloat(data.circuitObject.targetMin), parseToFloat(data.circuitObject.targetMax), data.circuitId] }
                case 'TEST_POINT':
                    return { query: 'UPDATE testPoints SET name=?, status=?, testPointType=?, latitude=?, longitude=?, location=?, comment=?, timeModified=? WHERE id=?', varArray: [data.testPointObject.name, data.testPointObject.status, data.testPointObject.testPointType, parseToFloat(data.testPointObject.latitude), parseToFloat(data.testPointObject.longitude), data.testPointObject.location, data.testPointObject.comment, data.testPointObject.timeModified, data.testPointId] }
                case 'CARD':
                    switch (data?.cardObject?.type) {
                        case 'AN':
                            return { query: 'UPDATE cards SET name=?, anodeMaterial=?, wireColor=?, wireGauge=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.anodeMaterial, data.cardObject.wireColor, data.cardObject.wireGauge, data.cardId] }
                        case 'BD':
                            return { query: 'UPDATE cards SET name=?, fromAtoB=?, current=?, currentUnit=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.fromAtoB, parseToFloat(data.cardObject.current), data.cardObject.currentUnit, data.cardId] }
                        case 'CN':
                            return { query: 'UPDATE cards SET name=?, pipelineCardId=?, wireColor=?, wireGauge=?, couponType=?, current=?, currentUnit=?, density=?, area=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.pipelineCardId, data.cardObject.wireColor, data.cardObject.wireGauge, data.cardObject.couponType, parseToFloat(data.cardObject.current), data.cardObject.currentUnit, parseToFloat(data.cardObject.density), parseToFloat(data.cardObject.area), data.cardId] }
                        case 'FC':
                            return { query: 'UPDATE cards SET name=?, description=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.description, data.cardId] }
                        case 'IK':
                            return { query: 'UPDATE cards SET name=?, fromAtoB=?, isolationType=?, shorted=?, current=?, currentUnit=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.fromAtoB, data.cardObject.isolationType, data.cardObject.shorted, parseToFloat(data.cardObject.current), data.cardObject.currentUnit, data.cardId] }
                        case 'OT':
                            return { query: 'UPDATE cards SET name=?, wireColor=?, wireGauge=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.wireColor, data.cardObject.wireGauge, data.cardId] }
                        case 'PL':
                            return { query: 'UPDATE cards SET name=?, pipelineId=?, wireColor=?, wireGauge=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.pipelineId, data.cardObject.wireColor, data.cardObject.wireGauge, data.cardId] }
                        case 'RE':
                            return { query: 'UPDATE cards SET name=?, rcType=?, wireColor=?, wireGauge=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.rcType, data.cardObject.wireColor, data.cardObject.wireGauge, data.cardId] }
                        case 'RS':
                            return { query: 'UPDATE cards SET name=?, nps=?, current=?, currentUnit=?, pipelineId=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.nps, parseToFloat(data.cardObject.current), data.cardObject.currentUnit, data.cardObject.pipelineId, data.cardId] }
                        case 'SH':
                            return { query: 'UPDATE cards SET name=?, fromAtoB=?, ratioCurrent=?, ratioVoltage=?, factorSelected=?, factor=?, voltageDrop=?, current=? WHERE id=?', varArray: [data.cardObject.name, data.cardObject.fromAtoB, parseToFloat(data.cardObject.ratioCurrent), parseToFloat(data.cardObject.ratioVoltage), data.cardObject.factorSelected, parseToFloat(data.cardObject.factor), parseToFloat(data.cardObject.voltageDrop), parseToFloat(data.cardObject.current), data.cardId] }
                        default:
                            {
                                return undefined
                            }
                    }
                case 'POTENTIAL':
                    return { query: 'UPDATE potentials SET value=?, unit=? WHERE id=?', varArray: [parseToFloat(data.potentialObject.value), data.potentialObject.unit, data.potentialId] }
                case 'CARD_PROPERTY':
                    return { query: 'UPDATE cards SET ' + data.property + ' =? WHERE id=?', varArray: [data.value, data.cardId] }
                case 'TEST_POINT_PROPERTY': //some dynamic sql
                    return { query: 'UPDATE testPoints SET ' + data.property + ' = ? WHERE id=?', varArray: [data.value, data.testPointId] }
                case 'RECTIFIER_PROPERTY': //some dynamic sql
                    return { query: 'UPDATE rectifiers SET ' + data.property + ' = ? WHERE id=?', varArray: [data.value, data.rectifierId] } //be careful as value must has the correct type!
                case 'CIRCUIT_PROPERTY': //some dynamic sql
                    return { query: 'UPDATE circuits SET ' + data.property + ' = ? WHERE id=?', varArray: [data.value, data.circuitId] }
                case 'REFERENCE_CELL':
                    return { query: 'UPDATE referenceCells SET rcType=?, name=?, mainReference=? WHERE id=?', varArray: [data.referenceCellObject.rcType, data.referenceCellObject.name, data.referenceCellObject.mainReference, data.referenceCellId] }
                case 'PIPELINE':
                    return { query: 'UPDATE pipelines SET name=?, nps=?, material=?, coating=?, licenseNumber=?, timeModified=?, product=?, comment=? WHERE id=?', varArray: [data.pipelineObject.name, data.pipelineObject.nps, data.pipelineObject.material, data.pipelineObject.coating, data.pipelineObject.licenseNumber, data.pipelineObject.timeModified, data.pipelineObject.product, data.pipelineObject.comment, data.pipelineId] }

                default:
                    {
                        return undefined
                    }
            }
        case 'DELETE':
            switch (DATA_TYPE) {
                case 'SURVEY':
                    return { query: 'DELETE FROM surveys WHERE id=1', varArray: [] }
                case 'EMPTY':
                    return { query: 'DELETE FROM testPoints WHERE name IS NULL; DELETE FROM rectifiers WHERE name IS NULL; DELETE FROM pipelines WHERE name IS NULL; DELETE FROM potentials WHERE name IS NULL; DELETE FROM cards WHERE name IS NULL; DELETE FROM circuits WHERE name IS NULL;', varArray: [] }
                case 'RECTIFIER':
                    return { query: 'DELETE FROM rectifiers WHERE id=?', varArray: [data.rectifierId] }
                case 'POTENTIAL_TYPE':
                    return { query: 'DELETE FROM potentialTypes WHERE id=?', varArray: [data.potentialFieldId] }
                case 'CIRCUIT':
                    return { query: 'DELETE FROM circuits WHERE id=?', varArray: [data.circuitId] }
                case 'REC_STATE':
                    return { query: 'DELETE FROM recStates WHERE id=?', varArray: [data.recStateId] }
                case 'POTENTIAL':
                    return { query: 'DELETE FROM potentials WHERE id=?', varArray: [data.potentialId] }
                case 'CARD':
                    return { query: 'DELETE FROM cards WHERE id=?', varArray: [data.cardId] }
                case 'SIDES':
                    return { query: 'DELETE FROM sides WHERE parentCardId=?', varArray: [data.cardId] }
                case 'TEST_POINT':
                    return { query: 'DELETE FROM testPoints WHERE id=?', varArray: [data.testPointId] }
                case 'PIPELINE':
                    return { query: 'DELETE FROM pipelines WHERE id=?', varArray: [data.pipelineId] }
                case 'REFERENCE_CELL':
                    return { query: 'DELETE FROM referenceCells WHERE id=?', varArray: [data.referenceCellId] }
                default: return undefined
            }
        case 'EXPORT':
            const table = data.dataType === 'TEST_POINT' ? 'testPoints' : (data.dataType === 'RECTIFIER' ? 'rectifiers' : 'pipelines')
            switch (DATA_TYPE) {
                case 'POTENTIALS_PIPELINE':
                    return { query: "SELECT value from potentials INNER JOIN cards ON potentials.cardId = cards.id WHERE (cards.type IN " + convertArrayToInStatement(data.readingTypes) + " AND potentials.type=? AND " + (data.pipelineId === null ? "cards.pipelineId IS NULL" : "cards.pipelineId=" + data.pipelineId) + " AND cards.testPointId = ? AND potentials.portableReferenceId = ?)", varArray: [data.potentialTypeId, data.testPointId, data.referenceCellId] }
                case 'POTENTIALS':
                    return { query: "SELECT value, cardId from potentials LEFT JOIN cards ON potentials.cardId = cards.id WHERE (cards.type = ? AND potentials.type=? AND cards.pipelineId IS NULL AND cards.testPointId = ? AND potentials.portableReferenceId = ? AND potentials.value IS NOT NULL)", varArray: [data.cardType, data.potentialTypeId, data.testPointId, data.referenceCellId] }
                case 'POTENTIALS_CARD_LIST':
                    return { query: "SELECT DISTINCT cards.id from potentials INNER JOIN cards on potentials.cardId = cards.id WHERE (cards.type =? AND potentials.type IN " + convertArrayToInStatement(data.potentialTypes) + " AND potentials.value IS NOT NULL AND cards.pipelineId IS NULL AND cards.testPointId = ? AND potentials.portableReferenceId=?)", varArray: [data.cardType, data.testPointId, data.referenceCellId] }
                case 'ITEM_PROPERTIES':
                    return { query: `SELECT id, ${data.properties.join(', ')} from ${table} WHERE id=?`, varArray: [data.id] }
                case 'ITEM_LIST':
                    return { query: `SELECT id from ${table}` + getTestPointSortingQuery(data.sorting), varArray: [] }
                case 'SUBITEM_PROPERTIES':
                    switch (data.cardType) {
                        case 'CT':
                            switch (data?.property) {
                                case 'CURRENT':
                                    return { query: "SELECT id, current AS value from circuits WHERE (rectifierId=? AND current IS NOT NULL) ORDER BY id", varArray: [data.itemId] }
                                case 'VOLTAGE':
                                    return { query: "SELECT id, voltage AS value from circuits WHERE (rectifierId=? AND voltage IS NOT NULL) ORDER BY id", varArray: [data.itemId] }
                                case 'TARGET':
                                    return { query: "SELECT id,  CASE WHEN targetMin IS NOT NULL AND targetMax IS NOT NULL THEN (printf('%.1f', targetMin) || ' A - ' || printf('%.1f', targetMax) || ' A') WHEN targetMin IS NOT NULL AND targetMax IS NULL THEN ('Min. ' || printf('%.1f', targetMin) || ' A') WHEN targetMin IS NULL AND targetMax IS NOT NULL THEN ('Max. ' || printf('%.1f', targetMax) || ' A') END AS value from circuits WHERE (rectifierId=? AND (targetMin IS NOT NULL OR targetMax IS NOT NULL)) ORDER BY id", varArray: [data.itemId] }
                                default:
                                    return undefined
                            }
                        default:
                            switch (data?.property) {
                                case 'CURRENT':
                                    return { query: "SELECT id, current AS value from cards WHERE (testPointId=? AND type=? AND current IS NOT NULL) ORDER BY id", varArray: [data.itemId, data.cardType] }
                                case 'AREA':
                                    return { query: "SELECT id, area AS value from cards WHERE testPointId=? AND type=? AND area IS NOT NULL ORDER BY id", varArray: [data.itemId, data.cardType] }
                                case 'DENSITY':
                                    return { query: "SELECT id, density AS value from cards WHERE testPointId=? AND type=? AND density IS NOT NULL ORDER BY id", varArray: [data.itemId, data.cardType] }
                                case 'RATIO':
                                    return { query: "SELECT id, ratioVoltage || ' mV - ' || ratioCurrent || ' A' AS value from cards WHERE testPointId=? AND type=? AND ratioVoltage IS NOT NULL AND ratioCurrent IS NOT NULL ORDER BY id", varArray: [data.itemId, data.cardType] }
                                case 'FACTOR':
                                    return { query: "SELECT id, factor AS value from cards WHERE testPointId=? AND type=? AND factor IS NOT NULL ORDER BY id", varArray: [data.itemId, data.cardType] }
                                case 'VOLTAGE_DROP':
                                    return { query: "SELECT id, voltageDrop AS value from cards WHERE testPointId=? AND type=? AND voltageDrop IS NOT NULL ORDER BY id", varArray: [data.itemId, data.cardType] }
                                case 'SHORTED':
                                    return { query: "SELECT id, shorted AS value from cards WHERE testPointId=? AND type=? ORDER BY id", varArray: [data.itemId, data.cardType] }
                                default:
                                    return undefined
                            }
                    }
                case 'TABLE':
                    return { query: `SELECT * from ${data.table}`, varArray: [] }
                default:
                    return undefined
            }
        default: {
            return undefined
        }

    }
}

const runQuery = async (transaction, query, params) => {
    return await new Promise((resolve, reject) => {
        transaction.executeSql(query,
            params,
            (_, result) => resolve(result),
            (_, err) => {
                reject(err)
            }
        )
    })
}

const handleItemResult = (res) => {
    const keys = Object.keys(res)
    if (keys.length === 1)
        return res[keys[0]]
    return res
}

const resultAsArray = (index, item, array = []) => {
    if (index > 0)
        return resultAsArray(index - 1, item, [handleItemResult(item(index - 1))].concat(array))
    else return array
}



const runTransaction = async (query, db, multiple) => await new Promise((resolve, reject) => {
    let result = multiple ? [] : null
    db.transaction((tx) => {
        if (multiple)
            query.forEach(async q => {
                const r = await runQuery(tx, q.query, q.varArray)
                result.push(r)
            })
        else result = runQuery(tx, query.query, query.varArray)
    },
        er => {
            reject(er)
        },
        () => resolve(result)
    )
})

const generateResult = (result, DATA_TYPE, singleObject) => {
    switch (DATA_TYPE) {
        case 'INSERT':
            return result.insertId
        case 'SELECT':
        case 'TEST':
        case 'EXPORT':
            if (!singleObject)
                return resultAsArray(result.rows.length, result.rows.item)
            else return handleItemResult(result.rows.item(0))
        case 'UPDATE':
            return result.rowsAffected
        default: return singleObject ? null : []
    }
}

// SINGLE_OBJECT_TYPES - some requests need to return a single object instead of an array. Add them to this array in that case
const SINGLE_OBJECT_TYPES = [
    'CARD',
    'TEST_POINT',
    'PIPELINE',
    'RECTIFIER',
    'CIRCUIT',
    'PIPELINE_TEST_POINT_COUNT',
    'MARKER',
    'SETTINGS',
    'SURVEY',
    'IS_LOADED',
    'DEFAULT_NAME',
    'TEST_POINT_ITEM_DATA',
    'RECTIFIER_ITEM_DATA',
    'PIPELINE_ITEM_DATA',
    'ITEM_PROPERTIES',
    'SURVEY_INFO_TEST_POINTS',
    'SURVEY_INFO_RECTIFIERS',
    'SURVEY_INFO_LAST_MODIFIED',
]

const getResult = (multiple, result, QUERY_TYPE, singleObject) => {
    if (multiple)
        return result.map(r => generateResult(r, QUERY_TYPE, singleObject))
    else return generateResult(result, QUERY_TYPE, singleObject)
}

export const sendRequest = async (QUERY_TYPE, DATA_TYPE, payload = {}) => {
    const multiple = Array.isArray(payload)
    const query = multiple ? payload.map(p => generateQuery(QUERY_TYPE, DATA_TYPE, p)).filter(p => p) : generateQuery(QUERY_TYPE, DATA_TYPE, payload)
    //console.log(query)
    if ((query?.length === 0 && multiple) || (!query && !multiple))
        return {
            status: 600,
            result: multiple ? [] : {}
        }
    else {
        try {
            const result = await runTransaction(query, db, multiple)
            const singleObject = SINGLE_OBJECT_TYPES.indexOf(DATA_TYPE) !== -1
            return {
                status: 200,
                result: getResult(multiple, result, QUERY_TYPE, singleObject)
            }
        }
        catch (er) {
            return {
                status: 600
            }
        }

    }
}

export const importJSON = async (content) => {
    // fast import - should work in 99% of cases
    const versionMatch = content?.version <= surveyFileVersion
    if (versionMatch)
        try {
            return await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tables.map((table, i) => {
                        const importData = `INSERT INTO ${table} (${fields[i].join()}) VALUES (${fields[i].map(() => '?').join()})`
                        content?.data[table]?.map(row => tx.executeSql(importData, row))
                    })
                },
                    (er) => {
                        reject(er)
                    },
                    () => resolve({
                        status: 200,
                    })
                )

            })
        }
        catch (er) {
            return {
                status: 628,
            }
        }
    else return { status: 630 }
}

export const importWIthForceJSON = async (content) => {
    // slower version of import JSON that ignores invalid values used as backup when unable to use faster import
    const signleQueryTransaction = async (query, params) => (
        await new Promise((resolve, reject) => {
            db.transaction((tx) => tx.executeSql(
                query,
                params,
                (_, result) => resolve(result),
                (_, err) => resolve(null)))
        }))


    const versionMatch = content?.version > surveyFileVersion
    try {
        let count = {}
        // using sequential async functions in order to prevent data referenceing data that had not yet been inserted. table order matters!
        for (i = 0; i < tables.length; i++) {
            Object.assign(count, { [tables[i]]: 0 })
            const q = `INSERT INTO ${tables[i]} (${fields[i].join()}) VALUES (${fields[i].map(() => '?').join()})`
            if (tables[i] === 'cards') {
                // some cards rows referencing another rows from cards table. (e.g. CN card). therefore must be in sequence
                content.data.cards?.sort((a, b) => a[3]?.charCodeAt(0) - b[3]?.charCodeAt(0)) // for CN and PL types. PL must be first
                for (j = 0; j < content?.data.cards.length; j++) {
                    const res = await signleQueryTransaction(q, content?.data.cards[j])
                    if (res !== null) {
                        count[tables[i]]++
                    }
                }
            }
            else await Promise.all(content?.data[tables[i]]?.map(async row => {
                const res2 = await signleQueryTransaction(q, row)
                if (res2 !== null)
                    count[tables[i]]++
            }))
        }
        return {
            status: 200,
            versionMatch: versionMatch,
            count: count
        }
    }
    catch (er) {
        return {
            status: 412,
            versionMatch: versionMatch,
        }
    }
}


export const resetSurvey = async () => {
    try {
        return await new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('UPDATE settings SET isCloud=NULL, isSurveyNew=NULL, originalHash=NULL, fileName=NULL, cloudId=NULL, lastSync=NULL')
                tables.map(table => {
                    const resetTables = `DELETE FROM ${table}`
                    tx.executeSql(resetTables)
                })
            },
                (er) => {
                    reject(er)
                },
                () => resolve({
                    status: 200
                })
            )

        })
    }
    catch (er) {
        return {
            status: 600
        }
    }

}

export const exportJSON = async () => {

    const convertResult = (index, item, fields, array = []) => {
        if (index > 0)
            return convertResult(index - 1, item, fields, [rowToArray(item(index - 1), fields)].concat(array))
        else return array
    }


    try {
        return await new Promise((resolve, reject) => {
            let data
            db.transaction(async (tx) => {
                data = Object.fromEntries(await Promise.all(tables.map(async (table, i) => {
                    const exportData = `SELECT * FROM ${table}` + (table === 'cards' ? ' ORDER BY type DESC' : '') //order by type important check comment *1
                    const resultSet = await runQuery(tx, exportData, [])
                    return [table, convertResult(resultSet.rows.length, resultSet.rows.item, fields[i])]
                })))
            },
                (er) => {
                    reject(er)
                },
                () => resolve({
                    status: 200,
                    result: {
                        version: 1,
                        type: 'plsv',
                        data: data,
                    }
                })
            )

        })
    }
    catch (er) {
        return {
            status: 629
        }
    }
}


// for use on app load
export const initDataBase = async () => {
    //create tables if not exists
    await sendRequest('INIT', '', [
        { table: 'testPoints' },
        { table: 'survey' },
        { table: 'pipelines' },
        { table: 'cards' },
        { table: 'potentials' },
        { table: 'referenceCells' },
        { table: 'circuits' },
        { table: 'rectifiers' },
        { table: 'defaultNames' },
        { table: 'settings' },
        { table: 'potentialTypes' },
        { table: 'sides' }])

    //check if defaults names are presented and 
    const defaultNamesFromDb = await sendRequest('SELECT', 'DEFAULT_NAME_TYPES')
    if (defaultNamesFromDb.status === 200) {
        const isRefreshNeeded = defaultNames.some(defName => defaultNamesFromDb.result.indexOf(defName.property) === -1)
        if (isRefreshNeeded) {
            await sendRequest('DROP', '', { table: 'defaultNames' })
            await sendRequest('INIT', '', { table: 'defaultNames' })
            await sendRequest('INSERT', 'DEFAULT_NAME', defaultNames.map(d => ({ type: d.property, name: d.name })))
        }
    }

    const settings = await sendRequest('SELECT', 'SETTINGS')
    const defaultOnboarding = JSON.stringify({ main: true, editTestPoint: true, map: true, editBond: true, editReferenceCell: true, potentialTypes: true })
    if (settings.status !== 200) {
        const update = await sendRequest('INSERT', 'SETTINGS', { pipelineNameAsDefault: true, defaultPotentialUnit: 0, autoCreatePotentials: 1, onboarding: defaultOnboarding })
        if (update.status === 200)
            return defaultOnboarding
        else return null
    }
    return settings.result.onboarding
}



/*

*1 - order cards by type when exporting... field pipelineCardId is a prop for card of type 'CN' and referes to a card of type 'PL' in table 'cards'. if cards of type CN exported first, 
then they will be imported first as well, and could have pipelineCardId field refer to the row in table 'cards' of type 'PL' that hadn't been imported yet, it will throw error cause its a foreign key field.
therefore export by type DESC


*/