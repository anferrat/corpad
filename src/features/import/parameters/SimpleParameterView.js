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
import MultiSelect from '../../../components/MultiSelect'
import { fieldProperties } from '../../../constants/fieldProperties'
import Hint from '../../../components/Hint'
import { parseIndex } from './helpers/functions'

const fileIcon = {
    icon: 'file-text-outline',
    pack: null
}

const InputFieldParamaters = ({ value, property, subitemIndex, potentialIndex, goBack, defaultUnit, fields }) => {
    const { unitList } = value
    const [fieldIndex, setFieldIndex] = useState(value.fieldIndex)
    const [defaultValue, setDefaultValue] = useState(value.defaultValue)
    const [importType, setImportType] = useState(value.importType)
    const [valid, setValid] = useState(value.valid)
    const [unit, setUnit] = useState(value.unit)
    const [fieldIndexList, setFieldIndexList] = useState(value.fieldIndexList)
    const defaultValueImportType = React.useCallback(() => {
        setImportType(0)
        setDefaultValue(null)
        setValid(true)
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
            const validation = fieldValidation(defaultValue, property, property === 'name')
            setDefaultValue(validation.value)
            setValid(validation.valid)
        }
    }, [property, importType, defaultValue])

    const dispatch = useDispatch()

    const onSaveHandler = () => {
        const validation = fieldValidation(defaultValue, property, property === 'name')
        if (!validation.valid && importType === 0 && property !== 'name') {
            setValid(validation.valid)
            errorHandler(509)
        }
        else if (property === 'name' && ((importType === 1 && fieldIndex === null) || (!validation.valid && importType === 0))) {
            if (importType === 0)
                setValid(validation.valid)
            errorHandler(512)
        }
        else {
            dispatch(setImportProperty(property, subitemIndex, potentialIndex, { importType, unit, defaultValue, fieldIndex, valid, fieldIndexList }))
            goBack()
        }
    }

    const setIndex = React.useCallback(() => {
        setDefaultValue(parseIndex(defaultValue))
    }, [defaultValue])

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
                    <View style={importType !== 0 ? styles.hidden : styles.visible}>
                        <InputField
                            style={styles.field}
                            unit={defaultUnit}
                            placeholder={fieldProperties[property].placeholder}
                            keyboardType={fieldProperties[property].keyboardType}
                            disabled={importType !== 0}
                            value={defaultValue}
                            onChangeText={setDefaultValue}
                            onEndEditing={validateDefaultValue}
                            valid={valid} />
                    </View>
                    <Radio
                        style={styles.radio}
                        onChange={fieldIndexImportType}
                        checked={importType === 1}>
                        Use values from a column in data file
                    </Radio>
                    <View style={importType !== 1 ? styles.hidden : styles.visible}>
                        <View style={styles.selectView}>
                            <SelectField
                                style={styles.field}
                                disabled={importType !== 1}
                                placeholder={'Select data column'}
                                itemList={fields}
                                selectedIndex={fieldIndex}
                                onSelect={setFieldIndex}
                                accessory={fileIcon} />
                            {unitList.length > 0 ?
                                <SelectField
                                    style={styles.unitSelect}
                                    disabled={importType !== 1 || unitList.length === 1}
                                    placeholder={'Unit'}
                                    selectedIndex={unit}
                                    itemList={unitList}
                                    onSelect={setUnit} /> : null}
                        </View>
                        <Hint hidden={unitList.length === 0 || importType !== 1} text='Unit must match the one used in spreadsheet' />
                    </View>
                    {property === 'name' ?
                        <>
                            <Radio
                                style={styles.radio}
                                onChange={defaultNameImportType}
                                checked={importType === 2}>
                                Use default name values
                            </Radio>
                            <View style={importType !== 2 || subitemIndex !== null ? styles.hidden : styles.visible}>
                                <InputField
                                    style={styles.field}
                                    placeholder={'1'}
                                    keyboardType='numeric'
                                    label='Start with index'
                                    disabled={importType !== 2}
                                    value={defaultValue}
                                    onChangeText={setDefaultValue}
                                    onEndEditing={setIndex}
                                    valid={true} />
                            </View>
                        </>
                        : null}

                    {value.mergeAllowed ?
                        <>
                            <Radio
                                style={styles.radio}
                                onChange={fieldIndexMergedImportType}
                                checked={importType === 3}>
                                Merge values from two or more columns in data file
                            </Radio>
                            <View style={importType !== 3 ? styles.hidden : styles.visible}>
                                <MultiSelect
                                    disabled={importType !== 3}
                                    placeholder={'Select data columns'}
                                    style={styles.field}
                                    itemList={fields}
                                    selectedItems={fieldIndexList}
                                    onSelect={setFieldIndexList}
                                />
                            </View>
                        </> : null}

                </View>
            </ScrollView>
            <Button
                onPress={onSaveHandler}
                accessoryLeft={saveIcon}
                style={styles.save}>
                Save
            </Button>
        </>
    )
}

export default React.memo(InputFieldParamaters, () => true)

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    visible: {
        display: 'flex'
    },
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
        flexBasis: 130,
        paddingLeft: 12
    }
})

