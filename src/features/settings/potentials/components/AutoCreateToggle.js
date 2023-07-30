import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Toggle } from "@ui-kitten/components"
import { androidRipple } from '../../../../styles/styles'
import Pressable from "../../../../components/Pressable"

const AutoCreateToggle = ({ toggleAutoCreate, autoCreate }) => {

    const updateAutoCreate = () => toggleAutoCreate(!autoCreate)

    return (
        <Pressable
            style={styles.mainView}
            android_ripple={androidRipple}
            onPress={updateAutoCreate}>
            <View style={styles.titleView}>
                <Text category='p1'>
                    Auto-create potentials
                </Text>
                <Text
                    category='s2'
                    appearance='hint'
                    style={styles.subtitle}>
                    New readings will have ON/OFF potential fields added upon creation
                </Text>
            </View>
            <Toggle
                status={'primary'}
                onChange={toggleAutoCreate}
                checked={autoCreate} />
        </Pressable>
    )
}

export default React.memo(AutoCreateToggle)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    subtitle: {
        flexShrink: 1
    },
    titleView: {
        flex: 1,
        paddingRight: 36
    },
    hidden: {
        display: "none"
    }
})