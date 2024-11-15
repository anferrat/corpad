import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { basic, primary } from '../../../../styles/colors'
import { Icon, Divider, Text } from '@ui-kitten/components'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'


const FilterListItem = ({ title, onPress, routeKey, disabled, counter }) => {

    const onPressHandler = useCallback(() => onPress(routeKey), [onPress, routeKey])

    return (
        <>
            <Pressable
                onPress={onPressHandler}
                style={styles.listItem}
                android_ripple={androidRipple}
                disabled={disabled}>
                <View
                    style={styles.leftSide}>
                    <Icon
                        name='funnel-outline'
                        style={styles.iconLeft}
                        fill={primary} />
                    <Text
                        category='p1'>
                        {title}{counter !== 0 ? ` (${counter})` : ''}
                    </Text>
                </View>
                <Icon
                    name='arrow-ios-forward-outline'
                    style={styles.icon}
                    fill={basic} />
            </Pressable>
            <Divider />
        </>
    )
}
export default React.memo(FilterListItem)

const styles = StyleSheet.create({
    leftSide: {
        flexDirection: 'row'
    },
    icon: {
        width: 20,
        height: 20,
    },
    iconLeft: {
        width: 20,
        height: 20,
        marginRight: 12
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        height: 60,
    },
    title: {
        paddingLeft: 12,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 12,
        paddingVertical: 15,
        paddingTop: 25,
    }
})