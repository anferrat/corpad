import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Select from './components/Select'
import MultiSelect from '../../../components/MultiSelect3'
import { Icon } from '@ui-kitten/components'
import { basic, primary } from '../../../styles/colors'
import { getFieldIndexes, getPropertyIndexes } from './helpers/functions'
import { fieldProperties } from '../../../constants/fieldProperties'
import { errorHandler } from '../../../helpers/error_handler'
import IconButton from '../../../components/IconButton'
import MapperStatusHint from './components/MapperStatusHint'

const fileIcon = {
    name: 'file-text-outline',
    pack: null
}

const AddMapComponent = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(null)

    //selectedMap contains IndexPath just for the test, it doesn't seem to improve perfomance
    const [selectedMap, setSelectedMap] = useState([])
    const [valid, setValid] = useState([true, true])
    const fieldValues = React.useMemo(() => getFieldIndexes(props.fieldValues, props.attributeMap), [props.fieldValues, props.attributeMap])
    const fieldValuesDisplay = React.useMemo(() => fieldValues.map(v => v.item === "" ? { ...v, item: '<Empty>' } : v), [fieldValues])
    const propertyList = React.useMemo(() => getPropertyIndexes(props.itemList, props.attributeMap), [props.itemList, props.attributeMap])
    const accessoryList = React.useMemo(() => {
        if (fieldProperties[props.property].accessoryList)
            return propertyList.map(p => fieldProperties[props.property].accessoryList[p.index])
        else return null
    }, [propertyList])

    const fieldValuesEmpty = fieldValues.length === 0
    const propertyListEmpty = propertyList.length === 0
    const fieldIndexNull = props.fieldIndex === null
    const addAttribute = React.useCallback((selectedIndex, selectedMap) => {
        if (propertyList.length === 0)
            errorHandler(511)
        else
            if (selectedIndex === null || selectedMap.length === 0) {
                errorHandler(510)
                setValid([selectedIndex !== null, selectedMap.length !== 0])
            }
            else {
                props.addAttribute(propertyList[selectedIndex]?.index, selectedMap.map(i => fieldValues[i].index), selectedMap.map(i => fieldValues[i].item))
                setSelectedMap([])
                setSelectedIndex(null)
            }
    }, [propertyList, fieldValues])

    const setSelectedIndexhandler = React.useCallback((index) => {
        setSelectedIndex(index)
        setValid(old => [index !== null, old[1]])
    }, [])

    const setSelectedMapHandler = React.useCallback((indexMap) => {
        setSelectedMap(indexMap)
        setValid(old => [old[0], indexMap.length !== 0])
    }, [])

    useEffect(() => {
        if (selectedMap.length !== 0)
            setSelectedMap([])
        if (selectedIndex !== null)
            setSelectedIndex(null)
        if (!valid[0] || !valid[1])
            setValid([true, true])
    }, [props.attributeMap])

    return (
        <View style={styles.mainView}>
            <View style={styles.selectView}>
                <Select
                    valid={valid[0]}
                    disabled={fieldValuesEmpty || propertyListEmpty}
                    label={'Property value'}
                    placeholderOption={true}
                    placeholder={fieldProperties[props.property].placeholder}
                    accessoryList={accessoryList}
                    onSelect={setSelectedIndexhandler}
                    style={styles.select}
                    itemList={propertyList}
                    selectedIndex={selectedIndex} />
                <Icon name='arrow-back-outline'
                    fill={basic}
                    style={styles.icon} />
                <MultiSelect
                    valid={valid[1]}
                    disabled={fieldValuesEmpty || propertyListEmpty}
                    label={'Values from .csv'}
                    placeholder={'Select values'}
                    style={styles.select}
                    itemList={fieldValuesDisplay}
                    selectedItems={selectedMap}
                    onSelect={setSelectedMapHandler} />
                <View style={styles.add}>
                    <IconButton
                        color={fieldValuesEmpty || propertyListEmpty ? basic : primary}
                        disabled={fieldValuesEmpty || propertyListEmpty}
                        iconName={'arrow-circle-right'}
                        onPress={addAttribute.bind(this, selectedIndex, selectedMap)} />
                </View>
            </View>
            <MapperStatusHint
                fieldValuesEmpty={fieldValuesEmpty}
                propertyListEmpty={propertyListEmpty}
                fieldIndexNull={fieldIndexNull} />
        </View>

    )
}

export default React.memo(AddMapComponent)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 12,
        marginTop: 20,
    },
    selectView: {
        flexDirection: 'row',
        flex: 1,
        paddingBottom: 12,
        alignItems: 'center'
    },
    select: {
        flex: 1
    },
    add: {
        marginTop: 20,
        marginLeft: 6,
        borderRadius: 35
    }
})