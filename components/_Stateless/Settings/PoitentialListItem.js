import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic200, basic300, primary, success } from '../../../styles/GlobalStyle'
import SingleIconButton from '../SingleIconButton'


const PotentialListItem = (props) => {
    return (
        <Pressable style={props.checked ? styles.mainViewChecked : styles.mainView} android_ripple={{ color: basic200 }} onPress={props.onPress}>
            <View style={styles.titleView}>
                <Icon name={props.icon ?? 'grid'} pack={props.pack ?? null} fill={primary} style={styles.icon} />
                <View>
                    <Text category='p1'>{props.title}</Text>
                    {props.subtitle ? <Text category='s2' appearance='hint'>{props.subtitle}</Text> : null}
                </View>

            </View>
            {props.checked ?
                <Icon fill={primary} style={styles.check} name='checkmark-circle-2' />
                : null
            }
            {!props.permanent ?
                <SingleIconButton
                    iconName='close-circle'
                    color={basic}
                    size='small'
                    onPress={props.onDelete}
                /> : null}
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
    mainViewChecked: {
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: basic200,
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
    check: {
        width: 20,
        height: 20,
        marginHorizontal: 8
    }
})