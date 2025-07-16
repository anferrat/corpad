import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Modal, Button, Text, Icon } from '@ui-kitten/components'
import { useLocation } from '../hooks/useLocation'
import { basic400, control, primary } from '../../../styles/colors'
import LoadingView from '../../../components/LoadingView'
import { getModalTop } from '../../../styles/dimensions'

const LocationModal = ({ visible, hideModal, updateLatAndLon }) => {
    return (
        <Modal
            style={styles.modal}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}
            visible={visible}
            hideModal={hideModal}>
            <LocationModalContent
                updateLatAndLon={updateLatAndLon}
                hideModal={hideModal} />
        </Modal>
    )
}

export default LocationModal


const LocationModalContent = ({ hideModal, updateLatAndLon }) => {
    const { latitude, longitude, accuracy } = useLocation(hideModal)

    const onCapture = useCallback(() => {
        if (latitude !== null && longitude !== null)
            updateLatAndLon(latitude, longitude)
        hideModal()
    }, [latitude, longitude, updateLatAndLon, hideModal])

    const renderIcon = (props) => <Icon
        {...props}
        name={'checkmark-circle-2'} />

    return (
        <>
            <View style={styles.titleRow}>
                <Icon name={'navigation'} style={styles.titleIcon} fill={primary} />
                <Text category='h6' style={styles.title}>Coordinate capture</Text>
            </View>
            <LoadingView loading={latitude === null && longitude === null}>
                <View style={styles.coords}>
                    <View style={styles.valueTitles}>
                        <Text appearance='hint' category='label' style={styles.text}>Latitude:</Text>
                        <Text appearance='hint' category='label' style={styles.text}>Longitude:</Text>
                    </View>
                    <View style={styles.values}>
                        <Text category='p1' style={styles.textValue}>{latitude}</Text>
                        <Text category='p1' style={styles.textValue}>{longitude}</Text>
                    </View>
                </View>
                <Text style={styles.accuracy} category='label' appearance='hint'>Accuracy: <Text category='p1' style={styles.textValue}>{accuracy?.toFixed(0) ?? '??'} m</Text> </Text>
            </LoadingView>
            <View style={styles.buttons}>
                <Button style={styles.button} accessoryLeft={renderIcon} onPress={onCapture}>Capture</Button>
                <Button style={styles.button} appearance='ghost' onPress={hideModal}>Cancel</Button>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: control,
        height: 220,
        width: '90%',
        borderRadius: 10,
        padding: 18,
        borderColor: basic400,
        borderWidth: 1,
        position: 'absolute',
        top: getModalTop(220)
    },
    titleRow: {
        flexDirection: 'row'
    },
    titleIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    coords: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 12
    },
    textValue: {
        textTransform: 'lowercase',
        fontWeight: 'bold',
        textAlign: 'center',
        flexBasis: 22

    },
    values: {
        alignItems: 'center',
        flex: 1
    },
    valueTitles: {
        alignItems: 'flex-start',
        flex: -1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        width: '47.5%'
    },
    text: {
        textTransform: 'uppercase',
        flexBasis: 24
    },
    accuracy: {
        flex: 1,
        textTransform: 'uppercase',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    title: {
        paddingBottom: 12
    }
})