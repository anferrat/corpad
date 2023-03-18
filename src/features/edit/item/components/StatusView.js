import React from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { statusInfo } from '../../../../constants/constants'

const renderIcon = (icon) => (props) => <Icon {...props} name={icon} />

const renderText = (text) => (props) => <Text {...props} category='c2'>{text}</Text>

const unknownStatus = 3

const statusButtons = statusInfo.filter((_, index) => index !== unknownStatus)

const StatusView = ({ update, status }) => {
    const onPress = (index) => {
        update(index === status ? unknownStatus : index, 'status')
    }

    const renderStatusBar = (status) => statusButtons.map((info, index) => {
        const selected = index === status
        return <Button
            key={'StatusButtonGroup-' + index}
            accessoryLeft={selected ? renderIcon(info.icon) : null}
            status={selected ? info.status : 'basic'}
            style={selected ? styles.buttonActive : styles.buttonInactive}
            onPress={onPress.bind(this, index)}>
            {renderText(info.title)}
        </Button>
    })

    return (
        <View style={styles.view}>
            {renderStatusBar(status)}
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
        borderRadius: 0
    },
    buttonInactive: {
        width: '34%',
        height: 45,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: '#FFF'
    },
})