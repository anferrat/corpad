import { Text, Divider, Icon } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { labels } from '../../../../../constants/constants'
import { basic } from '../../../../../styles/colors'


const SubitemTitle = ({ subitemType }) => {
    const name = labels[subitemType].label

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Icon
                    pack='cp'
                    name={subitemType}
                    style={styles.icon}
                    fill={basic} />
                <Text
                    category='h6'
                    style={styles.text}>
                    {name}
                </Text>
            </View>
            <Divider />
        </View>
    )
}

export default SubitemTitle

const styles = StyleSheet.create({
    container: {
        marginBottom: 12
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        textTransform: 'uppercase',
        textAlignVertical: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    },
    title: {
        flexDirection: 'row',
       // alignItems: 'center',
    }
})