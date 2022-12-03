import React, { useState } from "react"
import { StyleSheet, Pressable, ScrollView } from "react-native"
import { Text, Divider, Icon, Modal } from "@ui-kitten/components"
import { basic } from "../../../styles/colors"
import { androidRipple } from '../../../styles/styles'
import NewPotentialModal from "./NewPotentialModal"

//Use CreateButton instead from _Stateless/Settings

const NewPotentialInput = (props) => {
    const [modalVisible, setModalVisible] = useState(false)

    const showModal = React.useCallback(() => setModalVisible(true), [setModalVisible])
    const hideModal = React.useCallback(() => setModalVisible(false), [setModalVisible])

    return (
        <>
            <Divider />
            <Pressable
                style={styles.pressable}
                android_ripple={androidRipple}
                onPress={showModal}
                disabled={props.disabled}>
                <Icon name='plus-outline' fill={basic} style={styles.plusIcon} />
                <Text category='p1'>Create new potential type</Text>
            </Pressable>
            <Divider />
            <Modal
                style={styles.modal}
                onBackdropPress={hideModal}
                backdropStyle={styles.backDrop}
                visible={modalVisible}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={styles.inputView}>
                    <NewPotentialModal
                        isVisible={modalVisible}
                        dismiss={hideModal}
                        addPotentialField={props.addPotentialField} />
                </ScrollView>
            </Modal>
        </>
    )
}

export default React.memo(NewPotentialInput)

const styles = StyleSheet.create({
    plusIcon: {
        height: 23,
        width: 23,
        marginRight: 25,
    },
    inputView: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        flex: 1,
    },
    pressable: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    modal: {
        width: '90%'
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})