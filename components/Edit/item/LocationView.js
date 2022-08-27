import React, { useState, useRef, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import InputField from './InputField'
import { useDispatch } from 'react-redux'
import fieldValidation from '../../fieldValidation'
import { updateProperty } from '../../../store/actions/item'
import { primary } from '../../../styles/GlobalStyle'
import SingleIconButton from '../../_Stateless/SingleIconButton'
import { requestLocationAsync } from '../../_nativeFeatures/location'
import { errorHandler } from '../../errorHandler'


const LocationView = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const componentMounted = useRef(true)

    const getLocationAsync = React.useCallback(async () => {
        setIsLoading(true)
        const loc = await requestLocationAsync()
        if (loc.status === 200) {
            const latitude = fieldValidation(loc.location.coords.latitude, 'latitude')
            const longitude = fieldValidation(loc.location.coords.longitude, 'longitude')
            if (componentMounted.current) {
                dispatch(updateProperty(latitude.value, 'latitude', true))
                dispatch(updateProperty(longitude.value, 'longitude', true))
            }
        }
        else errorHandler(loc.status)
        if (componentMounted.current)
            setIsLoading(false)
    }, [dispatch])

    useEffect(() => () => { componentMounted.current = false }, [])

    return (
        <View style={styles.GPSInputs}>
            <InputField
                style={styles.inputField}
                property='latitude'
                keyboardType='numeric'
                maxLength={13}
                value={props.latitude}
                valid={props.latValid}
                label='Latitude' />
            <View style={styles.inter} />
            <InputField
                style={styles.inputField}
                keyboardType='numeric'
                maxLength={13}
                property='longitude'
                value={props.longitude}
                valid={props.lonValid}
                label='Longitude' />
            <View style={styles.button}>
                {isLoading ? <ActivityIndicator color={primary} /> : <SingleIconButton
                    iconName='navigation'
                    onPress={getLocationAsync}
                />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        flex: 1,
    },
    inter: {
        paddingHorizontal: 6,
    },
    input: {
        marginTop: 10,
        flexBasis: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 6
    },
    GPSInputs: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button:
    {
        flexBasis: 50,
        paddingTop: 10,
        paddingLeft: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default React.memo(LocationView)