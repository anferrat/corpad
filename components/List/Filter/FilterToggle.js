import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Toggle, Text } from '@ui-kitten/components'
import { applyFilter } from '../../../store/actions/list'
import { getListStateByType } from '../../customFunctions'

const FilterToggle = (props) => {
    const [showChecked, setShowChecked] = useState(false)
    const checked = useSelector(state => getListStateByType(props.dataType, state).settings.appliedFilters[props.filter])
    const synced = checked === showChecked
    const dispatch = useDispatch()

    const onChecked = React.useCallback((value) => {
        setShowChecked(value)
        props.closeSheet()
    }, [props.closeSheet, setShowChecked])

    useEffect(() => {
        if (!synced)
            setShowChecked(checked)
    }, [checked])

    useEffect(() => {
        if (!synced)
            dispatch(applyFilter(props.dataType, props.filter, showChecked))
    }, [showChecked])

    return (
        <Toggle
            onChange={onChecked.bind(this, !showChecked)}
            checked={showChecked} />
    )
}

export default FilterToggle