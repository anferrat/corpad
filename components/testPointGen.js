import { sendRequest } from '../database/db'
import idGen from './IdGen'
import { testPointReadings, testPointTypes, potentialUnits, potentialFields, defaultNames, wireColorList, wireGaugesList, couponTypes, anodeMaterialList, isolationAssemblyTypes, referenceCellTypes, pipeDiameterList } from '../constants/constants'
import { verifyTypes } from './customFunctions'

//FOR DEV USE ONLY - test point generator and database reset


const sendRequestResult = async (x, y, z) => (await sendRequest(x, y, z)).result

const comments = ['HelloWorld', 'Nothing cool but we can read this', 'Ignorance is a bliss', 'BEAR detected', 'When does vacation start again?', 'Hmm, I dont see nothing, but Ill leave a comment here just in case', 'Try to come up with 10 different comments yourself']

const locations = ['77 Silver Spear Dr.', '378 Briarwood St.', '444 Studebaker St.', '454 Hillcrest Ave.', '886 Piper Street', '56 Warren St.', '26 Bradford St.', '17 Valley Farms Ave.', '99 N. Glenlake St.', '7564 N. Pennington St.', '8982 Central Ave.', '123 Highland Dr.']

const genIndex = (array) => Math.floor((Math.random() * (array.length)))

const genValue = (min, max) => {
    const delta = Math.abs(Math.abs(max) - Math.abs(min))
    return (max - delta * Math.random()).toFixed(3)
}

const genCoord = (min, max) => {
    const delta = Math.abs(Math.abs(max) - Math.abs(min))
    return (max - delta * Math.random()).toFixed(7)
}

const genIntValue = (min, max) => Math.floor(genValue(min, max))

const genRandomItemsArray = (array) => {
    if (array.length === 0)
        return []
    else {
        const numberOfElements = genIndex(array) + 1
        return Array.apply(null, Array(numberOfElements)).map(i => array[genIndex(array)]).filter((v, i, s) => s.indexOf(v) === i)
    }
}

const genCard = async (cardType, testPointId, pipeList, potentialConfig, referenceCellId, potentialTypes) => {
    const cardId = await sendRequestResult('INSERT', 'CARD', { uid: idGen(), testPointId: testPointId, type: cardType })
    const nameIndex = defaultNames.findIndex(item => item.property === cardType)
    const current = genValue(0, 12)
    const cardList = await sendRequestResult('SELECT', 'CARD_LIST', { testPointId: testPointId })
    const pipelineCardList = cardList.filter(card => card.type === 'PL' || card.type === 'RS')
    const pipelineCardIndex = pipelineCardList.length === 0 ? null : cardList[genIndex(pipelineCardList)].id
    const ratioCurrent = genIntValue(3, 15)
    await sendRequestResult('UPDATE', 'CARD', {
        cardId: cardId,
        cardObject: {
            name: defaultNames[nameIndex].name ?? 'Unknown',
            type: cardType,
            wireColor: genIndex(wireColorList),
            wireGauge: genIndex(wireGaugesList),
            couponType: genIndex(couponTypes),
            anodeMaterial: genIndex(anodeMaterialList),
            current: current,
            currentUnit: '',
            area: 100,
            density: (current / 100).toFixed(4),
            pipelineCardId: pipelineCardIndex,
            isolationType: genIndex(isolationAssemblyTypes),
            shorted: genIndex([0, 1]),
            rcType: genIndex(referenceCellTypes),
            nps: genIndex(pipeDiameterList),
            ratioVoltage: 50,
            ratioCurrent: ratioCurrent,
            factor: (ratioCurrent / 50).toFixed(4),
            voltageDrop: (current * 50 / ratioCurrent).toFixed(4),
            pipelineId: (pipeList.length === 0) || (genIntValue(0, 3) < 1) ? null : pipeList[genIndex(pipeList)],
            fromAToB: genIndex([0, 1]),
        }
    })
    genPotentialsForCard(cardType, potentialConfig, cardId, referenceCellId, potentialTypes)
}

const genCards = async (testPointId, referenceCellId, maxNumber = 8, potentialConfig = 'ON_OFF', cardTypes = testPointReadings) => {
    const pipeList = await sendRequestResult('SELECT', 'PIPELINE_LIST', {})
    const potentialTypes = await sendRequestResult('SELECT', 'POTENTIAL_TYPES', {})
    const numberOfCards = genIntValue(0, maxNumber)
    const types = Array.apply(null, Array(numberOfCards)).map(type => cardTypes[genIndex(cardTypes)])
    await Promise.all(types.map(async type => await genCard(type, testPointId, pipeList, potentialConfig, referenceCellId, potentialTypes)))
}


