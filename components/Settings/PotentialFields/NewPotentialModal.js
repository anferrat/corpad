import React, { useState, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Button, Modal } from "@ui-kitten/components"
import { plusCircle } from "../../_Stateless/Icons"
import InputField from '../../_Stateless/InputField'

const NewPotentialModal = (props) => {
    const [potentialFieldName, setPotentialFieldName] = useState(null)

    const addPotentialHandler = React.useCallback((name) => {
        props.dismiss()
        props.addPotentialField(name)
    }, [props])

    useEffect(() => {
        if (!props.isVisible)
            setPotentialFieldName(null)
    }, [props.isVisible])

    return (
        <Modal
            style={styles.modal}
            onBackdropPress={props.dismiss}
            backdropStyle={styles.backDrop}
            visible={props.isVisible}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={styles.inputView}>
                <InputField
                    autoFocus={true}
                    label='New potential type'
                    maxLength={12}
                    placeholder='e.g. Depol'
                    style={styles.input}
                    value={potentialFieldName}
                    onChangeText={setPotentialFieldName} />
                <Button
                    accessoryLeft={plusCircle}
                    style={styles.button}
                    onPress={addPotentialHandler.bind(this, potentialFieldName)}
                    disabled={props.disabled}>
                    Add
                </Button>
            </ScrollView>
        </Modal>
    )
}

export default NewPotentialModal

const styles = StyleSheet.create({
    modal: {
        width: '90%'
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    inputView: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        flex: 1,
    },
    input: {
        flex: 1
    },
    button: {
        marginTop: 18,
        flex: 1
    }
})