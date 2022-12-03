import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Text, Toggle } from "@ui-kitten/components"
import { androidRipple } from '../../../../styles/styles'

const SettingToggle = (props) => {

    const onChange = React.useCallback((isChecked) => {
        props.setChecked(isChecked)
    }, [props.setChecked])

    return (
        <Pressable style={props.hidden ? styles.hidden : styles.mainView} android_ripple={androidRipple} onPress={onChange.bind(this, !props.checked)}>
            <View style={styles.titleView}>
                <Text category='p1'>{props.title}</Text>
                <Text category='s2' appearance='hint' style={styles.subtitle}>{props.subtitle}</Text>
            </View>
            <Toggle
                status={'primary'}
                onChange={onChange}
                checked={props.checked} />
        </Pressable>
    )
}

export default SettingToggle

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        paddingLeft: 48,
        paddingRight: 24
    },
    subtitle: {
        flexShrink: 1
    },
    titleView: {
        flex: 1,
        paddingRight: 24
    },
    hidden: {
        display: "none"
    }
})