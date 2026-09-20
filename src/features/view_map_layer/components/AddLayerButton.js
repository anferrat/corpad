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
                <View>
                    <Text
                        style={styles.mainText}
                        category='p1'
                        status='primary'>
                        {translateMapLayer('addMapLayer')}
                    </Text>
                    <Text appearance='hint' category='s2'>
                        {translateMapLayer('supportedFormats')}
                    </Text>
                </View>
                : translateMapLayer('maxLimitReached')) : translateMapLayer('upgradePremium')}
        </Button>
    )
}

export default AddLayerButton

const styles = StyleSheet.create({
    button: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mainText: {
        fontWeight: 'bold',
    }
})
