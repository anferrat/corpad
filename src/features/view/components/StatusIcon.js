import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { StyleSheet, View, Pressable } from 'react-native'
import { hapticMedium } from '../../../native_libs/haptics'
import { statusInfo } from '../../../constants/constants'
import { basic, control, success, danger, warning } from '../../../styles/colors'

const backgroundColors = {
    basic: basic,
    success: success,
    warning: warning,
    danger: danger
}

const StatusIcon = ({ updateStatus, status }) => {
    const statusIndex = statusInfo[status] ? status : 3
    const { title, icon } = statusInfo[statusIndex]
    const statusValue = statusInfo[statusIndex].status

    const toggleStatus = () => {
        const nextIndex = statusIndex + 1
        const newIndex = statusInfo[nextIndex] && nextIndex !== 3 ? nextIndex : 0
        updateStatus(newIndex)
    }

    const resetStatus = React.useCallback(() => {
        updateStatus(3)
        hapticMedium()
    }, [])


    const renderIcon = (props) => (
        <Icon {...props} name={icon ?? 'question-mark-outline'} />)

    return (
        <View style={styles.outerView}>
            <Pressable
                style={{ ...styles.button, backgroundColor: backgroundColors[statusValue] }}
                size='small'
                status={statusValue}
                accessoryLeft={renderIcon}
                onLongPress={resetStatus}
                onPress={toggleStatus}>
                <Icon
                    style={styles.icon}
                    fill={control}
                    name={icon ?? 'question-mark-outline'} />
                <Text
                    status='control'
                    category='label'>
                    {title}
                </Text>
            </Pressable>
        </View>
    )
}

export default React.memo(StatusIcon)

const styles = StyleSheet.create({
    outerView: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        flexBasis: 100,
        marginTop: 4,
    },
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    basicButton: {
        backgroundColor: basic,
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    text: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold'
    }
})