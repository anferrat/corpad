import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../../styles/colors'

const PropertyElement = ({ children, icon, pack }) => {
    return (
        <View style={styles.container}>
            {icon ?
                <Icon
                    fill={basic}
                    style={styles.icon}
                    name={icon}
                    pack={pack} />
                : null}
            <Text
                category='s2'>
                {children}
            </Text>
        </View>
    )
}

export default PropertyElement

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 6
    }
})