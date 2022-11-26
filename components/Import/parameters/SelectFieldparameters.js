import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Radio, Button } from '@ui-kitten/components'
import { androidStyle } from '../../../styles/GlobalStyle'
import SelectField from '../../_Stateless/SelectField'
import { saveIcon } from '../../_Stateless/Icons'
import { useDispatch } from 'react-redux'
import { setImportItemProperty } from '../../../store/actions/importData'
import { fieldProperties } from '../../../constants/fieldProperties'


const SelectFieldParamaters = (props) => {
    const dispatch = useDispatch()


    const [fieldIndex, setFieldIndex] = useState(props.value.fieldIndex)
    const [defaultValue, setDefaultValue] = useState(props.value.defaultValue)
    const [importType, setImportType] = useState(props.value.importType)
    const [mappedIndexes, setMappedIndexes] = useState(props.value.mappedIndexes)
    const itemList = props.value.itemList


    const defaultValueImportType = React.useCallback(() => {
        setImportType(0)
        setFieldIndex(null)
    }, [])

    const fieldIndexImportType = React.useCallback(() => {
        setImportType(1)
        setDefaultValue(null)
    }, [])

    const onSaveHandler = React.useCallback(() => {
        dispatch(setImportItemProperty(props.property, { fieldIndex, defaultValue, importType, mappedIndexes, itemList }))
        props.goBack()
    }, [dispatch])
    return (
        <>
            <ScrollView contentContainerStyle={styles.mainView}>
                <View style={androidStyle.ConnectionCard}>
                    <Radio
                        style={styles.radio}
                        onChange={defaultValueImportType}
                        checked={importType === 0}>
                        Use same value for each item
                    </Radio>
                    <SelectField
                        style={styles.field}
                        disabled={importType !== 0}
                        placeholder={fieldProperties[props.property].placeholder}
                        itemsList={itemList}
                        selectedItem={defaultValue}
                        selectAction={setDefaultValue}
                    />
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
                </View>
            </ScrollView>
            <Button
                onPress={onSaveHandler}
                accessoryLeft={saveIcon}
                style={androidStyle.SaveButton}>Save</Button>
        </>
    )
}

export default SelectFieldParamaters

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

