import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from './ExportSurvey'
import { itemProperties } from "./exportFunctions"
import { items, sortingOptions } from "../../../constants/constants"
import { iconHandlerItem, titleHandlerItem } from "../../customFunctions"
import MultiSelectField from "../../_Stateless/MultiSelect"
import SelectField from '../../_Stateless/SelectField'
import { Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/GlobalStyle'
import { setExportItemType } from '../../../store/actions/exportSurvey'

const renderIcon = (name) => <Icon pack='cp' name={name} style={styles.selectIcon} fill={basic} />

const ItemProperties = (props) => {
    const dispatch = useDispatch()
    const itemType = useSelector(state => state.exportSurvey.itemType)
    const sorting = useSelector(state => state.exportSurvey.sorting)
    const selectedProperties = useSelector(state => state.exportSurvey.selectedProperties)
    const itemsList = React.useMemo(() => items.map(item => titleHandlerItem(item) + 's'), [])
    const itemAccessoryList = React.useMemo(() => items.map(i => renderIcon(iconHandlerItem(i))), [])
    const sortingList = React.useMemo(() => sortingOptions.filter((_, i) => i !== 4), [])
    const propertiesList = React.useMemo(() => itemProperties[itemType].map(p => p.value), [itemType])
    const propertyDisplayList = React.useMemo(() => itemProperties[itemType].map(p => p.label), [itemType])

    const onItemTypeChangeHandler = React.useCallback((value) => dispatch(setExportItemType(value)), [dispatch])

    return (
        <>
            <SelectField
                style={styles.select}
                label='Survey item'
                accessoryList={itemAccessoryList}
                selectedItem={items.indexOf(itemType)}
                selectAction={onItemTypeChangeHandler}
                itemsList={itemsList}
                resultList={items} />
            <SelectField
                style={styles.select}
                label='Sorted by'
                selectedItem={sorting}
                selectAction={props.updateSetting.bind(this, 'sorting')}
                itemsList={sortingList} />
            <MultiSelectField
                style={styles.select}
                label='Properties'
                placeholder='Select properties'
                selectedItems={selectedProperties}
                onSelect={props.updateSetting.bind(this, 'selectedProperties')}
                itemsList={propertiesList}
                displayList={propertyDisplayList} />
        </>
    )
}

export default React.memo(ItemProperties)