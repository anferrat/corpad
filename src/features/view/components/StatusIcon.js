import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { Pressable, StyleSheet, View } from 'react-native'
import { basic } from '../../../styles/colors'
import { hapticMedium } from '../../../native_libs/haptics'
import { getStatusProps } from '../../../helpers/functions'
import { statusInfo } from '../../../constants/constants'

const StatusIcon = (props) => {
    const changeStatus = React.useCallback((status) => {
        const statusIndex = statusInfo?.findIndex((_, index) => status === index)
        const newStatusIndex = statusIndex === -1 ? 0 : statusIndex + 1 > statusInfo.length - 2 ? 0 : statusIndex + 1
        props.updateStatus(newStatusIndex)
    }, [])

    const longPressHandler = React.useCallback(() => {
        props.updateStatus(3)
        hapticMedium()
    }, [])
    return (
        <View style={styles.outerView}>
            <Pressable onLongPress={longPressHandler} onPress={changeStatus.bind(this, props.status)} >
                <View
                    style={{ ...styles.innerView, backgroundColor: getStatusProps(props.status).color }}>
                    <Icon name={getStatusProps(props.status).icon} fill='#FFF' style={styles.icon} />
                    <Text style={styles.text} category='label'>{getStatusProps(props.status).title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default StatusIcon

const styles = StyleSheet.create({
    outerView: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        flexBasis: 90,
        marginTop: 4,
    },
    innerView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        borderColor: basic,
    },
    icon: {
        width: 15,
        height: 15
    },
    text: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold'
    }
})