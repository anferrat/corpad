import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { displayCard } from './styles/displayCardStyles'

const DataRow = ({ value, pack, icon, fill }) => {
    if (value === null)
        return null
    else
        return (
            <View style={styles.container}>
                <Icon
                    style={styles.icon}
                    pack={pack}
                    name={icon}
                    fill={fill} />
                <Text
                    appearance='hint'
                    catgory='p2'
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {value}
                </Text>
            </View>
        )
}


export default React.memo(DataRow)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {

    }
})
