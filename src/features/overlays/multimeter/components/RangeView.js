import React from 'react'
import RangeToken from './RangeToken'
import WrapperNoScroll from './WrapperNoScroll'


const RangeView = ({ ranges, onSelect, updatingRange, selectedRange, updating }) => {
    return (
        <WrapperNoScroll title='Ranges'>
            {ranges.map(range =>
                <RangeToken
                    key={range}
                    range={range}
                    onSelect={onSelect}
                    selected={(range === selectedRange && updatingRange === null) || updatingRange === range}
                    inProgress={updatingRange === range}
                    disabled={updating} />)}
        </WrapperNoScroll>
    )
}


export default React.memo(RangeView)