import React from "react"
import { StyleSheet, Pressable } from "react-native"
import { Text, Divider, Icon } from "@ui-kitten/components"
import { basic } from "../../../../styles/colors"
import { androidRipple } from "../../../../styles/styles"

const CreateButton = (props) => {
    return (
        <>
            <Divider />
            <Pressable style={styles.pressable} android_ripple={androidRipple} onPress={props.onPress}>
                <Icon name='plus-outline' fill={basic} style={styles.plusIcon} />
                <Text category='p1'>{props.title}</Text>
            </Pressable>
            <Divider />
        </>
    )
}

export default CreateButton

const styles = StyleSheet.create({
    plusIcon: {
        height: 23,
        width: 23,
        marginRight: 25,
    },
    pressable: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12
    }
})