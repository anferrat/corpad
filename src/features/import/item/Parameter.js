import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { getData, getDefaultNames, parameterComparison } from './helpers/functions'
import PropertyImportField from './components/PropertyImportField'

const Parameter = (props) => {
    const propertyData = useSelector(state => getData(state, props.property, props.subitemIndex), parameterComparison)
    const defaultName = useSelector(state => getDefaultNames(state, props.property, props.subitemIndex))
    return (
        <View style={{ ...props.style, ...styles.mainView }}>
            <PropertyImportField
                onPress={props.navigateToParameters}
                property={props.property}
                parameterType={propertyData.parameterType}
                importType={propertyData.importType}
                defaultName={defaultName}
                fields={props.fields}
                defaultValue={propertyData.defaultValue}
                fieldIndex={propertyData.fieldIndex}
                fieldIndexList={propertyData.fieldIndexList}
                unit={propertyData.unit}
                unitList={propertyData.unitList}
                itemList={propertyData.itemList}
                attributeCount={propertyData.attributeCount}
                data={props.data}
            />
        </View>
    )
}
export default React.memo(Parameter)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    button: {
        marginTop: 20,
        marginLeft: 6
    },
    select: {
        flex: 1
    }
})