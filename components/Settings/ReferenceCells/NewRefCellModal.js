import React, { useState, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import SelectField from '../../_Stateless/SelectField'
import InputField from "../../_Stateless/InputField"
import { Modal, Button } from "@ui-kitten/components"
import { referenceCellTypes } from "../../../constants/constants"
import { plusCircle } from "../../_Stateless/Icons"
import fieldValidation from "../../fieldValidation"
import { errorHandler } from "../../errorHandler"


const NewRefCellModal = (props) => {
    const [referenceCellType, setReferenceCellType] = useState(null)
    const [name, setName] = useState(null)
    const [nameValid, setNameValid] = useState(true)
    const [selectValid, setSelectvalid] = useState(true)

    const selectAction = React.useCallback((value) => {
        setReferenceCellType(value)
        setSelectvalid(value !== null)
    }, [setReferenceCellType])

    const onSubmit = React.useCallback((name) => {
        const validation = fieldValidation(name, 'name_not_empty')
        setNameValid(validation.valid)
        setName(validation.value)
    }, [setName, setNameValid])

    useEffect(() => {
        if (!props.isVisible) {
            setName(null)
            setNameValid(true)
            setReferenceCellType(null)
            setSelectvalid(null)
        }
    }, [props.isVisible])

    const onPressHandler = React.useCallback(() => {
        const validation = fieldValidation(name, 'name_not_empty')
        if (validation.valid && referenceCellType !== null) {
            props.addRefCellHandler(validation.value, referenceCellType)
        }
        else {
            errorHandler(validation.valid ? 505 : 504)
            setNameValid(validation.valid)
            setName(validation.value)
            setSelectvalid(referenceCellType !== null)
        }
    }, [props.addRefCellHandler, name, referenceCellType])

    return (
        <Modal
            style={styles.modal}
            onBackdropPress={props.dismiss}
            backdropStyle={styles.backDrop}
            visible={props.isVisible}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={styles.mainView}>
                <InputField
                    autoFocus={true}
                    label='Name'
                    valid={nameValid}
                    value={name}
                    property='name_not_empty'
                    onChangeText={setName}
                    onEndEditing={onSubmit.bind(this, name)} />
                <SelectField
                    valid={selectValid}
                    property='rcType'
                    selectAction={selectAction}
                    itemsList={referenceCellTypes}
                    selectedItem={referenceCellType}
                    placeholder="Select type"
                    label='Reference cell type' />
                <Button
                    onPress={onPressHandler}
                    title='Add'
                    valid={nameValid}
                    errorMessage='Please enter a valid name'
                    accessoryLeft={plusCircle}
                    style={styles.button} >Add</Button>
            </ScrollView>
        </Modal>
    )
}

export default NewRefCellModal

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        width: '90%',
        top: 200,
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    mainView: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    input: {
        flex: 1,
        marginVertical: 12
    },
    button: {
        marginTop: 18,
    },
    plusIcon: {
        height: 23,
        width: 23,
        marginRight: 25,
    },
    pressable: {
        height: 50,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 12
    }
})