import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, Pressable } from 'react-native'
import { primary } from '../../../styles/colors'
import { copyToClipboard } from '../../../native_libs/clipboard'

const IconLine = ({ value, pack, icon }) => {
    const isEmpty = value === '' || value === null || value === undefined

    const clipboardHandler = React.useCallback(() => copyToClipboard(value, true), [value])

    if (isEmpty)
        return null
    else
        return (
            <Pressable
                style={styles.mainView}
                onLongPress={clipboardHandler}>
                <Icon
                    name={icon ?? 'question-mark-circle-outline'}
                    style={styles.icon}
                    fill={primary}
                    pack={pack} />
                <Text
                    category='p2'
                    numberOfLines={20}
                    style={styles.text}>{value}</Text>
            </Pressable>
        )
}

export default React.memo(IconLine)

const styles = StyleSheet.create({
    mainView: {
        paddingVertical: 4,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    },
    text: {
        flexShrink: 1,
    }
})