import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'

const MappingHint = (props) => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={!props.visible ? styles.hidden : null}>
            <Pressable onPress={setVisible.bind(this, old => !old)} style={styles.pressable} android_ripple={androidRipple}>
                <Text status='primary' category='s2' style={styles.text}>How to map attributes?</Text>
                <Icon name={!visible ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} style={styles.icon} fill={primary} />
            </Pressable>
            <View style={visible ? styles.mainView : styles.hidden}>
                <Text appearance='hint' category='s2' style={styles.text}>1. Select data column you wish to use for this property.</Text>
                <Text appearance='hint' category='s2' style={styles.text}>2. Select property value.</Text>
                <Text appearance='hint' category='s2' style={styles.text}>3. Select one or more values from .csv file.  When importing, these values will be converted to corresponding property value.</Text>
            </View>
        </View>
    )
}

export default React.memo(MappingHint)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    text: {
        paddingVertical: 3
    },
    hidden: {
        display: 'none'
    },
    icon: {
        width: 18,
        height: 18,
        marginLeft: 6
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        borderRadius: 10,
        marginHorizontal: -12,
        paddingHorizontal: 12
    }
})