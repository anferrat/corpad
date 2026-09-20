import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { warning } from '../../../../styles/colors'
import { translateOverlay } from '../../../../localization'


const MultimeterLimitWarning = ({ value }) => {
    return (
        <View
            style={styles.container}>
            <Icon
                name='alert-triangle'
                fill={warning}
                style={styles.icon} />
            <Text
                category='label'
                status='warning'
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.text}>{translateOverlay('toast.max')} {value}</Text>
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
        alignSelf: 'flex-start',
        minWidth: 120,
        maxWidth: '100%',
        paddingHorizontal: 12,
        height: 30,
        borderWidth: 1,
        borderColor: warning,
        borderRadius: 15,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        flexShrink: 1
    }
})
