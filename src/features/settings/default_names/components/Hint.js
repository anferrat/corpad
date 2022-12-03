import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { basic } from '../../../../styles/colors'

const Hint = (props) => {
    return (
        <Text appearance='hint' category='s2'>
            <Icon name='alert-circle-outline' style={styles.textIcon} fill={basic} />{props.text}</Text>
    )
}
export default React.memo(Hint)

const styles = StyleSheet.create({
    textIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    }
})