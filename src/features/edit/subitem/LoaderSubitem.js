import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadSubitemState, resetSubitemState } from '../../../store/actions/subitem'
import { sendRequest } from '../../../api/database/index'
import { getCardDefaultName, getCircuitDefaultName, genValidObject, verifyTypes, genRequestObject } from '../../../helpers/functions'
import CardView from './card/CardView'
import CircuitView from './circuit/CircuitView'
import { updateViewProperty } from '../../../store/actions/item'
import { updateSubitemProperty } from '../../../store/actions/subitem'
import { errorHandler } from '../../../helpers/error_handler'
import { primary } from '../../../styles/colors'


const fetchData = async (dataDtype, subitemId, itemId, cardType = undefined) => {
    try {
        const defaultPrefix = (await sendRequest('SELECT', 'DEFAULT_NAME', { type: cardType }))
        switch (dataDtype) {
            case 'CARD':
                const cardData = (await sendRequest('SELECT', 'CARD', { cardId: subitemId, cardType: cardType }))
                const cardList = (await sendRequest('SELECT', 'CARD_LIST', { testPointId: itemId }))
                const defaultName = getCardDefaultName(cardList.result, cardType, subitemId, defaultPrefix.result)
                const pipelineList = verifyTypes(cardType, ['PL', 'RS']) ? (await sendRequest('SELECT', 'PIPELINE_LIST_DATA', {})) : { status: 200, result: [] }
                const settings = verifyTypes(cardType, ['PL', 'RS']) ? (await sendRequest('SELECT', 'SETTINGS', {})) : { status: 200, result: {} }
                const referenceCellList = verifyTypes(cardType, ['PL', 'AN', 'CN', 'FC', 'OT', 'RE', 'RS']) ? (await sendRequest('SELECT', 'REFERENCE_CELL_LIST', { testPointId: itemId })) : { status: 200, result: [] }
                const sides = verifyTypes(cardType, ['SH', 'BD', 'IK']) ? (await sendRequest('SELECT', 'SIDES', { cardId: subitemId })) : { status: 200, result: [] }
                if (cardData.status === 200 && cardList.status === 200 && pipelineList.status === 200 && settings.status === 200 && referenceCellList.status === 200 && sides.status === 200)
                    return {
                        status: 200,
                        result: {
                            ...cardData.result,
                            valid: genValidObject(cardData.result),
                            sideA: sides.result.filter(s => s.sideAId !== null).map(s => s.sideAId),
                            sideB: sides.result.filter(s => s.sideBId !== null).map(s => s.sideBId),
                            pipelineList: pipelineList.result,
                            cardList: cardList.result,
                            referenceCellList: referenceCellList.result,
                            defaultName: defaultName,
                            defaultPrefix: defaultPrefix.result,
                            pipelineNameAsDefault: settings.result?.pipelineNameAsDefault ?? false
                        }
                    }
                else return {
                    status: 607
                }
            case 'CIRCUIT':
                const circuitData = (await sendRequest('SELECT', 'CIRCUIT', { circuitId: subitemId }))
                const circuitList = (await sendRequest('SELECT', 'CIRCUITS', { rectifierId: itemId }))
                if (circuitData.status === 200 && circuitList.status === 200)
                    return {
                        status: 200,
                        result: {
                            ...circuitData.result,
                            voltageDrop: null, // we don't record voltage drop - it's for calculation purposes only
                            valid: genValidObject(circuitData.result),
                            defaultName: getCircuitDefaultName(circuitList.result, subitemId, defaultPrefix.result)
                        }
                    }
                else return {
                    status: 607
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
                const updateRequest = await sendRequest('UPDATE', props.dataType, genRequestObject(props.dataType, props.subitemId, data))
                //sides table update used in Shunt, Bond and Isolation
                if (props.dataType === 'CARD')
                    if (verifyTypes(data.type, ['SH', 'BD', 'IK'])) {
                        await sendRequest('DELETE', 'SIDES', genRequestObject(props.dataType, props.subitemId))
                        await sendRequest('INSERT', 'SIDE', data.sideA.map(side => {
                            return { side: 'sideA', value: side, cardId: props.subitemId }
                        }).concat(data.sideB.map(side => {
                            return { side: 'sideB', value: side, cardId: props.subitemId }
                        })))
                    }
                const newTime = Date.now()
                const updateTime = await sendRequest('UPDATE', props.dataTypeItem + '_PROPERTY', { property: 'timeModified', value: newTime, ...genRequestObject(props.dataTypeItem, props.itemId) })
                if (updateRequest.status === 200 && updateTime.status === 200) {
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
            if (deleteOnExit.current) {
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