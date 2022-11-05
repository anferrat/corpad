import React, { useEffect, useState } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Button, Modal } from "@ui-kitten/components"
import { saveIcon } from "../../_Stateless/Icons"
import InputField from '../../_Stateless/InputField'
import fieldValidation from '../../fieldValidation'
import { errorHandler } from "../../errorHandler"
import { useDispatch } from "react-redux"
import { loadSurveySettings } from '../../../store/actions/settings'
import { sendRequest } from "../../../database/db"

const SurveyNameModal = (props) => {
    const [surveyName, setSurveyName] = useState(props.surveyName)
    const dispatch = useDispatch()

    useEffect(() => {
        if (surveyName !== props.surveyName)
            setSurveyName(props.surveyName)
    }, [props.surveyName, props.isVisible])

    const updateSurveyName = React.useCallback(async () => {
        const validation = fieldValidation(surveyName, 'surveyName')
        if (validation.valid) {
            const update = await sendRequest('UPDATE', 'SURVEY', { name: validation.value, technician: 'Wade Watts' })
            if (update.status === 200)
                dispatch(loadSurveySettings({ name: validation.value }))
            else errorHandler(update.status)
        }
        else errorHandler(506)
        props.dismiss()
    }, [dispatch, props.dismiss, surveyName])


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
                    selectTextOnFocus={true}
                    autoFocus={true}
                    label='Survey name'
                    maxLength={25}
                    property={'surveyName'}
                    placeholder='My survey'
                    style={styles.input}
                    value={surveyName}
                    valid={true}
                    onChangeText={setSurveyName} />
                <Button
                    accessoryLeft={saveIcon}
                    style={styles.button}
                    onPress={updateSurveyName}>
                    Save
                </Button>
            </ScrollView>
        </Modal>
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