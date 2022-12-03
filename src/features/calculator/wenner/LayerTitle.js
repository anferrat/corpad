import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'
import SingleIconButton from '../../../components/IconButton'

const LayerTitle = (props) => {
    return (
        <View style={styles.title}>
            <View style={styles.titleRow}>
                <Icon style={styles.icon} name='layers-outline' fill={basic} />
                <Text appearance='hint'>Layer {(props.index + 1)}</Text>
            </View>
            {props.index !== 0 && !props.disabled ? <SingleIconButton
                iconName={'close'}
                onPress={props.removeLayerHandler}
                size={'small'}
            /> : null}
        </View>
    )
}

export default React.memo(LayerTitle)

const styles = StyleSheet.create({
    title: {
        paddingVertical: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleRow: {
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
})