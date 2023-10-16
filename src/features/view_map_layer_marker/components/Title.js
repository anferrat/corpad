import { Icon, ListItem, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapLayerStrokeColors, basic } from '../../../styles/colors'


const Title = ({ markerName, color, layerName }) => {
    return (
        <View style={styles.container}>
            <Icon
                name='map-pointer'
                pack='cp'
                fill={MapLayerStrokeColors[color] ?? '#000'}
                style={styles.icon} />
            <View style={styles.titleView}>
                <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode='middle'
                    category='h4'>
                    {markerName}
                </Text>
                <View style={styles.subtitleView}>
                    <Icon
                        name='layers'
                        style={styles.smallIcon}
                        fill={basic} />
                    <Text
                        style={styles.text}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        appearance='hint'
                        category='s2'>
                        {layerName}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 18,
        flex: 1
    },
    titleView: {
        flex: 1
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 12
    },
    subtitleView: {
        flexDirection: 'row',
        flex: 1
    },
    smallIcon: {
        width: 18,
        height: 18,
        marginRight: 6
    },
    text: {
        flex: 1,
        marginRight: 12
    }
})