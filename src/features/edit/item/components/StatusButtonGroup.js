import React from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { getStatusProps } from '../../../../helpers/functions'

const renderIcon = (icon) => (props) => <Icon {...props} name={icon} />

const StatusButtonGroup = (props) => {
    const renderStatusBar = (status) => [0, 1, 2].map(index =>
        <Button
            key={'StatusButtonGroup-' + index}
            accessoryLeft={status === index ? renderIcon(getStatusProps(status).icon) : ''}
            status={status === index ? getStatusProps(status).status : 'basic'}
            style={status === index ? styles.buttonActive : styles.buttonInactive}
            onPress={props.onPress.bind(this, status, index)}>
            {(props) => <Text {...props} category='s2'>{getStatusProps(index).title}</Text>}
        </Button>)

    return <View
        style={styles.view}>
        {renderStatusBar(props.status)}
    </View>
}

export default StatusButtonGroup

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
        borderWidth: 0,
        borderRadius: 0
    },
    buttonInactive: {
        width: '34%',
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: '#FFF'
    },
})