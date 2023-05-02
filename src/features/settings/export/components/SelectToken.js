import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, basic300, control, primary } from '../../../../styles/colors'

const SelectToken = ({ onPress, selected, title, icon, pack }) => {
    return (
        <Pressable
            onPress={onPress}
            style={selected ? styles.containerSelected : styles.container}>
            <View
                style={styles.row}>
                <Icon
                    name={icon}
                    pack={pack}
                    style={styles.icon}
                    fill={selected ? control : basic} />
                <Text
                    category='p2'
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    status={selected ? 'control' : 'basic'}>
                    {title}
                </Text>
            </View>
        </Pressable>
    )
}

export default SelectToken

const containerStyles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: control,
        borderWidth: 1,
        borderColor: basic300,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingRight: 18,
        marginHorizontal: 2,
        marginBottom: 12,
        elevation: 2
    }
})

const styles = StyleSheet.create({
    container: StyleSheet.compose(containerStyles.container),
    containerSelected: StyleSheet.compose(containerStyles.container,
        {
            backgroundColor: primary
        }),

    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    row: {
        flexDirection: 'row'
    }
})

