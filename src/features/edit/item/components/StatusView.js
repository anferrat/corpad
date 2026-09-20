import React from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { Platform, StyleSheet, View } from 'react-native'
import { ItemStatuses } from '../../../../constants/global'
import { StatusIcons } from '../../../../constants/icons'
import { StatusLabels } from '../../../../constants/labels'
import { basic300, control } from '../../../../styles/colors'

const renderContent = (text, icon) => (props) => (
    <View style={styles.content}>
        {icon ? <Icon
            name={icon}
            fill={control}
            style={styles.icon} /> : null}
        <Text
            {...props}
            style={[props.style, styles.text]}
            numberOfLines={1}
            ellipsizeMode='tail'>
            {text}
        </Text>
    </View>
)

const statuses = Object.freeze({
    [ItemStatuses.GOOD]: 'success',
    [ItemStatuses.ATTENTION]: 'warning',
    [ItemStatuses.BAD]: 'danger',
    [ItemStatuses.UNKNOWN]: 'basic',
    [ItemStatuses.NO_STATUS]: 'basic'
})

const statusButtons = Object.values(ItemStatuses).filter(status => status !== ItemStatuses.UNKNOWN && status !== ItemStatuses.NO_STATUS)

const StatusView = ({ update, status }) => {
    const onPress = (s) => {
        update(s === status ? ItemStatuses.UNKNOWN : s, 'status')
    }

    return (
        <View style={containerStyle}>
            {statusButtons.map((s) => {
                const selected = s === status
                return <Button
                    key={s}
                    status={selected ? statuses[s] : 'basic'}
                    style={selected ? styles.button : buttonInactiveStyle}
                    onPress={onPress.bind(this, s)}>
                    {renderContent(StatusLabels[s], selected ? StatusIcons[s] : null)}
                </Button>
            })}
        </View>
    )
}

export default React.memo(StatusView)

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginHorizontal: 6,
        marginTop: 12,
        borderWidth: 0,
        borderRadius: 6,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewPlatformSpecific: Platform.select({
        android: {
            elevation: 5
        },
        default: {
            borderWidth: 1,
            borderColor: basic300
        }
    }),
    button: {
        width: '34%',
        height: 45,
        borderWidth: 0,
        borderRadius: 0,
        paddingHorizontal: 6,
    },
    content: {
        width: '100%',
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 6,
    },
    text: {
        flexShrink: 1,
    },
    inactive: {
        backgroundColor: '#FFF'
    },
})

const containerStyle = StyleSheet.compose(styles.view, styles.viewPlatformSpecific)

const buttonInactiveStyle = StyleSheet.compose(styles.button, styles.inactive)
