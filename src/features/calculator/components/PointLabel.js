import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'

const PointLabel = (props) => {
    return (
        <View style={styles.mainView}>
            <Icon name='TS-filled' pack='cp' style={styles.icon} fill={basic} />
            <Text category='s1' appearance='hint'>{props.label}</Text>
        </View>
    )
}

export default React.memo(PointLabel)

const styles = StyleSheet.create({
    mainView: {
        flexBasis: 90,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 6
    }
})