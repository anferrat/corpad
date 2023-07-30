import React from 'react'
import { useSelector } from 'react-redux'
import ReadingButton from '../components/ReadingButton'
import { getListStateByType } from '../../../../helpers/functions'
import { ItemTypes } from '../../../../constants/global'

const ReadingsHeaderButton = (props) => {
    const reading = useSelector(state => getListStateByType(props.dataType, state).settings.displayedReading ?? 0)
    if (props.dataType !== ItemTypes.PIPELINE)
        return <ReadingButton
            onPress={props.openSheet}
            dataType={props.dataType}
            reading={reading}
        />
    else return null
}


export default ReadingsHeaderButton
