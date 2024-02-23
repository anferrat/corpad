import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { primary } from '../../../styles/colors'

const IconLine = ({ label, pack, icon }) => {
    const isEmpty = !Boolean(label)
    if (isEmpty)
        return null
    else
        return (
            <View
                style={styles.mainView}>
                <Icon
                    name={icon ?? 'question-mark-circle-outline'}
                    style={styles.icon}
                    fill={primary}
                    pack={pack} />
                <Text
                    category='s1'
                    numberOfLines={20}
                    style={styles.text}>{label}</Text>
            </View>
        )
}

export default React.memo(IconLine)

const styles = StyleSheet.create({
    mainView: {
        paddingVertical: 4,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        flexShrink: 1,
    }
})