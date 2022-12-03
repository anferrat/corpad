import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { basic, primary } from '../../../../styles/colors'
import { Icon, Divider } from '@ui-kitten/components'
import { androidRipple } from '../../../../styles/styles'


const FilterListItem = (props) => {
    return (
        <>
            <Pressable
                onPress={props.onPress.bind(this, props.value)}
                style={styles.listItem}
                android_ripple={androidRipple}
                disabled={props.disabled}>
                <View style={styles.leftSide}>
                    <Icon name='funnel-outline' style={styles.iconLeft} fill={primary} />
                    {props.title}
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
    listItemText: {

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