import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { sendRequest } from '../../database/db'
import { useDispatch, useSelector } from 'react-redux'
import { loadViewState, resetState } from '../../store/actions/item'
import { setUpdating } from '../../store/actions/list'
import { genRequestObject, genValidObject, getName, getListStateByType, genMarker } from '../customFunctions'
import { androidStyle, primary } from '../../styles/GlobalStyle'
import ControlBar from './ControlBar'
import TestPointView from './TestPoint/TestPointView'
import RectifierView from './Rectifier/RectifierView'
import PipelineView from './Pipeline/PipelineView'
import { setMarkerUpdate } from '../../store/actions/map'
import { errorHandler } from '../errorHandler'


const LoaderItem = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.item.view)
    const listTimeModified = useSelector(state => getListStateByType(props.dataType, state).itemList?.find(item => item?.id === props.itemId)?.timeModified)
    const componentMounted = useRef(true)
    const requestUpdate = useRef(false) //keeps track if list needs to be updated
    const initialStatus = useRef(null)
    const requestMarkerUpdate = useRef(false)
    
    useEffect(() => {
        //When component mounts it obtains data from DB and loads it to state
        componentMounted.current = true
        const getDataFromDB = async () => {

            const dataObject = await sendRequest('SELECT', props.dataType, genRequestObject(props.dataType, props.itemId))
            const tpCount = props.dataType === 'PIPELINE' ? (await sendRequest('SELECT', 'PIPELINE_TEST_POINT_COUNT', genRequestObject(props.dataType, props.itemId))) : { status: 200, result: null }
            if (dataObject.status === 200 && tpCount.status === 200) {
                initialStatus.current = dataObject.result?.status ?? null
                if (componentMounted.current)
                    dispatch(loadViewState({ ...dataObject.result, valid: genValidObject(dataObject.result), defaultName: getName(props.itemId, props.dataType), tpCount: tpCount.result }))
            }
            else errorHandler(603, props.goBack)
        }
        getDataFromDB()

        // When unmounts it does following: 
        // 1. swicthes flag to prevent loading state of unmounted component
        //2. resets Item state
        //3. checks if flag for update is true and requests list update. Flag is updated in separate useEffect and depends on timeModified values of item.view and that item in the list

        return () => {
            componentMounted.current = false
            dispatch(resetState())
            if (requestUpdate.current)
                dispatch(setUpdating(props.dataType, props.itemId, 'UPDATE'))
            if (requestMarkerUpdate.current)
                dispatch(setMarkerUpdate('UPDATE', props.dataType, props.itemId))
        }
    }, [])

    // Effect to determine if List needs an update

    useEffect(() => {
        requestUpdate.current = (listTimeModified !== data.timeModified) && listTimeModified
    }, [listTimeModified, data.timeModified])

    useEffect(() => {
        requestMarkerUpdate.current = (initialStatus.current !== data.status) && initialStatus.current !== null
        //data.status - is the only marker property that can be changed from View screen, if changed update dependency list
    }, [data.status])


    const renderItem = React.useCallback((data) => {
        switch (props.dataType) {
            case 'TEST_POINT':
                return <TestPointView tpData={data} itemId={props.itemId} dataType={props.dataType} />
            case 'RECTIFIER':
                return <RectifierView rectifierData={data} itemId={props.itemId} dataType={props.dataType} />
            case 'PIPELINE':
                return <PipelineView pipelineData={data} itemId={props.itemId} dataType={props.dataType} />
        }
    }, [props.itemId, props.dataType])


    if (!data.uid)
        return <View style={androidStyle.EmptyCard}><ActivityIndicator color={primary} size='large' /></View>
    else
        return (
            <Layout style={androidStyle.ConnectionCardMain}>
                <View style={styles.mainView}>
                    {renderItem(data)}
                </View>
                <ControlBar
                    ref={requestMarkerUpdate}
                    mapNavEnabled={data?.latitude !== null && data?.longitude !== null}
                    testPointType={props.dataType === 'TEST_POINT' ? data.testPointType : null}
                    itemId={props.itemId}
                    dataType={props.dataType}
                    navigateToEditItem={props.navigateToEditItem}
                    navigateToEditSubitem={props.navigateToEditSubitem}
                    navigateToMap={props.navigateToMap}
                    goBack={props.goBack} />
            </Layout>
        )
}

export default LoaderItem

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    }
})