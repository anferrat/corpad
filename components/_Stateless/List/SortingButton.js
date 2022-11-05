import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary, androidRipple } from '../../../styles/GlobalStyle'

const SortingButton = (props) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={props.onPress}
            android_ripple={androidRipple}>
            <Text style={styles.buttonText} status='primary' category='p2'>Sort:</Text>
            {props.iconText !== null ? <Text style={styles.iconText} status='primary' category='p2'>{props.iconText}</Text> : null}
            {props.icon !== null ? <Icon name={props.icon} fill={primary} style={styles.icon} /> : null}
            <Icon name={'arrow-' + props.direction} pack={'cp'} fill={primary} style={styles.arrow} />
        </Pressable>
    )
}

export default SortingButton

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        paddingRight: 6,
    },
    iconText: {
        fontWeight: 'bold',
        paddingRight: 3
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 3,
    },
    arrow: {
        width: 9,
        height: 18
    },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12
    }
})