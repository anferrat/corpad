import React from 'react'
import { useSelector } from 'react-redux'
import ReadingButton from '../components/ReadingButton'
import { getListStateByType } from '../../../../helpers/functions'

const ReadingsHeaderButton = (props) => {
    const reading = useSelector(state => getListStateByType(props.dataType, state).settings.displayedReading ?? 0)
    return <ReadingButton
        onPress={props.openSheet}
        dataType={props.dataType}
        reading={reading}
    />
}


export default ReadingsHeaderButton
