import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const SortingButton = ({ isIcon, value, arrowIcon, onPress }) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={onPress}
            android_ripple={androidRipple}>
            <Text style={styles.buttonText}
                status='primary'
                category='s1'>Sort:</Text>
            {!isIcon ?
                <Text
                    style={styles.iconText}
                    status='primary'
                    category='p2'>
                    {value}
                </Text> :
                <Icon
                    name={value}
                    fill={primary}
                    style={styles.icon} />
            }
            <Icon
                name={arrowIcon}
                pack={'cp'}
                fill={primary}
                style={styles.arrow} />
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