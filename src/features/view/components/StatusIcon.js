import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { StyleSheet, View, Pressable } from 'react-native'
import { hapticMedium } from '../../../native_libs/haptics'
import { basic, control } from '../../../styles/colors'
import { StatusColors } from '../../../styles/colors'
import { ItemStatuses } from '../../../constants/global'
import { StatusLabels } from '../../../constants/labels'
import { StatusIcons } from '../../../constants/icons'

//Order in which statuses replace one another, runs in circle
const StatusOrder = [ItemStatuses.GOOD, ItemStatuses.ATTENTION, ItemStatuses.BAD]

const StatusIcon = ({ updateStatus, status }) => {

    const orderIndex = Object.values(StatusOrder).indexOf(status)
    const displayedStatus = ~orderIndex ? status : ItemStatuses.UNKNOWN

    const toggleStatus = () => {
        const nextOrderIndex = orderIndex + 1 >= StatusOrder.length ? 0 : orderIndex + 1
        updateStatus(StatusOrder[nextOrderIndex])
    }

    const resetStatus = React.useCallback(() => {
        updateStatus(ItemStatuses.UNKNOWN)
        hapticMedium()
    }, [])

    return (
        <View style={styles.outerView}>
            <Pressable
                style={{ ...styles.button, backgroundColor: StatusColors[displayedStatus] }}
                onLongPress={resetStatus}
                onPress={toggleStatus}>
                <Icon
                    style={styles.icon}
                    fill={control}
                    name={StatusIcons[displayedStatus] ?? 'question-mark-outline'} />
                <Text
                    status='control'
                    category='s2'>
                    {StatusLabels[displayedStatus]}
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
        marginRight: 8
    },
    text: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold'
    }
})