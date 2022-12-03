
import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic200, primary, success } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'

const OptionCard = (props) => {
    return (
        <Pressable style={{ ...styles.mainView, backgroundColor: props.selected ? basic200 : '#fff' }} android_ripple={androidRipple} onPress={props.onPress.bind(this, props.isCloudValue)} disabled={props.disabled}>
            <View style={styles.topRow}>
                {props.selected ?
                    <Icon name={'checkmark-circle-2'} style={styles.checkIcon} fill={success} />
                    : null}
            </View>

            <Icon name={props.icon} pack={props.pack} style={styles.icon} fill={props.selected ? primary : basic} />
            <Text category={'h6'} appearance={props.disabled ? 'hint' : 'default'}>{props.title}</Text>
            {props.hint ? <Text appearance={'hint'} category='s2'>{props.hint}</Text> : null}
            <Text category={'s2'} appearance='hint' style={styles.subtitle}>{props.subtitle}</Text>
        </Pressable>
    )
}

export default React.memo(OptionCard)

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginHorizontal: 8,
        elevation: 5,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 6
    },
    checkIcon: {
        width: 20,
        height: 20
    },
    topRow: {
        width: '100%',
        position: 'absolute',
        top: 6,
        right: 6,
        alignItems: 'flex-end'
    },
    subtitle: {
        marginTop: 12,
        textAlign: 'center'
    }
})