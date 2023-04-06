import { TestPointElement } from "./Elements/TestPointElement"

export const SurveyFileDataFields = Object.freeze({
    SURVEY: 'survey',
    TEST_POINTS: 'testPoints',
    RECTIFIERS: 'rectifiers',
    PIPELINES: 'pipelines',
    POTENTIAL_TYPES: 'potentialTypes',
    REFERENCE_CELLS: 'referenceCells',
    CARDS: 'cards',
    POTENTIALS: 'potentials',
    CIRCUITS: 'circuits',
    SIDES: 'sides',
})



export class PipelineSurveyFile {
    static elements = Object.freeze({
        [SurveyFileDataFields.SURVEY]: ['uid', 'name', 'technician'],
        [SurveyFileDataFields.TEST_POINTS]: [`id`, 'uid', 'name', 'location', 'latitude', 'longitude', 'comment', 'testPointType', 'status', 'timeCreated', 'timeModified'],
        [SurveyFileDataFields.RECTIFIERS]: ['id', 'uid', 'name', 'location', 'latitude', 'longitude', 'comment', 'status', 'timeCreated', 'timeModified', 'model', 'serialNumber', 'powerSource', 'acVoltage', 'acCurrent', 'tapSetting', 'tapValue', 'tapCoarse', 'tapFine', 'maxVoltage', 'maxCurrent'],
        [SurveyFileDataFields.PIPELINES]: ['id', 'uid', 'name', 'nps', 'material', 'coating', 'licenseNumber', 'timeCreated', 'timeModified', 'product', 'comment'],
        [SurveyFileDataFields.POTENTIAL_TYPES]: ['id', 'uid', 'name', 'custom', 'permType'],
        [SurveyFileDataFields.REFERENCE_CELLS]: ['id', 'uid', 'rcType', 'name', 'mainReference'],
        [SurveyFileDataFields.CARDS]: ['id', 'testPointId', 'uid', 'type', 'name', 'anodeMaterial', 'wireColor', 'wireGauge', 'fromAtoB', 'current', 'currentUnit', 'pipelineId', 'pipelineCardId', 'couponType', 'density', 'area', 'description', 'isolationType', 'shorted', 'rcType', 'nps', 'ratioCurrent', 'ratioVoltage', 'factorSelected', 'factor', 'voltageDrop'],
        [SurveyFileDataFields.POTENTIALS]: ['id', 'cardId', 'uid', 'value', 'type', 'unit', 'portableReferenceId', 'permanentReferenceId'],
        [SurveyFileDataFields.CIRCUITS]: ['id', 'uid', 'name', 'rectifierId', 'ratioCurrent', 'ratioVoltage', 'voltageDrop', 'current', 'voltage', 'targetMin', 'targetMax'],
        [SurveyFileDataFields.SIDES]: ['id', 'sideAId', 'sideBId', 'parentCardId'],
    })

    constructor(survey, testPoints, rectifiers, pipelines, potentialTypes, referenceCells, subitems, potentials) {
        this.survey = survey
        this.testPoints = testPoints
        this.rectifiers = rectifiers
        this.pipelines = pipelines
        this.potentialTypes = potentialTypes
        this.referenceCells = referenceCells
        this.subitems = subitems
        this.potentials = potentials
    }


    /*
    addElement(elementType, value) {
        this.data[elementType].push(value)
    }

    parseJSON(obj) {
        this.version = obj.version
        this.type = obj.type
        this.data = {
            [SurveyFileDataFields.SURVEY]: [],
            [SurveyFileDataFields.TEST_POINTS]: obj.data[SurveyFileDataFields.SURVEY].map(element => new TestPointElement(...element)),
            [SurveyFileDataFields.RECTIFIERS]: rectifiers,
            [SurveyFileDataFields.PIPELINES]: pipelines,
            [SurveyFileDataFields.POTENTIAL_TYPES]: potentialTypes,
            [SurveyFileDataFields.REFERENCE_CELLS]: referenceCells,
            [SurveyFileDataFields.CARDS]: cards,
            [SurveyFileDataFields.POTENTIALS]: potentials,
            [SurveyFileDataFields.CIRCUITS]: circuits,
            [SurveyFileDataFields.SIDES]: sides,
        }
    }

    generateJSON() {
        return JSON.stringify({
            version: this.version,
            type: this.type,
            data: Object.keys(PipelineSurveyFile.elements)
                .reduce((obj, key) => ({
                    ...obj,
                    [key]: this.data[key].map(row => PipelineSurveyFile.elements[key].map(property => row[property] ?? null))
                }), {})
        })
    }

    resetSurveyValues() {
        // used to reset some of survey file values such as status, potential values, current values etc.
    }
*/

}



