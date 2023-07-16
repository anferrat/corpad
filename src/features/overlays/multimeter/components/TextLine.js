import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { control, primary } from '../../../../styles/colors'


const TextLine = ({ icon, pack, title, value }) => {
    return (
        <View
            style={styles.container}>
            <View style={styles.label}>
                {icon ? <Icon
                    style={styles.icon}
                    name={icon}
                    pack={pack}
                    fill={primary} /> : null}
                <Text

                    status='primary'>
                    {title}
                </Text>
            </View>
            <Text
                style={styles.text}>{value}</Text>
        </View>
    )
}

export default React.memo(TextLine)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 24,
    },
    text: {
        fontWeight: 'bold'
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    }
})