import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { sendRequest } from '../../database/db'
import IdGen from '../IdGen'
import { genRequestObject } from '../customFunctions'
import fieldValidation from '../fieldValidation'
import { useDispatch } from 'react-redux'
import { setNewItemMarker } from '../../store/actions/map'
import MapActionButton from '../_Stateless/Map/MapActionButton'
import { errorHandler } from '../errorHandler'

const NewItemView = (props) => {
    const dispatch = useDispatch()
    const active = props.latitude !== null && props.longitude !== null
    const transY = useRef(new Animated.Value(!active ? 160 : 0))

    const createNewItem = React.useCallback(async (dataType, latitude, longitude) => {
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
    }, [])

    useEffect(() => {
        if (!active)
            Animated.timing(
                transY.current,
                {
                    toValue: 160,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
        else if (active) {
            Animated.timing(
                transY.current,
                {
                    toValue: 0,
                    duration: 300,
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
            <MapActionButton icon='TS-filled' pack='cp' onPress={createNewItem.bind(this, 'TEST_POINT', props.latitude, props.longitude)} />
            <MapActionButton icon='RT-filled' pack='cp' onPress={createNewItem.bind(this, 'RECTIFIER', props.latitude, props.longitude)} />
        </Animated.View>
    )

}


export default NewItemView

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        bottom: 25,
        left: '5%',
        justifyContent: 'space-between',
    },
})