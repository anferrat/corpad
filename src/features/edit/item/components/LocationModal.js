import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Modal, Button, Text, Icon } from '@ui-kitten/components'
import { useLocation } from '../hooks/useLocation'
import { basic400, control, primary } from '../../../../styles/colors'

const LocationModal = ({ visible, hideModal, updateLatAndLon }) => {
    //Pretty horrible modal from ui kitten. had to split into two components for animation to work
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
        updateLatAndLon(latitude, longitude)
        hideModal()
    }, [latitude, longitude, updateLatAndLon, hideModal])

    const renderIcon = (props) => <Icon
        {...props}
        name={'corner-down-right-outline'} />

    return (
        <>
            <View style={styles.titleRow}>
                <Icon name={'navigation'} style={styles.titleIcon} fill={primary} />
                <Text category='h6' style={styles.title}>Coordinate capture</Text>
            </View>
            <View style={styles.coords}>
                <View style={styles.values}>
                    <Text appearance='hint' category='label' style={styles.text}>Latitude:</Text>
                    <Text category='p1' style={styles.textValue}>{latitude}</Text>
                </View>
                <View style={styles.values}>
                    <Text appearance='hint' category='label' style={styles.text}>Longitude:</Text>
                    <Text category='p1' style={styles.textValue}>{longitude}</Text>
                </View>
            </View>
            <Text style={styles.accuracy} category='label' appearance='hint'>Accuracy: <Text category='p1' style={styles.textValue}>{accuracy?.toFixed(0) ?? '??'} m</Text> </Text>
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
        height: 200,
        width: '90%',
        borderRadius: 10,
        padding: 12,
        borderColor: basic400,
        borderWidth: 1
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
        flex: 1
    },
    textValue: {
        textTransform: 'lowercase',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
    },
    values: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        width: '47.5%'
    },
    text: {
        flexBasis: 70,
        lineHeight: 35,
        textTransform: 'uppercase'
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