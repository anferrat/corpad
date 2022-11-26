import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImportItemProperty } from '../../store/actions/importData'
import { basic } from '../../styles/GlobalStyle'
import SelectField from '../_Stateless/SelectField'
import { Icon } from '@ui-kitten/components'

const ImportItemSelectField = (props) => {
    const itemsList = useSelector(state => state.importData.fields)
    const selectedIndex = useSelector(state => state.importData.itemImportedProperties[props.property] ?? null)
    const dispatch = useDispatch()
    const accessories = React.useMemo(() => itemsList.map(() => <Icon name='file-text-outline' fill={basic} style={{ width: 20, height: 20 }} />), [itemsList.length])

    const onSelectHandler = (selectedIndex, property) => dispatch(setImportItemProperty(property, selectedIndex, true))
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