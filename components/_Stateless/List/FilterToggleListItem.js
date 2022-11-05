import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { androidRipple } from '../../../styles/GlobalStyle'
import { Text } from '@ui-kitten/components'


const FilterToggleListItem = (props) => {
    return (
            <Pressable style={styles.listItem} android_ripple={androidRipple} disabled={props.disabled}>
                <Text category='p2'>{props.title}</Text>
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