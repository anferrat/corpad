import React from 'react'
import SheetHeader from '../../_Stateless/List/SheetHeader'
import ReadingsDisplay from './ReadingsDisplay'

const Readings = (props) => {
    if (props.dataType === 'TEST_POINT' || props.dataType === 'RECTIFIER')
        return <>
            <SheetHeader
                title='Readings'
                onCloseHandler={props.closeSheet} />
            <ReadingsDisplay
                closeSheet={props.closeSheet}
                dataType={props.dataType} />
        </>
    else return null
}

export default React.memo(Readings)
