import React from 'react'
import { useSelector } from 'react-redux'
import FilterButton from '../../_Stateless/List/FilterButton'
import { getListStateByType } from '../../customFunctions'

const FilterHeaderButton = (props) => {
    const counter = useSelector(state => getListStateByType(props.dataType, state).settings.filterCounter ?? 0)
    if (props.dataType === 'TEST_POINT')
        return <FilterButton
            icon='funnel-outline'
            onPress={props.openSheet}
            title={`Filter${counter ? ` (${counter})` : ''}`}
        />
    else return null
}


export default FilterHeaderButton
