import React from "react"
import { StyleSheet } from "react-native"
import Select from "../../../../components/Select2"
import { potentialUnits, potentialUnitDescription } from "../../../../constants/constants"


const UnitSelect = ({ unit, updateUnit }) => {
    const itemList = React.useMemo(() => potentialUnitDescription.map((desc, index) => `${desc} (${potentialUnits[index]})`), [])
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