import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'
import MarkerInfoView from './animated/MarkerInfoView'
import Pressable from '../../../components/Pressable'
import useActiveMarkerInfo from '../hooks/useActiveMarkerInfo'


const MarkerInfo = ({ zoomToCoordinates, navigateToView, navigateToMapLayerPointView, shareActiveLocation }) => {
    const { visible,
        name,
        subtitle,
        location,
        icon,
        iconColor,
        onPress,
        onLongPress,
        onShare } = useActiveMarkerInfo({ zoomToCoordinates, navigateToView, navigateToMapLayerPointView, shareActiveLocation })
    return (
        <MarkerInfoView
            onSharePress={onShare}
            visible={visible}>
            <Pressable
                android_ripple={androidRipple}
                style={styles.pressable}
                onPress={onPress}
                onLongPress={onLongPress}
                disabled={!visible}>
                <View style={styles.subView}>
                    <Icon
                        name={icon}
                        pack='cp'
                        style={styles.mainIcon}
                        fill={iconColor} />
                    <View style={styles.titleView}>
                        <Text
                            category='h4'
                            ellipsizeMode='tail'
                            numberOfLines={1}>
                            {name}
                        </Text>
                        <View style={styles.statusView}>
                            <Text
                                category='s1'
                                appearance='hint'>
                                {subtitle}
                            </Text>
                        </View>
                        <View
                            style={styles.dividerView} />
                        {location !== null ?
                            <View
                                style={styles.statusView}>
                                <Icon
                                    name='map-outline'
                                    style={styles.subtitleIcon}
                                    fill={basic} />
                                <Text
                                    category='s1'
                                    appearance='hint'
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>{location}
                                </Text>
                            </View>
                            : null}
                    </View>
                </View>
                <Icon
                    name='arrow-ios-forward-outline'
                    style={styles.subViewIcon}
                    fill={basic} />
            </Pressable>
        </MarkerInfoView>
    )
}

export default React.memo(MarkerInfo)

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
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