import React, { useEffect, useRef } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadEditState, resetState, resetRunSafeEffect } from '../../../store/actions/item'
import { sendRequest } from '../../../database/db'
import { genValidObject, getName, genRequestObject } from '../../customFunctions'
import { setUpdating } from '../../../store/actions/list'
import TestPointView from './TestPoint/TestPointView'
import RectifierView from './Rectifier/RectifierView'
import PipelineView from './Pipeline/PipelineView'
import { setMarkerUpdate } from '../../../store/actions/map'
import { errorHandler } from '../../errorHandler'
import { androidStyle, primary } from '../../../styles/GlobalStyle'

const LoaderItem = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.item.edit)
    const runSaveEffect = useSelector(state => state.item.runSaveEffect)
    const deleteOnExit = useRef(props.isNew)
    const componentMounted = useRef(true)

    useEffect(() => {
        if (runSaveEffect) {
            deleteOnExit.current = false
            const saveData = async () => {
                const updateRequest = await sendRequest('UPDATE', props.dataType, genRequestObject(props.dataType, props.itemId, data))
                if (updateRequest.status === 200) {
                    dispatch(setUpdating(props.dataType, props.itemId, props.isNew ? 'INSERT' : 'UPDATE'))
                    if (props.dataType !== 'PIPELINE')
                        dispatch(setMarkerUpdate(props.isNew ? 'INSERT' : 'UPDATE', props.dataType, props.itemId))
                    dispatch(resetRunSafeEffect())
                    props.navigateToView()
                }
                else errorHandler(604)
            }
            saveData()
        }
    }, [runSaveEffect])

    useEffect(() => {
        componentMounted.current = true
        const fetchData = async () => {
            const dataObject = await sendRequest('SELECT', props.dataType, genRequestObject(props.dataType, props.itemId))
            const defaultPrefix = (await sendRequest('SELECT', 'DEFAULT_NAME', { type: props.dataType }))
            if (dataObject.status === 200 && defaultPrefix.status === 200) {
                if (componentMounted.current)
                    dispatch(loadEditState({ ...dataObject.result, valid: genValidObject(dataObject.result), defaultName: getName(props.itemId, props.dataType, defaultPrefix.result) }))
            }
            else errorHandler(603, props.goBack)
        }
        fetchData()
        return () => {
            componentMounted.current = false
            if (deleteOnExit.current) {
                // delete onExit is for new items that havent been saved. fail silently
                sendRequest('DELETE', props.dataType, genRequestObject(props.dataType, props.itemId))
                dispatch(resetState())
            }
        }
    }, [dispatch])

    if (!data.uid)
        return <View style={androidStyle.EmptyCard}><ActivityIndicator color={primary} /></View>
    else
        switch (props.dataType) {
            case 'TEST_POINT':
                return <TestPointView
                    navigateToSubitem={props.navigateToSubitem}
                    testPointId={props.itemId}
                    tpData={data} />
            case 'RECTIFIER':
                return <RectifierView
                    navigateToSubitem={props.navigateToSubitem}
                    rectifierId={props.itemId}
                    rectifierData={data} />
            case 'PIPELINE':
                return <PipelineView
                    pipelineData={data} />
        }
}
export default LoaderItem