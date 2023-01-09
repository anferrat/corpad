import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Radio, Button, Text } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import Select from './components/Select'
import { saveIcon } from '../../../components/Icons'
import { setImportProperty } from '../../../store/actions/importData'
import { fieldProperties } from '../../../constants/fieldProperties'
import AddMapComponent from './AddMapComponent'
import AttributeMapper from './AttributeMapper'
import { getAttribute } from '../models/models'
import { warningHandler } from '../../../helpers/error_handler'
import { getFieldValues } from './helpers/functions'
import MappingHint from './components/MappingHint'

const fileIcon = {
    icon: 'file-text-outline',
    pack: null
}

const SelectFieldParamaters = (props) => {
    const dispatch = useDispatch()
    const [fieldIndex, setFieldIndex] = useState(props.value.fieldIndex)
    const [defaultValue, setDefaultValue] = useState(props.value.defaultValue)
    const [importType, setImportType] = useState(props.value.importType)
    const [attributeMap, setAttributeMap] = useState(props.value.attributeMap)
    const fieldValues = React.useMemo(() => getFieldValues(props.data, fieldIndex, props.fields).map(item => item === "" ? '<Empty>' : item), [fieldIndex])

    const defaultValueImportType = React.useCallback(async () => {
        const confirm = attributeMap.length > 0 ? await warningHandler(51) : true
        if (confirm) {
            setImportType(0)
            setFieldIndex(null)
            setAttributeMap([])
        }
    }, [attributeMap.length])

    const addAttribute = (index, mappedIndexes) => setAttributeMap(old => {
        const indexChecked = old.findIndex(a => a.index === index) === -1
        if (indexChecked && index !== null && mappedIndexes.length !== 0) {
            return [...old, getAttribute({ index, mappedIndexes })]
        }
        else return old
    })

    const removeAttribute = (index) => {
        //index - is the index of property value from itemList
        setAttributeMap(old => old.filter(item => item.index !== index))
    }

    const fieldIndexImportType = React.useCallback(() => {
        setImportType(1)
        setDefaultValue(null)
    }, [])

    const onSaveHandler = async () => {
        const confirm = (attributeMap.length === 0 && importType === 1 && fieldIndex !== null) ? await warningHandler(52) : true
        if (confirm) {
            dispatch(setImportProperty(props.property, props.subitemIndex, props.potentialIndex, { fieldIndex, defaultValue, importType, attributeMap }))
            props.goBack()
        }
    }

    const fieldIndexHandler = async (index) => {
        if (index !== fieldIndex) {
            const confirm = attributeMap.length > 0 ? await warningHandler(51) : true
            if (confirm) {
                setFieldIndex(index)
                setAttributeMap([])
            }
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
                        Use fixed value for each item
                    </Radio>
                    <View style={importType !== 0 ? styles.hidden : styles.visible} >
                        <Select
                            style={styles.field}
                            disabled={importType !== 0}
                            placeholder={fieldProperties[props.property].placeholder}
                            accessoryList={fieldProperties[props.property].accessoryList}
                            itemList={props.value.itemList}
                            selectedIndex={defaultValue}
                            onSelect={setDefaultValue} />
                    </View>
                    <Radio
                        style={styles.radio}
                        onChange={fieldIndexImportType}
                        checked={importType === 1}>
                        Use values from a column in data file
                    </Radio>
                    <View style={importType === 0 ? styles.hidden : styles.visible}>
                        <Select
                            style={styles.field}
                            disabled={importType !== 1}
                            placeholder={'Select data column'}
                            accessory={fileIcon}
                            itemList={props.fields}
                            selectedIndex={fieldIndex}
                            onSelect={fieldIndexHandler} />
                        <MappingHint
                            visible={importType === 1} />
                    </View>
                </View>
                <View style={importType === 0 || fieldIndex === null ? styles.hidden : globalStyle.card}>
                    <AddMapComponent
                        property={props.property}
                        fieldIndex={fieldIndex}
                        addAttribute={addAttribute}
                        itemList={props.value.itemList}
                        fieldValues={fieldValues}
                        attributeMap={attributeMap} />
                    <Text category='h6'>Mapped attributes</Text>
                    <AttributeMapper
                        property={props.property}
                        attributeMap={attributeMap}
                        fieldValues={fieldValues}
                        itemList={props.value.itemList}
                        removeAttribute={removeAttribute} />
                </View>
            </ScrollView>
            <Button
                onPress={onSaveHandler}
                accessoryLeft={saveIcon}
                style={styles.save}>Save</Button>
        </>
    )
}

export default React.memo(SelectFieldParamaters, () => true)

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
        paddingBottom: 72
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
    hidden: {
        display: 'none'
    },
    visible: {
        display: 'flex'
    }
})

