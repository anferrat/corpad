import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, basic300 } from '../../../../styles/colors'
import { ItemTypeLabels, SubitemTypeLabels } from '../../../../constants/labels'

const index = Math.floor(Math.random() * 100) + 1

const NamePreview = ({ name, type, pipelineNameAsDefault, pipelineNameSettingActive }) => {
    const displayName = pipelineNameAsDefault && pipelineNameSettingActive ? '<PipelineName>' : (name === null ? `${index}` : `${name} ${index}`)

    return (
        <>
            <Text
                category='label'
                appearance='hint'
                style={styles.text}
            >Example</Text>
            <View
                style={styles.mainView}>
                <View
                    style={styles.title}>
                    <Text category='h6'>{displayName}</Text>
                    <View
                        style={styles.subtitle}>
                        <Text category='s2' appearance='hint'>
                            {ItemTypeLabels[type] ?? SubitemTypeLabels[type] ?? 'Error'}
                        </Text>
                        <Icon
                            fill={basic}
                            pack='cp'
                            name={type}
                            style={styles.icon} />
                    </View>
                </View>
            </View>
        </>
    )
}

export default React.memo(NamePreview)

const styles = StyleSheet.create({
    mainView: {
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
    text: {
        marginTop: 32,
        marginBottom: 6
    },
    subtitle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})