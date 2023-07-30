import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const FilterButton = (props) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={props.onPress}
            android_ripple={androidRipple}>
            <Text
                style={styles.buttonText}
                status='primary'
                category='s1'
                numberOfLines={1}
                ellipsizeMode={'head'}>
                {props.title}
            </Text>
            <Icon
                name={props.icon}
                pack={props.pack}
                fill={primary}
                style={styles.icon} />
        </Pressable>
    )
}

export default FilterButton

const styles = StyleSheet.create({
    buttonText: {
        paddingHorizontal: 6,
        fontWeight: 'bold',
    },
    icon: {
        width: 18,
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