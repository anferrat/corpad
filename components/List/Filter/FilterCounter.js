import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from '@ui-kitten/components'
import { getListStateByType } from '../../customFunctions'

const FilterCounter = (props) => {
    const counter = useSelector(state => getListStateByType(props.dataType, state).settings.appliedFilters[props.filter]?.length ?? 0)
    if (counter)
        return <Text category='p2'> ({counter})</Text>
    else return null
}

export default FilterCounter