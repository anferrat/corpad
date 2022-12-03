import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Radio, Button } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import SelectField from '../../../components/Select'
import { saveIcon } from '../../../components/Icons'
import { setImportItemProperty } from '../../../store/actions/importData'
import { fieldProperties } from '../../../constants/fieldProperties'


const SelectFieldParamaters = (props) => {
    const dispatch = useDispatch()
    const [fieldIndex, setFieldIndex] = useState(props.value.fieldIndex)
    const [defaultValue, setDefaultValue] = useState(props.value.defaultValue)
    const [importType, setImportType] = useState(props.value.importType)
    const [attributeMap, setAttributeMap] = useState(props.value.attributeMap)
    const itemList = props.value.itemList


    const defaultValueImportType = React.useCallback(() => {
        setImportType(0)
        setFieldIndex(null)
    }, [])

    const fieldIndexImportType = React.useCallback(() => {
        setImportType(1)
        setDefaultValue(null)
    }, [])

    const onSaveHandler = () => {
        dispatch(setImportItemProperty(props.property, { fieldIndex, defaultValue, importType, attributeMap, itemList }))
        props.goBack()
    }
    return (
        <>
            <ScrollView contentContainerStyle={styles.mainView}>
                <View style={globalStyle.card}>
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
                style={styles.save}>Save</Button>
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
    }
})

