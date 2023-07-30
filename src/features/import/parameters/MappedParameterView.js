import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Radio, Button, Text } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import Select from '../../../components/Select'
import { saveIcon } from '../../../components/Icons'
import { setImportProperty } from '../../../store/actions/importData'
import { fieldProperties } from '../../../constants/fieldProperties'
import AddMapComponent from './AddMapComponent'
import AttributeMapper from './AttributeMapper'
import { getAttribute } from '../models/models'
import { warningHandler } from '../../../helpers/error_handler'
import { getFieldValues } from './helpers/functions'
import MappingHint from './components/MappingHint'
import BottomButton from '../../../components/BottomButton'

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
    const fieldValues = React.useMemo(() => getFieldValues(props.data, fieldIndex, props.fields), [fieldIndex])

    const itemList = React.useMemo(() => props.value.itemList.map(item => ({ item: props.value.itemListLabels[item], index: item })), [props.value.itemList, props.value.itemListLabels])

    const defaultValueImportType = React.useCallback(async () => {
        const confirm = attributeMap.length > 0 ? await warningHandler(51) : true
        if (confirm) {
            setImportType(0)
            setFieldIndex(null)
            setAttributeMap([])
            setDefaultValue(null)
        }
    }, [attributeMap.length])

    const addAttribute = React.useCallback((index, mappedIndexes, mappedValues) => setAttributeMap(old => {
        const indexChecked = old.findIndex(a => a.index === index) === -1
        if (indexChecked && index !== null && mappedIndexes.length !== 0) {
            return [...old, getAttribute({ index, mappedIndexes, mappedValues })]
        }
        else return old
    }), [setAttributeMap])

    const removeAttribute = React.useCallback((index) => {
        //index - is the index of property value from itemList
        setAttributeMap(old => old.filter(item => item.index !== index))
    }, [])

    const fieldIndexImportType = React.useCallback(() => {
        setImportType(1)
        setDefaultValue(null)
        setFieldIndex(null)
        setAttributeMap([])
    }, [])

    const onSaveHandler = async () => {
        const confirm = (attributeMap.length === 0 && importType === 1 && fieldIndex !== null) ? await warningHandler(52) : true
        if (confirm) {
            dispatch(setImportProperty(props.property, props.subitemIndex, props.potentialIndex, { fieldIndex, defaultValue, importType, attributeMap }))
            props.goBack()
        }
    }

    const fieldIndexHandler = React.useCallback(async (index) => {
        if (index !== fieldIndex) {
            const confirm = attributeMap.length > 0 ? await warningHandler(51) : true
            if (confirm) {
                setFieldIndex(index)
                setAttributeMap([])
            }
        }
    }, [fieldIndex, attributeMap.length])
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
                    {importType === 0 ?
                        <Select
                            style={styles.field}
                            disabled={importType !== 0}
                            placeholder={fieldProperties[props.property].placeholder}
                            accessoryList={fieldProperties[props.property].accessoryList}
                            itemList={itemList}
                            selectedIndex={defaultValue}
                            onSelect={setDefaultValue} /> : null}
                    <Radio
                        style={styles.radio}
                        onChange={fieldIndexImportType}
                        checked={importType === 1}>
                        Use values from a column in data file
                    </Radio>
                    {importType === 1 ? <><Select
                        style={styles.field}
                        disabled={importType !== 1}
                        placeholder={'Select data column'}
                        accessory={fileIcon}
                        itemList={props.fields}
                        selectedIndex={fieldIndex}
                        onSelect={fieldIndexHandler} />
                        <MappingHint
                            visible={importType === 1} />
                    </> : null}
                </View>
                <View style={importType === 0 || fieldIndex === null ? styles.hidden : globalStyle.card}>
                    <AddMapComponent
                        property={props.property}
                        fieldIndex={fieldIndex}
                        addAttribute={addAttribute}
                        itemList={itemList}
                        fieldValues={fieldValues}
                        attributeMap={attributeMap} />
                    <Text category='h6'>Mapped attributes</Text>
                    <AttributeMapper
                        property={props.property}
                        attributeMap={attributeMap}
                        fieldValues={fieldValues}
                        itemListLabels={props.value.itemListLabels}
                        removeAttribute={removeAttribute} />
                </View>
            </ScrollView >
            <BottomButton
                title='Save'
                icon='save'
                onPress={onSaveHandler}/>
        </>
    )
}

export default React.memo(SelectFieldParamaters)

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
    hidden: {
        display: 'none'
    },
    visible: {
        display: 'flex'
    }
})

