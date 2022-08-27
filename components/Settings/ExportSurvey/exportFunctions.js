import { sendRequest } from "../../../database/db"
import { labels, pipeDiameterList, pipeMaterials, pipeProducts, statusInfo, testPointTypes } from "../../../constants/constants"
import { getFormattedDate, getTapSettings } from "../../customFunctions"

export const exportPipelinePotentials = async (testPointList, potentialTypes, pipelineList, referenceCellId, readingTypes) => {
    //Generates matrix to export as CSV file in a format of array of same length arrays. first element is array of titles which <PIPE_NAME>_<PIPE_INDEX>_<POTERNTIAL_TYPE> 
    //referenceCellId - single reference cell Id (e.g. main reference). In future is possible to take into account multiple referenceCells and generate 1 lvl deeper matrix, try
    //potentialTypes - list of ids of potentialTypes that needs to be included in the list
    //testPointList - list of test point ids
    //Also possible to add an option to have a list of pipes, to include only selected pipelines

    /*
    Idea of this function is to generate 4 lvl deep array. and then flatten it to 2 lvl. Example for a single test point:
                                        Pipe_1      Pipe_2      ...     Pipe_N
                    PotentialType_1         *           *               *     
                    PotentialType_2         *           *               *     
                    ...
                    PotentialType_n         *           *               *     
    Where * - array of potential values (One test point can have multiple PL or RS cards with potential reading of the same type (e.g. on, off) AND of same pipelineId (Pipe_1, Pipe_2 etc...))
    Pipeline and Riser readings withouit pipeline name are not included here.
    - Top to Bottom: TestPoints->Pipelines->PotentialTypes->Values->Value
    */

    const pipeList = pipelineList.map(p => p.id)
    const pipeNames = pipelineList.map(p => p.name)
    const potentialTypeIds = potentialTypes.map(pt => pt.id)
    const potentialTypeNames = potentialTypes.map(pt => pt.name)
    const res = await Promise.all(testPointList.map(async (testPointId) =>
        await Promise.all(pipeList.map(async (pipeId) =>
            (await sendRequest('EXPORT', 'POTENTIALS_PIPELINE', potentialTypeIds.map(potentialType => ({ potentialTypeId: potentialType, pipelineId: pipeId, testPointId: testPointId, referenceCellId: referenceCellId, readingTypes: readingTypes })))).result
        ))
    ))
    //number of values in final array can be different from test point to test point, therefore we need to find maxNumber of values for given potentialType and pipeline, so we can create enough title fields
    //we creating a matrix that containes maximum number of fields that needed. With index of potentialType and index of pipeline we can simply retrive that number
    const fieldMaxedIndex = pipeList.map((_, i) =>
        potentialTypeIds.map((_, j) => Math.max.apply(null, testPointList.map((_, o) => res[o][i][j].length))))

    //creating new array inside matrix (Pipes X PotentialTypes) and generate title as element of that new array, then flatten it to 2 lvls
    const titles = pipeNames.map((pipeName, i) => potentialTypeNames.map((potentialTypeName, j) => Array.apply(null, Array(fieldMaxedIndex[i][j])).map((_, p) => potentialTypeName.toUpperCase() + '_' + pipeName.toUpperCase() + '_' + (p + 1).toString()))).flat(2)
    //return values add title as first element, valueArray doesnt have enough elements to fill the new Array with Maxedlength, fill it with '' and flatten it 2 lvls
    return [titles].concat(testPointList.map((_, o) => pipeNames.map((_, i) => potentialTypeIds.map((_, j) => Array.apply(null, Array(fieldMaxedIndex[i][j])).map((_, p) => res[o][i][j][p] ?? ''))).flat(2)))
}

