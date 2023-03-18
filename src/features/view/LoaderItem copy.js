import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { sendCombinedRequest } from '../../api/database/index'
import { useDispatch, useSelector } from 'react-redux'
import { loadViewState, resetState } from '../../store/actions/item'
import { setUpdating } from '../../store/actions/list'
import { genRequestObject, genValidObject, getName, getListStateByType } from '../../helpers/functions'
import { primary } from '../../styles/colors'
import ControlBar from './components/ControlBar'
import TestPointView from './test_point/TestPointView'
import RectifierView from './rectifier/RectifierView'
import PipelineView from './pipeline/PipelineView'
import { setMarkerUpdate } from '../../store/actions/map'
import { errorHandler } from '../../helpers/error_handler'


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
            const data = await sendCombinedRequest([
                ['SELECT', props.dataType, genRequestObject(props.dataType, props.itemId)],
            ].concat(
                props.dataType === 'PIPELINE' ? //Test_point count only applicable for pipelines
                    [['SELECT', 'PIPELINE_TEST_POINT_COUNT', genRequestObject(props.dataType, props.itemId)]] :
                    []))
            if (data.status === 200) {
                initialStatus.current = data.result[0]?.status ?? null
                if (componentMounted.current)
                    dispatch(loadViewState({
                        ...data.result[0],
                        valid: genValidObject(data.result[0]),
                        defaultName: getName(props.itemId, props.dataType), //why do I have this?
                        tpCount: data.result[1] ?? null
                    }))
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
        return <View style={styles.empty}><ActivityIndicator color={primary} size='large' /></View>
    else
        return (
            <Layout style={styles.card}>
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
    },
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
    },
    card: {
        overflow: "hidden",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 6,
        margin: 6,
        marginTop: 12
    }
})