import React from 'react'
import { View, StyleSheet } from 'react-native'
import useLocationView from '../hooks/useLocationView'
import InputField from '../../../components/Input'
import IconButton from '../../../components/IconButton'
import LocationModal from './LocationModal'
import { useSelector } from 'react-redux'


const LocationView = ({ setCalculatorData, setCoordValid, latitude, longitude, latitudeValid, longitudeValid, disabled, showCalculatorOnMap, isSaved }) => {
    const {
        onLatitudeChange,
        onLongitudeChange,
        onLatitudeEndEdit,
        onLongitudeEndEdit,
        visible,
        showModal,
        hideModal,
        updateLatAndLon
    } = useLocationView(setCalculatorData, setCoordValid, latitude, longitude)
    const isSurveyLoaded = useSelector(state => state.settings.currentSurvey.isLoaded)
    if (disabled && latitude === null && longitude === null)
        return null
    return (
        <View style={styles.GPSInputs}>
            <InputField
                disabled={disabled}
                onChangeText={onLatitudeChange}
                onEndEditing={onLatitudeEndEdit}
                style={styles.inputField}
                property='latitude'
                keyboardType='numeric'
                maxLength={13}
                value={latitude}
                valid={latitudeValid}
                label='Latitude' />
            <View style={styles.inter} />
            <InputField
                disabled={disabled}
                onChangeText={onLongitudeChange}
                onEndEditing={onLongitudeEndEdit}
                style={styles.inputField}
                keyboardType='numeric'
                maxLength={13}
                property='longitude'
                value={longitude}
                valid={longitudeValid}
                label='Longitude' />
            {!disabled || isSaved && isSurveyLoaded ?
                <View style={styles.button}>
                    <IconButton
                        iconName={disabled ? 'globe-2' : 'navigation'}
                        onPress={disabled ? showCalculatorOnMap : showModal} />
                </View> : null}
            <LocationModal
                visible={visible}
                updateLatAndLon={updateLatAndLon}
                hideModal={hideModal} />
        </View>
    )
}


export default LocationView


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