import React from 'react'
import { Icon, Button } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { hapticMedium } from '../../../native_libs/haptics'
import { statusInfo } from '../../../constants/constants'


const StatusIcon = ({ updateStatus, status }) => {
    const { title, icon } = statusInfo[status]

    const toggleStatus = () => {
        const statusIndex = statusInfo?.findIndex((_, index) => status === index)
        const newStatusIndex = statusIndex === -1 ? 0 : statusIndex + 1 > statusInfo.length - 2 ? 0 : statusIndex + 1
        updateStatus(newStatusIndex)
    }

    const resetStatus = React.useCallback(() => {
        updateStatus(3)
        hapticMedium()
    }, [])


    const renderIcon = (props) => (
        <Icon {...props} name={icon ?? 'question-mark-outline'} />)

    return (
        <View style={styles.outerView}>
            <Button
                style={styles.button}
                size='small'
                status={statusInfo[status].status}
                accessoryLeft={renderIcon}
                onLongPress={resetStatus}
                onPress={toggleStatus}>
                {title}
            </Button>
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