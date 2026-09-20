import React from "react"
import { StyleSheet } from "react-native"
import Select from "../../../../components/Select"
import { PotentialUnits } from "../../../../constants/global"
import { PotentialUnitLabels, PotentialUnitDescriptionLabels } from "../../../../constants/labels"
import { translateSettings } from '../../../../localization'

const UnitSelect = ({ unit, updateUnit }) => {
    const itemList = React.useMemo(() => Object.values(PotentialUnits).map(unit => ({ index: unit, item: `${PotentialUnitDescriptionLabels[unit]} (${PotentialUnitLabels[unit]})` })), [])
    return (
        <Select
            style={styles.select}
            label={translateSettings('potentialUnit')}
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
        paddingBottom: 12,
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
