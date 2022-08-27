import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { View, StyleSheet, Pressable } from 'react-native'
import { basic200, primary } from '../../styles/GlobalStyle'
import { copyToClipboard } from '../_nativeFeatures/clipboard'

const IconLine = (props) => {
    if (props.hideEmpty && (props.value === '' || props.value === null || props.value === undefined))
        return null
    else
        return <Pressable style={styles.mainView} android_ripple={{ color: basic200 }} onLongPress={copyToClipboard.bind(this, props.value, true)}>
            <Icon name={props?.icon ?? 'question-mark-circle-outline'}
                style={styles.icon}
                fill={primary}
                pack={props.pack} />
            <Text category='p2' numberOfLines={20} style={styles.text}>{props.value}</Text>
        </Pressable>
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