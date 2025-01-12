import React, { useCallback } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic300, primary } from '../../../../../styles/colors'
import { androidRipple } from "../../../../../styles/styles"
import { MultimeterTypeLabels } from "../../../../../constants/labels"
import Pressable from "../../../../../components/Pressable"


const MultimeterListItem = ({ id, name, type, onPress, pairing, disabled }) => {
    const onPressHandler = useCallback(() => {
        if (onPress)
            onPress(id, name, type)
    }, [id, name, type, onPress])
    return (
        <Pressable
            disabled={disabled}
            onPress={onPressHandler}
            style={styles.mainView}
            android_ripple={androidRipple}>
            <View style={styles.titleView}>
                <Icon
                    name='bluetooth'
                    fill={disabled ? basic : primary}
                    style={styles.icon} />
                <View>
                    <Text
                        appearance={disabled ? 'hint' : 'default'}
                        category='p1'>
                        {name}
                    </Text>
                    <Text
                        category='s2'
                        appearance='hint'>
                        {MultimeterTypeLabels[type]}
                    </Text>
                </View>
            </View>
            {pairing ?
                <ActivityIndicator color={primary} size={'small'} />
                : null}
        </Pressable>
    )
}

export default React.memo(MultimeterListItem)

const styles = StyleSheet.create({
    mainView: {
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 8,
        borderColor: basic300,
    },
    titleView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        marginRight: 12,
        marginLeft: 6,
        width: 25,
        height: 25
    }
})