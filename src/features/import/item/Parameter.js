import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { getData, getDefaultNames, parameterComparison } from './helpers/functions'
import PropertyImportField from './components/PropertyImportField'
import { ImportData } from './ImportDataProvider'
import { getDefaultUnit } from '../../../helpers/functions'

const Parameter = (props) => {
    const importData = useContext(ImportData)
    const propertyData = useSelector(state => getData(state, props.property, importData.subitemIndex), parameterComparison)
    const defaultName = useSelector(state => getDefaultNames(state, props.property, importData.subitemIndex))
    const defaultUnit = getDefaultUnit(propertyData.unitList, propertyData.defaultUnitIndex)
    if (propertyData)
        return (
            <View style={{ ...props.style, ...styles.mainView }}>
                <PropertyImportField
                    onPress={importData.navigateToParameters}
                    property={props.property}
                    subitemIndex={importData.subitemIndex}
                    parameterType={propertyData.parameterType}
                    importType={propertyData.importType}
                    defaultName={defaultName}
                    defaultUnit={defaultUnit}
                    fields={importData.fields}
                    defaultValue={propertyData.defaultValue}
                    fieldIndex={propertyData.fieldIndex}
                    fieldIndexList={propertyData.fieldIndexList}
                    unit={propertyData.unit}
                    unitList={propertyData.unitList}
                    itemList={propertyData.itemList}
                    attributeCount={propertyData.attributeCount}
                    data={importData.data} />
            </View>
        )
    else return null
}
export default React.memo(Parameter)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    }
})