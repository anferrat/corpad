
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../../../styles/colors'


const Display = ({ property, icon, pack, children }) => {
    return (
        <View style={styles.container}>
            <View
                style={styles.innerContainer}>
                <View style={styles.propertyView}>
                    {icon ?
                        <Icon
                            fill={basic}
                            style={styles.icon}
                            name={icon}
                            pack={pack} /> : null}
                    <Text
                        appearance='hint'
                        style={styles.propertyText}
                        category='label'>
                        {property}
                    </Text>
                </View>
            </View>
            <View
                style={styles.innerContainer}>
                {children}
            </View>
        </View>
    )
}

export default Display

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginLeft: 12
    },
    icon: {
        width: 20,
        height: 20
    },
    propertyView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1
    },
    propertyText: {
        textTransform: 'uppercase'
    }
})