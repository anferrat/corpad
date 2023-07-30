import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Layout, Icon, Text } from '@ui-kitten/components'
import { basic, basic300 } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import { getSubitemName } from '../helpers/functions'
import Pressable from '../../../../components/Pressable'

const SubitemListItem = ({ onPress, index, type, typedIndex }) => {
    return (
        <Layout style={cardStyle}>
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
    },
    cardPlatformSpecific: Platform.select({
        android: {
            elevation: 5
        },
        default: {
            borderWidth: 1,
            bordercolor: basic300
        }
    }),
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

const cardStyle = StyleSheet.compose(styles.card, styles.cardPlatformSpecific)