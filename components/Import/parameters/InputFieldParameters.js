import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Radio, Button } from '@ui-kitten/components'
import { androidStyle, basic } from '../../../styles/GlobalStyle'
import InputField from '../../_Stateless/InputField'
import SelectField from '../../_Stateless/SelectField'
import { saveIcon } from '../../_Stateless/Icons'
import { useDispatch } from 'react-redux'
import { setImportItemProperty } from '../../../store/actions/importData'
import { fieldProperties } from '../../../constants/fieldProperties'
import fieldValidation from '../../fieldValidation'


const InputFieldParamaters = (props) => {
    const [fieldIndex, setFieldIndex] = useState(props.value.fieldIndex)
    const [defaultValue, setDefaultValue] = useState(props.value.defaultValue)
    const [importType, setImportType] = useState(props.value.importType)
    const [valid, setValid] = useState(props.value.valid)
    const [unit, setUnit] = useState(props.value.unit)
    const [unitList, setUnitList] = useState(props.value.unitList)

    const defaultValueImportType = React.useCallback(() => {
        setImportType(0)
        setFieldIndex(null)
    }, [])

    const fieldIndexImportType = React.useCallback(() => {
        setImportType(1)
        setValid(true)
        setDefaultValue(null)
    }, [])

    const defaultNameImportType = React.useCallback(() => {
        setImportType(2)
        setValid(true)
        setDefaultValue(null)
        setFieldIndex(null)
    }, [])

    const validateDefaultValue = React.useCallback(() => {
        if (importType === 0) {
            const validation = fieldValidation(defaultValue, props.property, props.property === 'name')
            setDefaultValue(validation.value)
            setValid(validation.valid)
        }
    }, [props.property, importType, defaultValue])

    const dispatch = useDispatch()

    const onSaveHandler = () => {
        dispatch(setImportItemProperty(props.property, { importType, unit, unitList, defaultValue, fieldIndex, valid }))
        props.goBack()
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.mainView}>
                <View style={androidStyle.ConnectionCard}>
                    <Radio
                        style={styles.radio}
                        onChange={fieldIndexImportType}
                        checked={importType === 1}>
                        Use values from a column in data file
                    </Radio>
                    <SelectField
                        style={styles.field}
                        disabled={importType !== 1}
                        placeholder={fieldProperties[props.property].placeholder}
                        itemsList={props.fields}
                        selectedItem={fieldIndex}
                        selectAction={setFieldIndex}
                    />
                    <Radio
                        style={styles.radio}
                        onChange={defaultValueImportType}
                        checked={importType === 0}>
                        Use same value for each item
                    </Radio>
                    <InputField
                        style={styles.field}
                        disabled={importType !== 0}
                        value={defaultValue}
                        onChangeText={setDefaultValue}
                        onEndEditing={validateDefaultValue}
                        valid={valid}
                    />
                    {props.property === 'name' ?
                        <Radio
                            style={styles.radio}
                            onChange={defaultNameImportType}
                            checked={importType === 2}>
                            Use default name values
                        </Radio> : null}

                </View>
            </ScrollView>
            <Button
                onPress={onSaveHandler}
                accessoryLeft={saveIcon}
                style={androidStyle.SaveButton}>Save</Button>
        </>
    )
}

export default InputFieldParamaters

const styles = StyleSheet.create({
    field: {
        paddingBottom: 12
    },
    optionView: {
        backgroundColor: 'red',
        flex: 1
    },
    radio: {
        paddingVertical: 12
    },
    mainView: {
        paddingBottom: 12
    },
})

