import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic300, primary } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'
import Pressable from "../../Pressable"


const PotentialListItem = (props) => {
    return (
        <Pressable style={styles.mainView} android_ripple={androidRipple} onPress={props.onPress}>
            <View style={styles.titleView}>
                <Icon name={props.icon} pack={props.pack} fill={primary} style={styles.icon} />
                <View>
                    <Text category='p1'>{props.title}</Text>
                    {props.subtitle ? <Text category='s2' appearance='hint'>{props.subtitle}</Text> : null}
                </View>
            </View>
        </Pressable>
    )
}

export default React.memo(PotentialListItem)

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
        width: 18,
        height: 18
    },
})