const genSidesForCards = async (cardList) =>
    await Promise.all(cardList.map(async card => {
        if (verifyTypes(card.type, ['SH', 'BD', 'IK'])) {
            const sideList = (verifyTypes(card.type, ['SH', 'BD'])) ? cardList.filter(c => verifyTypes(c.type, ['PL', 'AN', 'OT'])) : (card.type === 'IK' ? cardList.filter(c => verifyTypes(c.type, ['RS', 'FC'])) : [])
            const sideA = genRandomItemsArray(sideList).map(c => c.id)
            const sideB = genRandomItemsArray(sideList).map(c => c.id)
            //console.log(sideB)
            await sendRequestResult('INSERT', 'SIDE', sideA.map(s => ({ side: 'sideA', value: s, cardId: card.id })))
            await sendRequestResult('INSERT', 'SIDE', sideB.map(s => ({ side: 'sideB', value: s, cardId: card.id })))
        }
    }))


const genPotentialsForCard = async (cardType, config, cardId, referenceCellId, potentialTypes, randomMax = 4) => {
    const on = potentialTypes.find(pt => pt.permType === 'PERM_ON').id
    const off = potentialTypes.find(pt => pt.permType === 'PERM_OFF').id
    const native = potentialTypes.find(pt => pt.permType === 'PERM_NATIVE').id
    const con = potentialTypes.find(pt => pt.permType === 'PERM_CONNECTED').id
    const disc = potentialTypes.find(pt => pt.permType === 'PERM_DISCONNECTED').id
    switch (config) {
        case 'ON_OFF': {
            if (verifyTypes(cardType, ['PL', 'RS'])) {
                await genPotential(cardId, referenceCellId, on)
                await genPotential(cardId, referenceCellId, off)

            }
            return
        }
        case 'ON_OFF_CON_DISC':
            {
                if (verifyTypes(cardType, ['PL', 'RS', 'RE', 'OT', 'FC'])) {
                    await genPotential(cardId, referenceCellId, on)
                    await genPotential(cardId, referenceCellId, off)
                }
                if (verifyTypes(cardType, ['AN', 'CN'])) {
                    await genPotential(cardId, referenceCellId, con)
                    await genPotential(cardId, referenceCellId, disc)
                }
                return
            }
        case 'DEPOL':
            {
                if (verifyTypes(cardType, ['PL', 'RS', 'OT', 'FC'])) {
                    await genPotential(cardId, referenceCellId, off)
                    await genPotential(cardId, referenceCellId, native)
                }
                return
            }
        case 'RANDOM':
            {
                if (verifyTypes(cardType, ['PL', 'AN', 'RS', 'RE', 'CN', 'FC', 'OT'])) {
                    const numberOfPotentials = genIntValue(0, randomMax)
                    const potList = potentialTypes.map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)
                        .filter((_, i) => i <= numberOfPotentials)
                    await Promise.all(potList.map(async pot => await genPotential(cardId, referenceCellId, pot.id)))
                }
            }
    }
}

const genPotential = async (cardId, referenceCellId, potentialTypeId) => {
    const unit = potentialUnits[genIndex(potentialUnits)]
    const id = await sendRequestResult('INSERT', 'POTENTIAL', { isPortable: 1, uid: idGen(), cardId: cardId, referenceCellId: referenceCellId, potentialType: potentialTypeId, unit: unit })
    await sendRequestResult('UPDATE', 'POTENTIAL', { potentialObject: { value: genValue(-1.900, -0.450), unit: unit }, potentialId: id })
}


export const genNewTestPoint = async (referenceCellId, MAX_CARDS_IN_TEST_POINT, POTENTIALS_CONFIG, CARD_TYPES) => {
    const statuses = [null, 0, 1, 2]
    try {
        const testPointId = await sendRequestResult('INSERT', 'TEST_POINT', { uid: idGen(), timeCreated: Date.now() })
        await sendRequestResult('UPDATE', 'TEST_POINT', [{
            testPointId: testPointId, testPointObject: {
                timeCreated: Date.now(),
                timeModified: Date.now(),
                comment: comments[genIndex(comments)],
                name: 'TP' + testPointId,
                latitude: genCoord(49, 50),
                status: statuses[genIndex(statuses)],
                longitude: genCoord(-123, -122),
                testPointType: genIndex(testPointTypes),
                location: locations[genIndex(locations)],
            }
        }])
        await genCards(testPointId, referenceCellId, MAX_CARDS_IN_TEST_POINT, POTENTIALS_CONFIG, CARD_TYPES)
        const cardList = await sendRequestResult('SELECT', 'CARD_LIST', { testPointId: testPointId })
        await genSidesForCards(cardList)
    }
    catch (er) {
        console.log(er)
    }
}

export const genPoints = async (number) => {
    const MAX_CARDS_IN_TEST_POINT = 7
    const POTENTIALS_CONFIG = 'ON_OFF'
    const CARD_TYPES = ['PL', 'RS', 'AN', 'BD', 'SH']

    console.log('Test points are being created. Wait...')
    const referenceCells = await sendRequestResult('SELECT', 'REFERENCE_CELL_LIST', {})
    const referenceCellId = referenceCells.find(rc => !!rc.mainReference).id
    for (i = 0; i < number; i++) {
        await genNewTestPoint(referenceCellId, MAX_CARDS_IN_TEST_POINT, POTENTIALS_CONFIG, CARD_TYPES)
    }
    console.log(number, 'test points created')
}


