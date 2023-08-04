import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic300, control, primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const OpenInButton = (props) => {
    const isAndroid = Platform.OS === 'android'
    return <View style={styles.wrapper} >
        <Pressable
            style={styles.pressable}
            android_ripple={androidRipple}
            onPress={props.onPress}
            disabled={props.disabled}>
            <Icon
                name={isAndroid ? 'share' : 'share-ios'}
                pack={isAndroid ? null : 'cp'}
                style={styles.icon}
                fill={primary} />
            <Text 
            category='s2'>
                Open in <Text status='primary' category='s2'>Maps</Text></Text>
        </Pressable>
    </View >
}

export default React.memo(OpenInButton)

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        borderRadius: 15,
        elevation: 5,
        backgroundColor: control,
        borderWidth: 1,
        borderColor: basic300
    },
    pressable: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12,
        marginBottom: 3
    },
    primary: {
        borderWidth: 0,
        backgroundColor: primary,
    },
})