import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { control, warning } from '../../../../styles/colors'
import { translateMultimeterOverlay } from '../../../../localization'


const MultimeterLimitWarning = ({ value }) => {
    return (
        <View
            style={styles.container}>
            <Icon
                name='alert-triangle'
                fill={control}
                style={styles.icon} />
            <Text
                category='label'
                status='control'
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.text}>{translateMultimeterOverlay('max')} {value}</Text>
        </View>
    )
}


export default MultimeterLimitWarning

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 150,
        maxWidth: '100%',
        paddingHorizontal: 12,
        height: 40,
        borderWidth: 0,
        borderColor: warning,
        backgroundColor: warning,
        borderRadius: 15,
        alignSelf: 'flex-end',
        marginHorizontal: 12
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
