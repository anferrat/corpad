import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Input from '../../../../components/Input'
import { Button, Modal } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'
import { saveIcon } from '../../../../components/Icons'


const SurveyNameModal = ({ inputText, onChangeNameInput, inputRef, showModal, updateHandler, hideModal, visible }) => {

    useEffect(() => {
        const watch = setTimeout(() => {
            if (visible)
                inputRef.current?.focus()
        }, 120)
        return () => {
            clearTimeout(watch)
        }
    }, [visible])

    return (
        <>
            <IconButton
                iconName='edit'
                onPress={showModal} />
            <Modal
                style={styles.modal}
                onBackdropPress={hideModal}
                backdropStyle={styles.backDrop}
                visible={visible}>
                <ScrollView
                    bounces={false}
                    keyboardShouldPersistTaps='handled'
                    style={styles.inputView}>
                    <Input
                        ref={inputRef}
                        label='Survey name'
                        maxLength={25}
                        valid={true}
                        placeholder='My survey'
                        style={styles.input}
                        value={inputText}
                        onChangeText={onChangeNameInput} />
                    <Button
                        accessoryLeft={saveIcon}
                        style={styles.button}
                        onPress={updateHandler}>
                        Save
                    </Button>
                </ScrollView>
            </Modal>
        </>
    )
}

export default SurveyNameModal

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
        flex: 1
    }
})