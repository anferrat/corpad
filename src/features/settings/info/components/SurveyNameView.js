import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Modal, Button } from '@ui-kitten/components'
import Input from '../../../../components/Input'
import IconButton from '../../../../components/IconButton'
import { saveIcon } from '../../../../components/Icons'


const SurveyNameView = ({ name, inputText, updateSurveyName, resetNameInput, onChangeNameInput }) => {
    const [visible, setVisible] = useState(false)
    const inputRef = useRef(true)

    useEffect(() => {
        const watch = setTimeout(() => {
            if (visible)
                inputRef.current.focus()
        }, 30)
        return () => {
            clearTimeout(watch)
        }
    }, [visible])

    const showModal = React.useCallback(() => setVisible(true), [])

    const updateHandler = () => {
        updateSurveyName()
        setVisible(false)
    }

    const hideModal = React.useCallback(() => {
        setVisible(false)
        resetNameInput()
    }, [])

    return (
        <View style={styles.surveyTitle}>
            <View style={styles.titleView}>
                <Text
                    appearance='hint'
                    category='label'>Survey name</Text>
                <Text
                    category='h5'
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.title}>{name}</Text>
            </View>
            <IconButton
                iconName='edit'
                onPress={showModal} />
            <Modal
                style={styles.modal}
                onBackdropPress={hideModal}
                backdropStyle={styles.backDrop}
                visible={visible}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={styles.inputView}>
                    <Input
                        inputRef={inputRef}
                        label='Survey name'
                        maxLength={25}
                        property={'surveyName'}
                        placeholder='My survey'
                        style={styles.input}
                        value={inputText}
                        valid={true}
                        onChangeText={onChangeNameInput} />
                    <Button
                        accessoryLeft={saveIcon}
                        style={styles.button}
                        onPress={updateHandler}>
                        Save
                    </Button>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default SurveyNameView

const styles = StyleSheet.create({
    surveyTitle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 6,
        paddingBottom: 24,
    },
    title: {
        flex: 1,
        marginRight: 24,
        marginLeft: 12,
    },
    titleView: {
        flex: 1
    },
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