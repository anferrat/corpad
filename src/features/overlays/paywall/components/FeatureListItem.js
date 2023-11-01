import { Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { basic1000, control, primary, primary700 } from '../../../../styles/colors'


const FeatureListItem = ({ title, icon, color, pack, description }) => {
    return (
        <View style={styles.container}>
            <View
                style={styles.iconViewContainer}>
                <View style={{ ...styles.iconView, backgroundColor: color, padding: 12 }}>
                    <Icon
                        fill={primary700}
                        style={styles.icon}
                        name={icon}
                        pack={pack} />
                </View>
            </View>
            <View
                style={styles.textContainer}>
                <Text
                    style={styles.title}
                    category='h6'>
                    {title}
                </Text>
                <Text
                    category='s2'
                    appearance='hint'>
                    {description}
                </Text>
            </View>
        </View>
    )
}

export default FeatureListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    iconView: {
        borderRadius: 15,
        marginRight: 12
    },
    icon: {
        width: 25,
        height: 25
    },
    iconViewContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontSize: 16
    }
})