import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'

const IconTitle = (props) => {
    return <View style={styles.mainView}>
        <Icon pack={props.pack} name={props.icon} style={styles.icon} fill={primary} />
        <Text category='s1' style={styles.title} status='primary'>{props.title}</Text>
    </View>
}

const ReadingTitle = (props) => {
    switch (props.dataType) {
        case 'TEST_POINT':
            switch (props.reading) {
                case 0:
                    return <>
                        <IconTitle pack='cp' icon='On' title='ON' />
                        <IconTitle pack='cp' icon='Off' title='OFF' />
                    </>
                case 1:
                    return <>
                        <IconTitle pack='cp' icon='Off' title='OFF' />
                        <IconTitle pack='cp' icon='Depol' title='Native' />
                    </>
                case 2:
                    return <IconTitle icon='flash-outline' title='Current' />
                case 3:
                    return <IconTitle icon='keypad-outline' title='Current density' />
                case 4:
                    return <IconTitle icon='flash-outline' title='Shorting current' />
            }
        case 'RECTIFIER':
            switch (props.reading) {
                case 0:
                    return <>
                        <IconTitle icon='flash-outline' title='Amps' />
                        <IconTitle pack='cp' icon='voltage' title='Volts' />
                    </>
                case 1:
                    return <>
                        <IconTitle icon='diagonal-arrow-right-up-outline' title='Max.' />
                        <IconTitle icon='diagonal-arrow-right-down-outline' title='Min.' />
                    </>
                case 2:
                    return <IconTitle icon='trending-up-outline' title='Current target' />
            }
        default: return null
    }
}

export default ReadingTitle



const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
    },
    icon: {
        width: 17,
        height: 17,
        marginRight: 6,
    },
    title: {
        fontWeight: 'bold'
    }
})