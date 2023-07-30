import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, basic300, control, primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const SelectToken = ({ onPress, selected, title, icon, pack }) => {
    return (
        <Pressable
            android_ripple={androidRipple}
            onPress={onPress}
            style={selected ? selectedContainerStyle : styles.container}>
            <View
                style={styles.row}>
                <Icon
                    name={icon}
                    pack={pack}
                    style={styles.icon}
                    fill={selected ? control : basic} />
                <Text
                    style={styles.text}
                    category='p1'
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

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: control,
        borderWidth: 1,
        borderColor: basic300,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingRight: 12,
        marginHorizontal: 4,
        marginBottom: 12,
        elevation: 2,
        maxWidth: '30%',
        flex: 1,
    },
    selected: {
        backgroundColor: primary
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    },
    text: {
        textAlign: 'center'
    }
})

const selectedContainerStyle = StyleSheet.compose(styles.container, styles.selected)

