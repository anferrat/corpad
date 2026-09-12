import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon, Modal, Button } from '@ui-kitten/components'
import { basic300, control, primary } from '../../../../styles/colors'
import useNavigationWidget from './hooks/useNavigationWidget'
import ListItem from './components/ListItem'
import { getDistance } from './helpers/functions'
import LoadingView from '../../../../components/LoadingView'
import DirectionLabel from './components/DirectionLabel'
import { getModalTop } from '../../../../styles/dimensions'
import { compass } from '../../../../components/Icons'
import NavigationArrow from './components/NavigationArrow'
import NearbyLocationMarker from './components/NearbyLocationMarker'

const NavigationWidget = () => {
    const {
        showModal,
        visible,
        location,
        enabled,
        direction,
        hideModal,
        name,
        loading,
        nearby,
        sensorEnabled,
        handleSensorUnavailable,
        handleArrowReady
    } = useNavigationWidget()
    const { distance, bearing, accuracy } = location

    if (!enabled)
        return null

    return (
        <>
            <Button
                accessoryLeft={compass}
                onPress={showModal}
                appearance='ghost'>
                Compass
            </Button>
            <Modal
                style={styles.modal}
                visible={visible}
                onBackdropPress={hideModal}
                backdropStyle={styles.backdrop}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Icon
                            name='compass'
                            style={styles.compassIcon}
                            fill={primary} />
                        <Text
                            category='h6'
                            style={styles.title}
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            Direction to: {name}
                        </Text>
                    </View>
                    {nearby && <NearbyLocationMarker />}
                    {!nearby && sensorEnabled && <NavigationArrow
                        bearing={bearing}
                        loading={loading}
                        onReady={handleArrowReady}
                        onUnavailable={handleSensorUnavailable} />}
                    <LoadingView loading={!nearby && loading}>
                        <View style={styles.values}>
                            {!nearby && <DirectionLabel value={`${direction} (${Math.round(bearing)}\u00b0)`} />}
                            <ListItem
                                title='Distance: '
                                value={getDistance(distance)} />
                            <ListItem
                                title='Accuracy: '
                                value={getDistance(accuracy)} />
                        </View>
                    </LoadingView>
                    <Button
                        style={styles.closeButton}
                        onPress={hideModal}
                        appearance='ghost'>
                        Close
                    </Button>
                </View>
            </Modal>
        </>
    )
}

export default NavigationWidget

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    compassIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    modal: {
        width: '80%',
        position: 'absolute',
        top: getModalTop(320),
        height: 320,
    },
    container: {
        backgroundColor: control,
        flex: 1,
        borderRadius: 15,
        padding: 24,
        paddingBottom: 0,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: basic300
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        flex: 1,
    },
    values: {
        flex: 1,
        marginBottom: 12
    },
    closeButton: {
        height: 60,
        marginHorizontal: -24
    }
})
