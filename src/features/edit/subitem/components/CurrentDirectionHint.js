import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { Pressable, StyleSheet, View } from 'react-native'
import { basic } from '../../../../styles/colors'

const CurrentDirectionHint = ({ shorted, fromAtoB, update }) => {

    const updateDirection = () => update(!fromAtoB, 'fromAtoB')

    if (shorted || shorted === undefined)
        return <View style={styles.mainView}>
            <Icon
                name='alert-circle-outline'
                fill={basic}
                style={styles.icon} />
            <Text appearance='hint' category='label'>
                Current travels {fromAtoB ? 'from side A to side B' : 'from side B to side A'}. </Text>
            <Pressable
                onPress={updateDirection}>
                <Text
                    status='primary'
                    category='label'
                    style={styles.link}>
                    Change
                </Text>
            </Pressable>
        </View>
    else return null
}
export default React.memo(CurrentDirectionHint)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingTop: 6
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 6
    },
    link: {
        textDecorationLine: 'underline'
    }
})