export const exportPotentials = async (testPointList, potentialTypes, referenceCellId, cardTypes) => {
    /*
    Similar concept to exportPipelinePotentials. Creating another matrix potentialTypes vs cardTypes
                                                AN          CN      ...     PL (without pipelineId)
                        PotentialType_1         *           *               *     
                        PotentialType_2         *           *               *     
                        ...
                        PotentialType_n         *           *               *     
        Where * - array of potentials of this type. length of array is number of cards that can have non-null potentials in this testPoint (PL, AN, RE, CN, OT, RS)
       PL and RS values are only the ones where pipelineId = null, to not overlap with exportPipelinePotentials
       - Top to Bottom: TestPoints->CardTypes->PotentialTypes->cardList->Value
        */

    const potentialTypeNames = potentialTypes.map(pt => pt.name)
    const potentialTypeIds = potentialTypes.map(pt => pt.id)
    const res = await Promise.all(testPointList.map(async (testPointId) => {
        return await Promise.all(cardTypes.map(async (cardType) => {
            const cardList = (await sendRequest('EXPORT', 'POTENTIALS_CARD_LIST', { testPointId: testPointId, cardType: cardType, potentialTypes: potentialTypeIds, referenceCellId })).result
            const potentials = (await sendRequest('EXPORT', 'POTENTIALS', potentialTypeIds.map(potentialType => ({ potentialTypeId: potentialType, cardType: cardType, testPointId: testPointId, referenceCellId: referenceCellId })))).result

            //It's not efficient way. SQL thread is slowing down because expensive operations on the arrays in JS thread.  Need to improve SQL query (find a way to merge two) and change this function in future

            return potentialTypeIds.map((_, i) => cardList.map(cardId => {
                const match = potentials[i].map(p => p.cardId).indexOf(cardId)
                return match !== -1 ? potentials[i][match].value : null
            }))
        }))
    }))
    const fieldMaxedIndex = cardTypes.map((_, i) =>
        potentialTypeIds.map((_, j) => Math.max.apply(null, testPointList.map((_, o) => res[o][i][j].length))))
    const titles = cardTypes.map((cardType, i) => potentialTypeNames.map((potentialTypeName, j) => Array.apply(null, Array(fieldMaxedIndex[i][j])).map((_, p) => potentialTypeName + '_' + labels[cardType].exportLabel + '_' + (p + 1).toString()))).flat(2)
    return [titles].concat(testPointList.map((_, o) => cardTypes.map((_, i) => potentialTypeIds.map((_, j) => Array.apply(null, Array(fieldMaxedIndex[i][j])).map((_, p) => res[o][i][j][p] ?? ''))).flat(2)))
}

//exportedPropertyList [{cardType: <>, properties:  [property: <>]}]

export const exportSubitemProperties = async (itemList, exportedPropertyList) => {
    const res = await Promise.all(itemList.map(async (itemId) =>
        await Promise.all(exportedPropertyList.map(async p => {
            const data = (await sendRequest('EXPORT', 'SUBITEM_PROPERTIES', p.properties.map(property => ({ property: property, cardType: p.cardType, itemId: itemId })))).result
            const dataIds = data.flat(1).map(r => r.id).filter((v, i, s) => s.indexOf(v) === i)
            return p.properties.map((_, i) => dataIds.map(id => {
                const match = data[i].map(r => r.id).indexOf(id)
                return match !== -1 ? data[i][match].value : null
            }))
        }))))
    const fieldMaxedIndex = exportedPropertyList.map((p, i) => p.properties.map((_, j) => Math.max.apply(null, itemList.map((_, o) => res[o][i][j].length))))
    const titles = exportedPropertyList.map((p, i) => p.properties.map((propName, j) => Array.apply(null, Array(fieldMaxedIndex[i][j])).map((_, k) => labels[p.cardType].exportLabel + '_' + propName + '_' + (k + 1).toString()))).flat(2)
    return [titles].concat(itemList.map((_, o) => exportedPropertyList.map((p, i) => p.properties.map((_, j) => Array.apply(null, Array(fieldMaxedIndex[i][j])).map((_, k) => res[o][i][j][k] ?? ''))).flat(2)))
}



export const exportItemProperties = async (itemType, properties, itemList) => {
    const reqProperties = properties.length === 0 ? ['name'] : properties //in case if ui returned empty properties array
    const res = (await sendRequest('EXPORT', 'ITEM_PROPERTIES', itemList.map(id => ({ id: id, properties: reqProperties, dataType: itemType })))).result
    const titles = reqProperties.map(property => itemProperties[itemType].find(i => i.value === property)?.label ?? 'Error')
    return [titles].concat(res.map(item =>
        reqProperties.map(property =>
            nullChecker(propertyHandler(item, property))
        )))
}


