import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Text, Icon, Modal, Button } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'
import { basic, control, primary } from '../../../../styles/colors'
import useNavigationWidget from './hooks/useNavigationWidget'
import ListItem from './components/ListItem'
import { getDistance } from './helpers/functions'
import LoadingView from '../../../../components/LoadingView'
import DirectionLabel from './components/DirectionLabel'


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
                            <Text category={'h6'} style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>Direction to: {name}</Text>
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

                            <View style={styles.values}>
                                <DirectionLabel value={`${direction} (${Math.round(bearing)}\u00b0)`} />
                                <ListItem title={'Distance: '} value={getDistance(distance)} />
                                <ListItem title={'Accuracy: '} value={getDistance(accuracy)} />
                            </View>
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
        marginTop: 12,
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
        marginRight: 12
    },
    modal: {
        width: '90%',
        alignSelf: 'center'
    },
    container: {
        backgroundColor: control,
        height: 250,
        borderRadius: 10,
        paddingTop: 12,
        justifyContent: 'center'
    },

    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    title: {
        flex: 1,
    },
    values: {
        flex: 1,
        paddingHorizontal: 12,

    }
})
