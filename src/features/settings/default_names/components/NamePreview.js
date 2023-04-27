import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { labels } from '../../../../constants/constants'
import { basic, basic300 } from '../../../../styles/colors'

const index = Math.floor(Math.random() * 100) + 1

const NamePreview = ({ name, type, pipelineNameAsDefault, pipelineNameSettingActive }) => {
    const displayName = pipelineNameAsDefault && pipelineNameSettingActive ? '<PipelineName>' : (name === null ? `${index}` : `${name} ${index}`)

    return (
        <View
            style={styles.mainView}>
            <View
                style={styles.title}>
                <Text category='h6'>{displayName}</Text>
                <View
                    style={styles.subtitle}>
                    <Text category='s2' appearance='hint'>
                        {labels[type].label}
                    </Text>
                    <Icon
                        fill={basic}
                        pack='cp'
                        name={type}
                        style={styles.icon} />
                </View>
            </View>
        </View>
    )
}

export default React.memo(NamePreview)

const styles = StyleSheet.create({
    mainView: {
        marginTop: 32,
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: basic300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 8,
    },
    title: {
        flex: -1,
    },
    subtitle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})