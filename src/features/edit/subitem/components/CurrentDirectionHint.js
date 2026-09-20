import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { Pressable, StyleSheet, View } from 'react-native'
import { basic } from '../../../../styles/colors'
import { translateEdit } from '../../../../localization'

const CurrentDirectionHint = ({ shorted, fromAtoB, update }) => {

    const updateDirection = () => update(!fromAtoB, 'fromAtoB')

    if (shorted || shorted === undefined)
        return <View style={styles.mainView}>
            <Icon
                name='alert-circle-outline'
                fill={basic}
                style={styles.icon} />
            <Text style={styles.message} appearance='hint' category='label'>
                {translateEdit('currentTravels', { direction: translateEdit(fromAtoB ? 'fromSideAToSideB' : 'fromSideBToSideA') })} </Text>
            <Pressable
                style={styles.change}
                onPress={updateDirection}>
                <Text
                    status='primary'
                    category='label'
                    style={styles.link}>
                    {translateEdit('change')}
                </Text>
            </Pressable>
        </View>
    else return null
}
export default React.memo(CurrentDirectionHint)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 12,
        paddingTop: 6
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 6,
        marginTop: 2
    },
    message: {
        flex: 1
    },
    change: {
        flexShrink: 0,
        marginLeft: 4
    },
    link: {
        textDecorationLine: 'underline'
    }
})
