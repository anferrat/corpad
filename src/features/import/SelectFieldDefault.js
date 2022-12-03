import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImportItemProperty } from '../../store/actions/importData'
import SelectField from '../../components/Select'

const SelectFieldDefault = (props) => {
    const selectedIndex = useSelector(state => state.importData.item[props.property] ?? null)
    const dispatch = useDispatch()

    const onSelectHandler = (selectedIndex, property) => dispatch(setImportItemProperty(property, selectedIndex))
    return <SelectField
        {...props}
        property={props.property}
        selectAction={onSelectHandler}
        selectedItem={selectedIndex} />
}
export default SelectFieldDefault