import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectField from '../../components/Select'

const ImportItemSelectField = (props) => {
    const itemsList = useSelector(state => state.importData.fields)
    const selectedIndex = useSelector(state => state.importData.itemImportedProperties[props.property] ?? null)
    const dispatch = useDispatch()

    return <SelectField
        {...props}
        valid={true}
        accessoryList={accessories}
        label={props.label + ' (from CSV)'}
        property={props.property}
        selectAction={onSelectHandler}
        itemsList={itemsList}
        selectedItem={selectedIndex} />
}
export default ImportItemSelectField