import React, { useEffect, useRef } from 'react'
import { Pressable, View, StyleSheet, Animated, Linking } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { iconHandlerItem, subtitleHandlerItem, getStatusProps } from '../../helpers/functions'
import { basic } from '../../styles/colors'
import { androidRipple } from '../../styles/styles'
import MapButton from './components/MapButton'

const getMapIconSVG = (icon, status) => <Icon name={'map-' + icon} pack='cp' style={styles.mainIcon} fill={getStatusProps(status).color} />

//Android only
const extMapHandler = async (lat, lng) => {
    if (lat !== null && lng !== null) {
        const url = 'geo:' + lat + ',' + lng + '?q=' + lat + ',' + lng
        const supported = await Linking.canOpenURL(url)
        if (supported)
            await Linking.openURL(url)
    }
}

const MarkerInfo = (props) => {
    const transY = useRef(new Animated.Value(props.uid === null ? 140 : 0))
    const hidden = props.uid === null || props.latitude === null || props.longitude === null || props.id === null || props.dataType === null

    useEffect(() => {
        if (hidden)
            Animated.timing(
                transY.current,
                {
                    toValue: 140,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
        else if (props.latitude !== null && props.longitude !== null) {
            Animated.timing(
                transY.current,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
        }
    }, [props])

    return (
        <>
            <Animated.View style={{
                ...styles.buttonView,
                bottom: props.location !== null ? 140 : 120,
                elevation: transY.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [5, 0]
                }),
                opacity: transY.current.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0]
                })
            }}>
                <MapButton
                    icon='share'
                    onPress={hidden ? null : extMapHandler.bind(this, props.latitude, props.longitude)}
                />
            </Animated.View>
            <Animated.View style={{
                ...styles.mainView,
                transform: [{ translateY: transY.current }],
                opacity: transY.current.interpolate({
                    inputRange: [0, 140],
                    outputRange: [1, 0]
                })
            }}>
                <Pressable android_ripple={androidRipple} style={styles.pressable} onPress={hidden ? null : props.navigateToView.bind(this, props.id, props.dataType)} onLongPress={props.zoomToTestPoint.bind(this, props.latitude, props.longitude)} disabled={hidden}>
                    <View style={styles.subView}>
                        {getMapIconSVG(iconHandlerItem(props.dataType, props.testPointType), props.status)}
                        <View style={styles.titleView}>
                            <Text category='h5' ellipsizeMode='tail' numberOfLines={1}>{props.name}</Text>
                            <View style={styles.statusView}>
                                <Text category='p2' appearance='hint'>{subtitleHandlerItem(props.dataType, props.testPointType)}</Text>
                            </View>
                            <View style={styles.dividerView} />
                            {props.location !== null ?
                                <View style={styles.statusView}>
                                    <Icon name='map-outline' style={styles.subtitleIcon} fill={basic} />
                                    <Text category='p2' appearance='hint' numberOfLines={1} ellipsizeMode='tail'>{props.location}</Text>
                                </View> : null}
                        </View>
                    </View>
                    <Icon name='arrow-ios-forward-outline' style={styles.subViewIcon} fill={basic} />
                </Pressable>
            </Animated.View>
        </>
    )
}

export default React.memo(MarkerInfo)

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    subView: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    mainView: {
        width: '90%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        borderRadius: 6,
        elevation: 5
    },
    buttonView: {
        position: 'absolute',
        right: '5%'
    },
    mainIcon: {
        width: 50,
        height: 50,
        marginHorizontal: 12,
        marginRight: 18,
    },
    subtitleIcon: {
        width: 18,
        height: 18,
        marginRight: 6
    },
    statusView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 6
    },
    subViewIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    dividerView: {
        padding: 3
    },
    titleView: {
        flex: 1,
        paddingRight: 12
    }
})