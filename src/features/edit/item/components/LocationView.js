import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'
import IconButton from '../../../../components/IconButton'
import LocationModal from './LocationModal'


const LocationView = ({ update, validate, latitude, longitude, latitudeValid, longitudeValid, updateLatAndLon }) => {
    const [visible, setVisible] = useState(false)

    const showModal = React.useCallback(() => setVisible(true), [setVisible])

    const hideModal = React.useCallback(() => setVisible(false), [setVisible])


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
                <IconButton
                    iconName='navigation'
                    onPress={showModal}
                />
            </View>
            <LocationModal
                visible={visible}
                updateLatAndLon={updateLatAndLon}
                hideModal={hideModal}

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