import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadSubitemState, resetSubitemState } from '../../../store/actions/subitem'
import { sendCombinedRequest, sendRequest } from '../../../api/database/index'
import { getCardDefaultName, getCircuitDefaultName, genValidObject, verifyTypes, genRequestObject } from '../../../helpers/functions'
import CardView from './card/CardView'
import CircuitView from './circuit/CircuitView'
import { updateViewProperty } from '../../../store/actions/item'
import { updateSubitemProperty } from '../../../store/actions/subitem'
import { errorHandler } from '../../../helpers/error_handler'
import { primary } from '../../../styles/colors'


const fetchData = async (dataDtype, subitemId, itemId, cardType = undefined) => {
    try {
        //const defaultPrefix = (await sendRequest('SELECT', 'DEFAULT_NAME', { type: cardType }))
        const defaultNameRequest = ['SELECT', 'DEFAULT_NAME', { type: cardType }]
        switch (dataDtype) {
            case 'CARD':
                {
                    const requests = [
                        defaultNameRequest,
                        ['SELECT', 'CARD', { cardId: subitemId, cardType: cardType }],
                        ['SELECT', 'CARD_LIST', { testPointId: itemId }],
                        ['SELECT', 'PIPELINE_LIST_DATA', {}],
                        ['SELECT', 'SETTINGS', {}],
                        ['SELECT', 'REFERENCE_CELL_LIST', { testPointId: itemId }],
                        ['SELECT', 'SIDES', { cardId: subitemId }],
                    ]
                    const data = await sendCombinedRequest(requests)
                    if (data.status === 200)
                        return {
                            status: 200,
                            result: {
                                ...data.result[1],
                                defaultPrefix: data.result[0],
                                cardList: data.result[2],
                                valid: genValidObject(data.result[1]),
                                sideA: verifyTypes(cardType, ['SH', 'BD', 'IK']) ? data.result[6].filter(s => s.sideAId !== null).map(s => s.sideAId) : [],
                                sideB: verifyTypes(cardType, ['SH', 'BD', 'IK']) ? data.result[6].filter(s => s.sideBId !== null).map(s => s.sideBId) : [],
                                pipelineList: verifyTypes(cardType, ['PL', 'RS']) ? data.result[3] : [],
                                referenceCellList: verifyTypes(cardType, ['PL', 'AN', 'CN', 'FC', 'OT', 'RE', 'RS']) ? data.result[5] : [],
                                defaultName: getCardDefaultName(data.result[2], cardType, subitemId, data.result[0]),
                                pipelineNameAsDefault: verifyTypes(cardType, ['PL', 'RS']) ? data.result[4]?.pipelineNameAsDefault : false
                            }
                        }
                    else return {
                        status: 607
                    }
                }
            case 'CIRCUIT': {
                const requests = [
                    defaultNameRequest,
                    ['SELECT', 'CIRCUIT', { circuitId: subitemId }],
                    ['SELECT', 'CIRCUITS', { rectifierId: itemId }]
                ]
                const data = await sendCombinedRequest(requests)

                if (data.status === 200)
                    return {
                        status: 200,
                        result: {
                            ...data.result[1],
                            voltageDrop: null, // we don't record voltage drop - it's for calculation purposes only
                            valid: genValidObject(data.result[1]),
                            defaultName: getCircuitDefaultName(data.result[2], subitemId, data.result[0])
                        }
                    }
                else return {
                    status: 607
                }
            }
            default:
                return {
                    status: 200,
                    result: [],
                }
        }
    }
    catch (er) {
        return {
            status: 607
        }
    }
}


const LoaderSubItem = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.subitem)
    const runSaveEffect = useSelector(state => state.subitem.runSaveEffect)
    const deleteOnExit = useRef(props.isNew)
    const componentMounted = useRef(true)

    //Effect updating default name of RS or PL card. When setting USE_PIPELINE_NAME_AS_DEFAULT used, PL and RS card default name is a Pipeline name they belong to.
    useEffect(() => {
        if (data?.pipelineNameAsDefault && (verifyTypes(props.subitemType, ['PL', 'RS'])) && data?.pipelineList !== undefined) {
            const pipeIndex = data?.pipelineList.findIndex(p => p.id === data?.pipelineId)
            dispatch(updateSubitemProperty(data?.pipelineList[pipeIndex]?.name ?? getCardDefaultName(data?.cardList, props.subitemType, props.subitemId, data.defaultPrefix), 'defaultName'))
        }
    }, [data?.pipelineId])

    useEffect(() => {
        if (runSaveEffect) {
            deleteOnExit.current = false
            const saveData = async () => {
                const newTime = Date.now()
                const updateRequest = ['UPDATE', props.dataType, genRequestObject(props.dataType, props.subitemId, data)]
                //sides table update used in Shunt, Bond and Isolation in Cards
                const sidesUpdateRequest =
                    (props.dataType === 'CARD') && verifyTypes(data.type, ['SH', 'BD', 'IK']) ?
                        [
                            ['DELETE', 'SIDES', genRequestObject(props.dataType, props.subitemId)],
                        ].concat(data.sideA.map(side => {
                            return ['INSERT', 'SIDE', { side: 'sideA', value: side, cardId: props.subitemId }]
                        }).concat(data.sideB.map(side => {
                            return ['INSERT', 'SIDE', { side: 'sideB', value: side, cardId: props.subitemId }]
                        }))) : []
                const updateTimeRequest = ['UPDATE', props.dataTypeItem + '_PROPERTY', { property: 'timeModified', value: newTime, ...genRequestObject(props.dataTypeItem, props.itemId) }]
                const update = await sendCombinedRequest([updateRequest].concat(sidesUpdateRequest).concat([updateTimeRequest]))
                if (update.status === 200) {
                    props.goBack()
                    dispatch(updateViewProperty(newTime, 'timeModified'))
                }

                else errorHandler(608)
            }
            saveData()
        }
    }, [runSaveEffect, data])

    useEffect(() => {
        const fetchDataFromDatabase = async () => {
            componentMounted.current = true
            const dataObject = await fetchData(props.dataType, props.subitemId, props.itemId, props.subitemType)
            if (dataObject.status === 200) {
                if (componentMounted.current)
                    dispatch(loadSubitemState(dataObject.result))
            }
            else errorHandler(607, props.goBack)
        }
        fetchDataFromDatabase()
        return () => {
            componentMounted.current = false
            if (deleteOnExit.current) { //why in ref? but sure
                // fail silently
                sendRequest('DELETE', props.dataType, genRequestObject(props.dataType, props.subitemId)) //change if more subitems added
            }
            dispatch(resetSubitemState())
        }
    }, [])

    if (!data.uid)
        return <View style={styles.empty}><ActivityIndicator color={primary} /></View>
    else
        switch (props.dataType) {
            case 'CARD':
                return <CardView
                    referenceCellList={data.referenceCellList}
                    pipelineList={data.pipelineList}
                    cardList={data.cardList}
                    type={props.subitemType}
                    cardData={data} />
            case 'CIRCUIT':
                return <CircuitView
                    circuitData={data} />
            default: return null
        }
}

export default LoaderSubItem

const styles = StyleSheet.create({
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 350
    }
})