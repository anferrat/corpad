import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListStateByType } from '../../customFunctions'
import FlatList from '../../_Stateless/List/FlatList'
import RadioListOption from '../../_Stateless/List/RadioListOption'
import { setDisplayedReading } from '../../../store/actions/list'
import { displayedReadingsValues } from '../ListFunctions'
import { Divider } from '@ui-kitten/components'



const ReadingsDisplay = (props) => {
    const dispatch = useDispatch()
    const reading = useSelector(state => getListStateByType(props.dataType, state).settings.displayedReading)
    const readingOptions = React.useMemo(() => displayedReadingsValues[props.dataType].map(v => v.title), [props.dataType])

    const updateReadingsHandler = React.useCallback((index) => {
        if (index !== reading)
            dispatch(setDisplayedReading(props.dataType, index))
        props.closeSheet()
    }, [props.closeSheet, dispatch, reading])

    const renderItem = React.useCallback(({ item, index }) => {
        return <RadioListOption
            checked={index === reading}
            onChange={updateReadingsHandler.bind(this, index)}
            title={item}
        />
    }, [reading, updateReadingsHandler])
    return (
        <FlatList
            ItemSeparatorComponent={Divider}
            data={readingOptions}
            renderItem={renderItem} />
    )
}

export default ReadingsDisplay