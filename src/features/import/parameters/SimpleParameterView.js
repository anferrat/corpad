import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Radio, Button } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import InputField from '../../../components/Input'
import SelectField from './components/Select'
import { saveIcon } from '../../../components/Icons'
import { setImportProperty } from '../../../store/actions/importData'
import fieldValidation from '../../../helpers/validation'
import { errorHandler } from '../../../helpers/error_handler'
import MultiSelect from './components/MultiSelect'
import { fieldProperties } from '../../../constants/fieldProperties'
import Hint from '../../../components/Hint'

const fileIcon = {
    icon: 'file-text-outline',
    pack: null
}

const InputFieldParamaters = (props) => {
    const [fieldIndex, setFieldIndex] = useState(props.value.fieldIndex)
    const [defaultValue, setDefaultValue] = useState(props.value.defaultValue)
    const [importType, setImportType] = useState(props.value.importType)
    const [valid, setValid] = useState(props.value.valid)
    const [unit, setUnit] = useState(props.value.unit)
    const [unitList, setUnitList] = useState(props.value.unitList)
    const [fieldIndexList, setFieldIndexList] = useState(props.value.fieldIndexList)
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

    const fieldIndexMergedImportType = React.useCallback(() => {
        setImportType(3)
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
        const validation = fieldValidation(defaultValue, props.property, props.property === 'name')
        if (!validation.valid && importType === 0 && props.property !== 'name') {
            setValid(validation.valid)
            errorHandler(509)
        }
        else if (props.property === 'name' && ((importType === 1 && fieldIndex === null) || (!validation.valid && importType === 0))) {
            if (importType === 0)
                setValid(validation.valid)
            errorHandler(512)
        }
        else {
            dispatch(setImportProperty(props.property, props.subitemIndex, props.potentialIndex, { importType, unit, defaultValue, fieldIndex, valid, fieldIndexList }))
            props.goBack()
        }
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.mainView}>
                <View style={globalStyle.card}>
                    <Radio
                        style={styles.radio}
                        onChange={defaultValueImportType}
                        checked={importType === 0}>
                        Use fixed value for each imported item
                    </Radio>
                    <InputField
                        style={styles.field}
                        unit={props.defaultUnit}
                        placeholder={fieldProperties[props.property].placeholder}
                        keyboardType={fieldProperties[props.property].keyboardType}
                        disabled={importType !== 0}
                        value={defaultValue}
                        onChangeText={setDefaultValue}
                        onEndEditing={validateDefaultValue}
                        valid={valid} />
                    <Radio
                        style={styles.radio}
                        onChange={fieldIndexImportType}
                        checked={importType === 1}>
                        Use values from a column in data file
                    </Radio>
                    <View style={styles.selectView}>
                        <SelectField
                            style={styles.field}
                            disabled={importType !== 1}
                            placeholder={'Select data column'}
                            itemList={props.fields}
                            selectedIndex={fieldIndex}
                            onSelect={setFieldIndex}
                            accessory={fileIcon}
                        />
                        {unitList.length > 0 ?
                            <SelectField
                                style={styles.unitSelect}
                                disabled={importType !== 1 || unitList.length === 1}
                                placeholder={'Unit'}
                                selectedIndex={unit}
                                itemList={unitList}
                                onSelect={setUnit}
                            /> : null}
                    </View>
                    <Hint hidden={unitList.length === 0 || importType !== 1} text='Unit must match the one used in spreadsheet' />
                    {props.property === 'name' ?
                        <Radio
                            style={styles.radio}
                            onChange={defaultNameImportType}
                            checked={importType === 2}>
                            Use default name values
                        </Radio> : null}
                    {props.value.mergeAllowed ?
                        <>
                            <Radio
                                style={styles.radio}
                                onChange={fieldIndexMergedImportType}
                                checked={importType === 3}>
                                Merge values from two or more columns in data file
                            </Radio>
                            <MultiSelect
                                disabled={importType !== 3}
                                placeholder={'Select data columns'}
                                style={styles.field}
                                itemList={props.fields}
                                selectedItems={fieldIndexList}
                                onSelect={setFieldIndexList}
                            />
                        </> : null}

                </View>
            </ScrollView>
            <Button
                onPress={onSaveHandler}
                accessoryLeft={saveIcon}
                style={styles.save}>Save</Button>
        </>
    )
}

export default React.memo(InputFieldParamaters, () => true)

const styles = StyleSheet.create({
    field: {
        paddingBottom: 12,
        flex: 1
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
    save: {
        position: 'absolute',
        bottom: 10,
        left: '2.5%',
        height: 50,
        width: '95%',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    selectView: {
        flexDirection: 'row'
    },
    unitSelect: {
        flexBasis: 120,
        paddingLeft: 12
    }
})

