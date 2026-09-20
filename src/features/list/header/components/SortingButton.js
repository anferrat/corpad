import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'
import { translateList } from '../../../../localization'

const SortingButton = ({ isIcon, value, arrowIcon, onPress }) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={onPress}
            android_ripple={androidRipple}>
            <Text style={styles.buttonText}
                status='primary'
                category='s1'
                numberOfLines={2}
                ellipsizeMode='tail'>{translateList('sort')}</Text>
            {!isIcon ?
                <Text
                    style={styles.iconText}
                    status='primary'
                    category='p2'
                    numberOfLines={2}
                    ellipsizeMode='tail'>
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
        textAlign: 'center',
    },
    iconText: {
        fontWeight: 'bold',
        paddingRight: 3,
        flexShrink: 1,
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
        paddingHorizontal: 6,
        paddingVertical: 0,
    }
})
