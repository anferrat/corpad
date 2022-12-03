import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { Button } from "@ui-kitten/components"
import { plusCircle } from "../../../components/Icons"
import InputField from '../../../components/Input'

const NewPotentialModal = (props) => {
    const [potentialFieldName, setPotentialFieldName] = useState(null)

    const addPotentialHandler = React.useCallback(() => {
        props.dismiss()
        props.addPotentialField(potentialFieldName)
    }, [potentialFieldName, props.dismiss, props.addPotentialField])

    useEffect(() => {
        if (!props.isVisible)
            setPotentialFieldName(null)
    }, [props.isVisible])

    return (
        <>
            <InputField
                autoFocus={true}
                label='New potential type'
                maxLength={12}
                valid={true}
                placeholder='e.g. Depol'
                style={styles.input}
                value={potentialFieldName}
                onChangeText={setPotentialFieldName} />
            <Button
                accessoryLeft={plusCircle}
                style={styles.button}
                onPress={addPotentialHandler}
                disabled={props.disabled}>
                Add
            </Button>
        </>
    )
}

export default NewPotentialModal

const styles = StyleSheet.create({
    input: {
        flex: 1
    },
    button: {
        marginTop: 18,
        flex: 1
    }
})