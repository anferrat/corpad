import React from 'react'
import SheetHeader from '../../_Stateless/List/SheetHeader'
import SortingDisplay from './SortingDisplay'

const Sorting = (props) => {
    if (props.dataType === 'TEST_POINT')
        return (
            <>
                <SheetHeader
                    title='Sorting'
                    onCloseHandler={props.closeSheet} />
                <SortingDisplay
                    closeSheet={props.closeSheet}
                    dataType={props.dataType} />
            </>
        )
    else return null
}

export default React.memo(Sorting)