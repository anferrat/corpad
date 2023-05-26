import React from "react"
import { StyleSheet } from "react-native"
import Select from "../../../../components/Select2"
import { PotentialUnits } from "../../../../constants/global"
import { PotentialUnitLabels, PotentialUnitDescriptionLabels } from "../../../../constants/labels"

const itemList = Object.values(PotentialUnits).map(unit => ({ index: unit, item: `${PotentialUnitDescriptionLabels[unit]} (${PotentialUnitLabels[unit]})`}))

const UnitSelect = ({ unit, updateUnit }) => {
    return (
        <Select
            style={styles.select}
            label='Potential unit'
            selectedIndex={unit}
            onSelect={updateUnit}
            itemList={itemList}>
        </Select>
    )
}

export default React.memo(UnitSelect)

const styles = StyleSheet.create({
    defaultUnitView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingBottom: 24,
    },
    text: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 12,
    },
    select: {
        paddingBottom: 24
    }
})