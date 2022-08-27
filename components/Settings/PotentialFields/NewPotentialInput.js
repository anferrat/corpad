import React, { useState } from "react"
import { StyleSheet, Pressable } from "react-native"
import { Text, Divider, Icon } from "@ui-kitten/components"
import { basic200, basic } from "../../../styles/GlobalStyle"
import NewPotentialModal from "./NewPotentialModal"

//Use CreateButton instead from _Stateless/Settings

const NewPotentialInput = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <Divider />
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: basic200 }}
                onPress={setModalVisible.bind(this, true)}
                disabled={props.disabled}>
                <Icon name='plus-outline' fill={basic} style={styles.plusIcon} />
                <Text category='p1'>Create new potential type</Text>
            </Pressable>
            <Divider />
            <NewPotentialModal
                isVisible={modalVisible}
                dismiss={setModalVisible.bind(this, false)}
                addPotentialField={props.addPotentialField} />
        </>
    )
}

export default NewPotentialInput

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