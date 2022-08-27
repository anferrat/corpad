import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { basic, basic200, primary } from '../../../styles/GlobalStyle'
import { Text, Icon, Divider } from '@ui-kitten/components'


const FilterListItem = (props) => {
    return (
        <>
            <Pressable
                onPress={props.onPress.bind(this, props.value)}
                style={styles.listItem}
                android_ripple={{ color: basic200 }}
                disabled={props.disabled}>
                <View style={styles.leftSide}>
                    <Icon name='layers' style={styles.iconLeft} fill={primary} />
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
        marginRight: 6
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