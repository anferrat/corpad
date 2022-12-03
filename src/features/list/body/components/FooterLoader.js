import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'

const FooterLoader = (props) => {
    if (props.count === 0)
        return null
    else
        return (
            <View style={styles.main}>
                {props.loadingMore ? <ActivityIndicator color={primary} size='large' /> : (!props.refreshing ? <Text style={styles.textStyle} appearance='hint' category='s1'>Total: {props.count}</Text> : null)}
            </View>
        )
}

export default FooterLoader

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 8
    },
    textStyle: {
        alignSelf: 'flex-end',
    }
})