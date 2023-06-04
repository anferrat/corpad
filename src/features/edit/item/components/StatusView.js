import React from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { ItemStatuses } from '../../../../constants/global'
import { StatusIcons } from '../../../../constants/icons'
import { StatusLabels } from '../../../../constants/labels'

const renderIcon = (icon) => (props) => <Icon {...props} name={icon} />

const renderText = (text) => (props) => <Text {...props} numberOfLines={1} ellipsizeMode={'tail'}>{text}</Text>

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
        <View style={styles.view}>
            {statusButtons.map((s) => {
                const selected = s === status
                return <Button
                    key={s}
                    accessoryLeft={selected ? renderIcon(StatusIcons[s]) : null}
                    status={selected ? statuses[s] : 'basic'}
                    style={selected ? styles.buttonActive : styles.buttonInactive}
                    onPress={onPress.bind(this, s)}>
                    {renderText(StatusLabels[s])}
                </Button>
            })}
        </View>
    )}

    export default React.memo(StatusView)

    const styles = StyleSheet.create({
        view: {
            flex: 1,
            marginHorizontal: 6,
            marginTop: 12,
            borderWidth: 0,
            elevation: 5,
            borderRadius: 6,
            overflow: 'hidden',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        buttonActive: {
            width: '34%',
            height: 45,
            borderWidth: 0,
            borderRadius: 0,
        },
        buttonInactive: {
            width: '34%',
            height: 45,
            borderWidth: 0,
            borderRadius: 0,
            backgroundColor: '#FFF'
        },
    })