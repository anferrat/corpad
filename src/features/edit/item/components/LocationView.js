import React, { useState, useRef, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Input from './Input'
import IconButton from '../../../../components/IconButton'
import { primary } from '../../../../styles/colors'
import { requestLocationAsync } from '../../../../native_libs/location'
import { errorHandler } from '../../../../helpers/error_handler'
import LocationModal from './LocationModal'


const LocationView = ({ update, validate, latitude, longitude, latitudeValid, longitudeValid, updateLatAndLon }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const componentMounted = useRef(true)

    const getLocationAsync = React.useCallback(async () => {
        setIsLoading(true)
        const { status, location } = await requestLocationAsync()
        if (componentMounted.current) {
            if (status === 200)
                updateLatAndLon(location.coords.latitude, location.coords.longitude)
            else errorHandler(status)
            setIsLoading(false)
        }
    }, [requestLocationAsync, setIsLoading, updateLatAndLon])

    useEffect(() => () => { componentMounted.current = false }, [])

    return (
        <View style={styles.GPSInputs}>
            <Input
                update={update}
                validate={validate}
                style={styles.inputField}
                property='latitude'
                keyboardType='numeric'
                maxLength={13}
                value={latitude}
                valid={latitudeValid}
                label='Latitude' />
            <View style={styles.inter} />
            <Input
                update={update}
                validate={validate}
                style={styles.inputField}
                keyboardType='numeric'
                maxLength={13}
                property='longitude'
                value={longitude}
                valid={longitudeValid}
                label='Longitude' />
            <View style={styles.button}>
                {isLoading ? <ActivityIndicator color={primary} /> : <IconButton
                    iconName='navigation'
                    onPress={setVisible.bind(this, true)}
                />}
            </View>
            <LocationModal
                visible={visible}
                updateLatAndLon={updateLatAndLon}
                hideModal={setVisible.bind(this, false)}

            />
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