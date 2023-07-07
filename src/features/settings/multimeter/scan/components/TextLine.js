import { Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'


const TextLine = ({ title, value, icon, pack, fill }) => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
                category='p1'
                appearance='hint'>
                {title}
            </Text>
            <View
                style={styles.value}>
                {icon ?
                    <Icon
                        style={styles.icon}
                        name={icon}
                        pack={pack}
                        fill={fill} /> : null}
                <Text>
                    {value}
                </Text>
            </View>
        </View>
    )
}

export default TextLine

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    },
    value: {
        flexDirection: 'row',
    },
    title: {
        textTransform: 'uppercase'
    }
})