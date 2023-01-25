import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'


const ModalStatusRow = ({ children, icon, pack }) => {

    return (
        <View style={styles.statusRow}>
            <Icon name={icon} pack={pack} style={styles.icon} fill={basic} />
            <Text appearance='hint' category='s2' numberOfLines={1}>{children}</Text>
        </View>
    )
}

export default ModalStatusRow

const styles = StyleSheet.create({
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 6
    }
})