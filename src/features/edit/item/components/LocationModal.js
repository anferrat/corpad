import React, { useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Modal, Button, Text, Icon } from '@ui-kitten/components'
import { useLocation } from '../../../../native_libs/location'
import { basic400, control } from '../../../../styles/colors'

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
    const { latitude, longitude, accuracy } = useLocation()
    const iconRef = useRef()

    const onCapture = useCallback(() => {
        updateLatAndLon(latitude, longitude)
        hideModal()
    }, [latitude, longitude, updateLatAndLon, hideModal])

    const renderIcon = (props) => <Icon
        {...props}
        animation='pulse'
        ref={iconRef}
        animationConfig={{ cycles: Infinity }}
        name={'pin'} />

    useEffect(() => {
        iconRef.current.startAnimation()
    }, [renderIcon])



    return (
        <>
            <Text category='h5' style={styles.title}>Coordinate capture</Text>
            <View style={styles.coords}>
                <View style={styles.labels}>
                    <Text category='s1' appearance='hint' style={styles.text}>Latitude:</Text>
                    <Text category='s1' appearance='hint' style={styles.text}>Longitude:</Text>
                </View>
                <View style={styles.values}>
                    <Text category='h6' style={styles.text}>{latitude}</Text>
                    <Text category='h6' style={styles.text}>{longitude}</Text>
                </View>
            </View>
            <Text style={styles.accuracy} category='s1' appearance='hint'>Accuracy: <Text category='h6'>{accuracy?.toFixed(0) ?? '??'}</Text> m</Text>
            <View style={styles.buttons}>
                <Button style={styles.button} accessoryRight={renderIcon} onPress={onCapture}>Capture</Button>
                <Button style={styles.button} appearance='ghost' onPress={hideModal}>Cancel</Button>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: control,
        height: 250,
        width: '90%',
        borderRadius: 10,
        padding: 12,
        borderColor: basic400,
        borderWidth: 1
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    coords: {
        flexDirection: 'row'
    },
    values: {
        flex: 1,
        justifyContent: 'center',

        alignItems: 'center'
    },
    labels: {
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
        lineHeight: 35
    },
    accuracy: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    title: {
        paddingBottom: 12
    }
})