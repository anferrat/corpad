import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider } from '@ui-kitten/components'
import { getListStateByType } from '../../../../helpers/functions'
import FlatList from '../components/FlatList'
import RadioListOption from '../components/RadioListOption'
import { setDisplayedReading } from '../../../../store/actions/list'
import { displayedReadingsValues } from '../../helpers/functions'


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