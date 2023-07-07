import React, { useCallback } from "react"
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic300, primary } from '../../../../../styles/colors'
import { androidRipple } from "../../../../../styles/styles"
import { MultimeterTypeLabels } from "../../../../../constants/labels"


const MultimeterListItem = ({ id, name, type, pair, pairing }) => {
    const onPress = useCallback(() => {
        pair(id, name, type)
    }, [id, name, type, pair])
    return (
        <Pressable
            onPress={onPress}
            style={styles.mainView}
            android_ripple={androidRipple}>
            <View style={styles.titleView}>
                <Icon
                    name='bluetooth'
                    fill={primary}
                    style={styles.icon} />
                <View>
                    <Text
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