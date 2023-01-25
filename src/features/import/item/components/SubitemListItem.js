import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { Layout, Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import { getSubitemName } from '../helpers/functions'

const SubitemListItem = ({ onPress, index, type, typedIndex }) => {
    return (
        <Layout style={styles.card}>
            <Pressable
                style={styles.pressable}
                onPress={onPress.bind(this, index, type)}
                android_ripple={androidRipple}>
                <Layout style={styles.leftSide}>
                    <Icon name={type} pack={'cp'} style={styles.icon} fill={basic} />
                    <Layout style={styles.textView}>
                        <Text category='p1'>{getSubitemName(type, typedIndex)}</Text>
                        <Text category='s2' appearance='hint'>{'Import settings'}</Text>
                    </Layout>
                </Layout>
                <Icon name='arrow-ios-forward-outline' style={styles.icon} fill={basic} />
            </Pressable>
        </Layout>
    )
}

export default React.memo(SubitemListItem)

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        borderWidth: 0,
        margin: 6,
        elevation: 5,
    },
    pressable: {
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        marginHorizontal: 12,
        width: 25,
        height: 25,
    },
    leftSide: {
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textView: {
        backgroundColor: 'rgba(0,0,0,0)'
    }
})