import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'


const FilterToggleListItem = (props) => {
    return (
            <Pressable style={styles.listItem} android_ripple={androidRipple} disabled={props.disabled}>
                <Text category='s1' numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                {props.children}
            </Pressable>
    )
}
export default React.memo(FilterToggleListItem)

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        height: 60,
    }
})