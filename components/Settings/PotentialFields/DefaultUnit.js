import React, { useEffect, useState, useRef } from "react"
import { StyleSheet } from "react-native"
import { Select, SelectItem, IndexPath } from "@ui-kitten/components"
import { potentialUnits, potentialUnitDescription } from "../../../constants/constants"
import { sendRequest } from "../../../database/db"
import { errorHandler } from "../../errorHandler"

const DefaultUnit = (props) => {
    const [defaultUnit, setDefaultUnit] = useState(new IndexPath(0))
    const componentMounted = useRef(true)
    
    useEffect(() => () => componentMounted.current = false, [])
    
    useEffect(() => { setDefaultUnit(new IndexPath(props.defaultUnit)) }, [props.defaultUnit])
    
    const options = React.useMemo(() => potentialUnits.map((unit, i) => <SelectItem key={'PotentialUnit + ' + unit} title={potentialUnitDescription[i] + ' (' + unit + ')'} />), [])
    
    const onSelectHandler = React.useCallback(async (index) => {
        const updateRequest = await sendRequest('UPDATE', 'SETTING', { setting: 'defaultPotentialUnit', value: index.row })
        if (updateRequest.status !== 200)
            errorHandler(623)
        else if (componentMounted.current)
            setDefaultUnit(index)
    }, [setDefaultUnit])

    return (
        <Select style={props.hidden ? styles.hidden : styles.select}
            label='Potential unit'
            onSelect={onSelectHandler}
            value={potentialUnitDescription[defaultUnit.row] + ' (' + potentialUnits[defaultUnit.row] + ')'}
            selectedIndex={defaultUnit}>
            {options}
        </Select>
    )
}

export default React.memo(DefaultUnit)

const styles = StyleSheet.create({
    defaultUnitView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingBottom: 24,
    },
    hidden: {
        display: 'none'
    },
    text: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 12,
    },
    select: {
        padding: 12
    }
})