// ---------------HELPERS -----------------------


export const exportedPropertyListHandler = (selectedProperties) => {
    const cardList = selectedProperties.map(sp => sp.cardType).filter((v, i, s) => s.indexOf(v) === i)
    return cardList.map(card => ({ cardType: card, properties: selectedProperties.filter(sp => sp.cardType === card).map(sp => sp.value) }))
}

const nullChecker = (value) => {
    if (value === null)
        return ''
    else return value
}

const propertyHandler = (resItem, property) => {
    switch (property) {
        case 'status':
            return statusInfo[resItem.status]?.title ?? null
        case 'testPointType':
            return testPointTypes[resItem.testPointType] ?? null
        case 'material':
            return pipeMaterials[resItem.material] ?? null
        case 'timeModified':
            return getFormattedDate(resItem.timeModified)
        case 'nps':
            return pipeDiameterList[resItem.nps] ?? null
        case 'product':
            return pipeProducts[resItem.product] ?? null
        case 'product':
            return pipeProducts[resItem.product] ?? null
        case 'tapSetting, tapValue, tapCoarse, tapFine':
            return getTapSettings(resItem.tapSetting, resItem.tapCoarse, resItem.tapFine, resItem.tapValue) ?? null
        default:
            return resItem[property] ?? null
    }
}


export const itemProperties =
{
    TEST_POINT:
        [
            { label: 'Name', value: 'name' },
            { label: 'Type', value: 'testPointType' },
            { label: 'Last modified', value: 'timeModified' },
            { label: 'Status', value: 'status' },
            { label: 'Latitude', value: 'latitude' },
            { label: 'Longitude', value: 'longitude' },
            { label: 'Location', value: 'location' },
            { label: 'Comment', value: 'comment' }
        ],
    PIPELINE:
        [
            { label: 'Name', value: 'name' },
            { label: 'Time modified', value: 'timeModified' },
            { label: 'Material', value: 'material' },
            { label: 'Size', value: 'nps' },
            { label: 'License number', value: 'licenseNumber' },
            { label: 'Product', value: 'product' },
            { label: 'Comment', value: 'comment' }
        ],
    RECTIFIER:
        [
            { label: 'Name', value: 'name' },
            { label: 'Latitude', value: 'latitude' },
            { label: 'Longitude', value: 'longitude' },
            { label: 'Last modified', value: 'timeModified' },
            { label: 'Location', value: 'location' },
            { label: 'Status', value: 'status' },
            { label: 'Model', value: 'model' },
            { label: 'Serial number', value: 'serialNumber' },
            { label: 'Output setting', value: 'tapSetting, tapValue, tapCoarse, tapFine' },
            { label: 'Max. voltage', value: 'maxVoltage' },
            { label: 'Max. current', value: 'maxCurrent' },
            { label: 'Comment', value: 'comment' }
        ]
}

export const cardProperties =
    [
        { label: 'Coupons | Current', value: 'CURRENT', cardType: 'CN' },
        { label: 'Coupons | Area', value: 'AREA', cardType: 'CN' },
        { label: 'Coupons | Densitiy', value: 'DENSITY', cardType: 'CN' },
        { label: 'Shunts | Ratio', value: 'RATIO', cardType: 'SH' },
        { label: 'Shunts | Factor', value: 'FACTOR', cardType: 'SH' },
        { label: 'Shunts | Voltage drop', value: 'VOLTAGE_DROP', cardType: 'SH' },
        { label: 'Shunts | Current', value: 'CURRENT', cardType: 'SH' },
        { label: 'Bonds | Current', value: 'CURRENT', cardType: 'BD' },
        { label: 'Isolations | Current', value: 'CURRENT', cardType: 'IK' },
        { label: 'Isolations | Short status', value: 'SHORTED', cardType: 'IK' },
    ]

export const circuitProperties =
    [
        { label: 'Current', value: 'CURRENT', cardType: 'CT' },
        { label: 'Voltage', value: 'VOLTAGE', cardType: 'CT' },
        { label: 'Target', value: 'TARGET', cardType: 'CT' },
    ]