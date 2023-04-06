import React, { useRef, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Modal, Button } from "@ui-kitten/components"
import { control } from "../../../../styles/colors"
import Input from "../../../../components/Input"
import { plusCircle } from "../../../../components/Icons"

const NewPotentialModal = ({ visible, addPotential, dismissModal, onChangeName, nameValid, name }) => {
    const inputRef = useRef()

    useEffect(() => {
        const watch = setTimeout(() => {
            if (visible)
                inputRef.current?.focus()
        }, 30)
        return () => clearInterval(watch)
    }, [visible])

    return (
        <Modal
            style={styles.modal}
            onBackdropPress={dismissModal}
            backdropStyle={styles.backDrop}
            visible={visible}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={styles.inputView}>
                <Input
                    inputRef={inputRef}
                    label='New potential type'
                    maxLength={12}
                    valid={nameValid}
                    placeholder='Potential type'
                    style={styles.input}
                    value={name}
                    onChangeText={onChangeName} />
                <Button
                    accessoryLeft={plusCircle}
                    style={styles.button}
                    onPress={addPotential}>
                    Create
                </Button>
            </ScrollView>
        </Modal>
    )
}

export default React.memo(NewPotentialModal)

const styles = StyleSheet.create({
    plusIcon: {
        height: 23,
        width: 23,
        marginRight: 25,
    },
    inputView: {
        padding: 12,
        backgroundColor: control,
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
    input: {
        flex: 1
    },
    button: {
        flex: 1
    }
})