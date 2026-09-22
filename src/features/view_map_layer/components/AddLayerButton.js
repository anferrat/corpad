import { Button, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { plus, star } from '../../../components/Icons'
import { translateMapLayer } from '../../../localization'


const AddLayerButton = ({ onPress, inactive, isPro }) => {
    return (
        <Button
            disabled={inactive}
            accessoryLeft={isPro ? (inactive ? null : plus) : star}
            style={styles.button}
            onPress={onPress}
            appearance='ghost'>
            {isPro ? (!inactive ?
                evaProps => (
                    <View style={[evaProps.style, styles.content]}>
                        <Text
                            style={[styles.mainText, styles.text]}
                            numberOfLines={1} ellipsizeMode='tail'
                            category='p1'
                            status='primary'>
                            {translateMapLayer('addMapLayer')}
                        </Text>
                        <Text
                            style={styles.text}
                            appearance='hint'
                            category='s2'
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            {translateMapLayer('supportedFormats')}
                        </Text>
                    </View>
                )
                : translateMapLayer('maxLimitReached')) : translateMapLayer('upgradePremium')}
        </Button>
    )
}

export default AddLayerButton

const styles = StyleSheet.create({
    button: {
        height: 80,
        width: '100%',
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
    },
    text: {
        flexShrink: 1,
        minWidth: 0,
    },
    mainText: {
        fontWeight: 'bold',
    }
})
