import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { sendRequest } from '../../api/database/index'
import IdGen from '../../helpers/id_generator'
import { genRequestObject } from '../../helpers/functions'
import fieldValidation from '../../helpers/validation'
import { setNewItemMarker } from '../../store/actions/map'
import MapButton from './components/MapButton'
import { errorHandler } from '../../helpers/error_handler'
import { extMapHandler } from './helpers/linking'

const NewItemView = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const active = props.latitude !== null && props.longitude !== null
    const transY = useRef(new Animated.Value(!active ? 160 : 0))
    const componentMounted = useRef(true)
    const createNewItem = React.useCallback(async (dataType, latitude, longitude) => {
        setLoading(dataType)
        const lat = fieldValidation(latitude, 'latitude')
        const lon = fieldValidation(longitude, 'longitude')
        if (lat.valid && lon.valid && latitude !== null && longitude !== null) {
            const itemId = await sendRequest('INSERT', dataType, { uid: IdGen(), timeCreated: Date.now() })
            if (itemId.status === 200) {
                const updateRequest = await sendRequest('UPDATE', dataType + '_PROPERTY', [{ ...genRequestObject(dataType, itemId.result), property: 'latitude', value: lat.value }, { ...genRequestObject(dataType, itemId.result), property: 'longitude', value: lon.value }])
                if (updateRequest.status === 200) {
                    props.navigateToEdit(itemId.result, dataType)
                }
                else {
                    errorHandler(617)
                    await sendRequest('DELETE', dataType, genRequestObject(dataType, itemId.result))
                }
            }
            else errorHandler(617)
        }
        else errorHandler(801)
        dispatch(setNewItemMarker())
        setTimeout(() => { //to account for animation
            if (componentMounted.current)
                setLoading(false)
        }, 300)
    }, [])

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        if (!active)
            Animated.timing(
                transY.current,
                {
                    toValue: 240,
                    duration: 450,
                    useNativeDriver: true
                }
            ).start()
        else if (active) {
            Animated.timing(
                transY.current,
                {
                    toValue: 0,
                    duration: 450,
                    useNativeDriver: true
                }
            ).start()
        }
    })
    return (
        <Animated.View style={{
            ...styles.mainView,
            transform: [{ translateY: transY.current }]
        }}>
            <MapButton icon='share' onPress={extMapHandler.bind(this, props.latitude, props.longitude)} />
            <MapButton icon={loading === 'TEST_POINT' ? 'spinner' : 'TS-filled'} pack='cp' onPress={createNewItem.bind(this, 'TEST_POINT', props.latitude, props.longitude)} status='primary' disabled={!!loading} />
            <MapButton icon={loading === 'RECTIFIER' ? 'spinner' : 'RT-filled'} pack='cp' onPress={createNewItem.bind(this, 'RECTIFIER', props.latitude, props.longitude)} status='primary' disabled={!!loading} />
        </Animated.View>
    )

}


export default React.memo(NewItemView)

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        bottom: 37,
        height: 178,
        left: '5%',
        justifyContent: 'space-between',
    },
})