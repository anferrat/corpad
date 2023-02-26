import React, { useEffect, useRef } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadEditState, resetState, resetRunSafeEffect } from '../../../store/actions/item'
import { sendCombinedRequest, sendRequest } from '../../../api/database/index'
import { genValidObject, getName, genRequestObject } from '../../../helpers/functions'
import { setUpdating } from '../../../store/actions/list'
import TestPointView from './test_point/TestPointView'
import RectifierView from './rectifier/RectifierView'
import PipelineView from './pipeline/PipelineView'
import { setMarkerUpdate } from '../../../store/actions/map'
import { errorHandler } from '../../../helpers/error_handler'
import { primary } from '../../../styles/colors'

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
            const data = await sendCombinedRequest([['SELECT', props.dataType, genRequestObject(props.dataType, props.itemId)], ['SELECT', 'DEFAULT_NAME', { type: props.dataType }]])
            if (data.status === 200) {
                if (componentMounted.current)
                    dispatch(loadEditState({ ...data.result[0], valid: genValidObject(data.result[0]), defaultName: getName(props.itemId, props.dataType, data.result[1]) }))
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
        return <View style={styles.empty}><ActivityIndicator color={primary} /></View>
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


const styles = StyleSheet.create({
    empty: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        padding: 12,
        borderWidth: 0,
        borderRadius: 6,
        margin: 6,
        marginTop: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 350
    }
})