import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Text, Icon, Modal, Button } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'
import { basic, control, primary } from '../../../../styles/colors'
import useNavigationWidget from './hooks/useNavigationWidget'
import ListItem from './components/ListItem'
import { getDistance } from './helpers/functions'
import LoadingView from '../../../../components/LoadingView'


const NavigationWidget = () => {
    const {
        showModal,
        visible,
        location,
        arrowRotation,
        enabled,
        direction,
        hideModal,
        name,
        loading
    } = useNavigationWidget()
    const { distance, bearing, heading, accuracy } = location

    if (enabled)
        return (
            <>
                <IconButton
                    iconName='compass'
                    onPress={showModal} />
                <Modal
                    style={styles.modal}
                    visible={visible}
                    onBackdropPress={hideModal}
                    backdropStyle={styles.backdrop}>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Icon name={'compass'} style={styles.compassIcon} fill={primary} />
                            <Text category={'h6'} style={styles.title}>Direction to: {name}</Text>
                        </View>
                        <LoadingView loading={loading}>
                            <Animated.View
                                style={{
                                    ...styles.arrow,
                                    transform: [{
                                        rotate: arrowRotation.current.interpolate({
                                            inputRange: [0, 360],
                                            outputRange: ['0deg', '360deg']
                                        })
                                    }]
                                }}>
                                <Icon
                                    name='navigation'
                                    fill={primary}
                                    style={styles.icon} />
                            </Animated.View>
                            <ListItem value={`${direction} (${Math.round(bearing)}\u00b0)`} />
                            <ListItem title={'Distance: '} value={getDistance(distance)} />
                            <ListItem title={'Accuracy: '} value={getDistance(accuracy)} />
                        </LoadingView>
                        <Button
                            onPress={hideModal}
                            appearance='ghost'>
                            Close
                        </Button>

                    </View>
                </Modal>
            </>
        )
    else return null
}



export default NavigationWidget

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    direction: {
        marginRight: 12
    },
    arrow: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 60,
        height: 60,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        padding: 6,
        borderRadius: 10,
    },
    activity: {
        marginRight: 22
    },
    compassIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 12
    },
    modal: {
        flex: 1
        //maxWidth: 900
    },
    container: {
        width: 300,
        backgroundColor: control,
        height: 250,
        borderRadius: 10,
        paddingTop: 12
    },

    titleContainer: {
        flexDirection: 'row'
    }
})