export const create_db_tables2 = async () => {
    await sendRequestResult('DROP', '', [{ table: 'testPoints' }, { table: 'survey' }, { table: 'pipelines' }, { table: 'cards' }, { table: 'potentials' }, { table: 'referenceCells' }, { table: 'circuits' }, { table: 'rectifiers' }, { table: 'defaultNames' }, { table: 'settings' }, { table: 'potentialTypes' }, { table: 'sides' }])
    console.log('tables deleted')
    await sendRequestResult('INIT', '', [{ table: 'testPoints' }, { table: 'survey' }, { table: 'pipelines' }, { table: 'cards' }, { table: 'potentials' }, { table: 'referenceCells' }, { table: 'circuits' }, { table: 'rectifiers' }, { table: 'defaultNames' }, { table: 'settings' }, { table: 'potentialTypes' }, { table: 'sides' }])
    console.log('tables Crerated')
    const id1 = await sendRequestResult('INSERT', 'PIPELINE', { uid: idGen(), timeCreated: Date.now() })
    await sendRequestResult('UPDATE', 'PIPELINE', { pipelineObject: { name: 'Pipeline1', nps: 2, material: 2, timeModified: Date.now() }, pipelineId: id1 })

    const id2 = await sendRequestResult('INSERT', 'PIPELINE', { uid: idGen(), timeCreated: Date.now() })
    await sendRequestResult('UPDATE', 'PIPELINE', { pipelineObject: { name: 'Pipeline2', nps: 4, material: 1, timeModified: Date.now() }, pipelineId: id2 })
    console.log('pipelines crerated')


    const rc1 = await sendRequestResult('INSERT', 'REFERENCE_CELL', { uid: idGen(), mainReference: 1 })
    await sendRequestResult('UPDATE', 'REFERENCE_CELL', { referenceCellObject: { name: 'RC1', rcType: 0, mainReference: true }, referenceCellId: rc1 })
    console.log('refcells crerated')

    const rectId = await sendRequestResult('INSERT', 'RECTIFIER', { uid: idGen(), timeCreated: Date.now() })
    await sendRequestResult('UPDATE', 'RECTIFIER', {
        rectifierObject: {
            name: 'RectNumba1',
            timeModified: Date.now(),
            comment: 'Testing rec data loader',
            latitude: genCoord(49, 50),
            status: 1,
            longitude: genCoord(-123, -122),
            location: '143 Dalcastle Way NW',
            model: 'YYY-3Y-2Y',
            serialNumber: '42520-1',
            powerSource: 1,
            acCurrent: 10,
            acVoltage: 120,
            tapSetting: 0,
            maxVoltage: 100,
            maxCurrent: 12,
            tapValue: 10,
            tapCoarse: 2,
            tapFine: 3,
        }, rectifierId: rectId
    })
    console.log('rectefier crerated')

    const cirId1 = await sendRequestResult('INSERT', 'CIRCUIT', { uid: '1234321', rectifierId: rectId })
    await sendRequestResult('UPDATE', 'CIRCUIT', { circuitId: cirId1, circuitObject: { name: 'Circ-1', ratioCurrent: 50, ratioVoltage: 100, current: 10, voltage: 23.3, voltageDrop: 12, target: 2.2 } })
    const cirId2 = await sendRequestResult('INSERT', 'CIRCUIT', { uid: '123454321', rectifierId: rectId })

    await sendRequestResult('UPDATE', 'CIRCUIT', { circuitId: cirId2, circuitObject: { name: 'Circ-2', ratioCurrent: 10, ratioVoltage: 200, current: 1, voltage: 9.9, voltageDrop: 1, target: null } })
    console.log('circuits crerated')
    await sendRequestResult('INSERT', 'DEFAULT_NAME', defaultNames.map(d => ({ type: d.property, name: d.name })))
    console.log('defaultNames difined')

    await sendRequestResult('INSERT', 'SETTINGS', { pipelineNameAsDefault: false, defaultPotentialUnit: 0, autoCreatePotentials: 1 })
    console.log('settings difined')

    await sendRequestResult('INSERT', 'POTENTIAL_TYPE', potentialFields.map(f => ({ ...f, uid: idGen() })))
    console.log('potential fields defined')
}


export const create_db_tables = async () => {
    await sendRequestResult('DROP', '', [{ table: 'testPoints' }, { table: 'survey' }, { table: 'pipelines' }, { table: 'cards' }, { table: 'potentials' }, { table: 'referenceCells' }, { table: 'circuits' }, { table: 'rectifiers' }, { table: 'defaultNames' }, { table: 'settings' }, { table: 'potentialTypes' }, { table: 'sides' }, { table: 'calculators' }])
    console.log('tables deleted')
}
