import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { warning } from '../../../../styles/colors'


const MultimeterLimitWarning = ({ value }) => {
    return (
        <View
            style={styles.container}>
            <Icon
                name='alert-triangle'
                fill={warning}
                style={styles.icon} />
                <Text category='label' status='warning'>Max. </Text>
                <Text category='label' status='warning'>{value}</Text>
            
        </View>
    )
}


export default MultimeterLimitWarning

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 30,
        borderWidth: 1,
        borderColor: warning,
        borderRadius: 15,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    }
})