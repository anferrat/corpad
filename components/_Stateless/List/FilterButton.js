import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary, basic200 } from '../../../styles/GlobalStyle'

const FilterButton = (props) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={props.onPress}
            android_ripple={{ color: basic200 }}>
                <Text style={styles.buttonText} status='primary' category='p2'>{props.title}</Text>
                <Icon name={props.icon} pack={props.pack} fill={primary} style={styles.icon} />
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