import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../../../../components/IconButton'
import PropertyImportField from '../components/PropertyImportField'
import { ImportData } from '..'
import PotentialLabel from '../components/PotentialLabel'
import { getDefaultUnit } from '../../../../helpers/functions'

const emptyList = []
const ParameterPotential = ({
    navigateToParameters,
    deletePotentialHandler,
    potentialTypeIndex,
    referenceCellIndex,
    subitemIndex,
    potentialIndex,
    defaultUnitIndex,
    parameterType,
    importType,
    fields,
    defaultValue,
    fieldIndex,
    unit,
    unitList,
    data,
}) => {
    const importData = useContext(ImportData)
    const { potentialTypes, referenceCellList } = importData.extraData

    const deleteHandler = React.useCallback(() => deletePotentialHandler(potentialIndex), [potentialIndex, deletePotentialHandler])
    const defaultUnit = getDefaultUnit(unitList, defaultUnitIndex, importData.extraData, referenceCellIndex)
    return (
        <View style={styles.mainView}>
            <PotentialLabel
                potentialTypeIndex={potentialTypeIndex}
                referenceCellIndex={referenceCellIndex}
                potentialTypes={potentialTypes}
                referenceCellList={referenceCellList} />
            <View style={styles.importField}>
                <PropertyImportField
                    defaultUnit={defaultUnit}
                    onPress={navigateToParameters}
                    property={'potential'}
                    subitemIndex={subitemIndex}
                    potentialIndex={potentialIndex}
                    parameterType={parameterType}
                    importType={importType}
                    defaultName={null}
                    fields={fields}
                    defaultValue={defaultValue}
                    fieldIndex={fieldIndex}
                    fieldIndexList={emptyList}
                    unit={unit}
                    unitList={unitList}
                    itemList={emptyList}
                    attributeCount={null}
                    data={data} />
            </View>
            <IconButton
                style={styles.icon}
                onPress={deleteHandler}
                iconName='close'
            />
        </View>
    )
}
export default React.memo(ParameterPotential)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    importField: {
        flex: 1
    },
    icon: {
        marginLeft: 12
    },
    text: {
        maxWidth: 80,
        marginRight: 12
    }
})