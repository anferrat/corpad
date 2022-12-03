import React from 'react'
import { useDispatch } from 'react-redux'
import FilterList from './FilterList'
import FilterDisplay from './FilterDisplay'
import { setFilterView } from '../../../../store/actions/list'
import FilterButtons from './FilterButtons'
import FilterTitle from './FilterTitle'

export const filterOptions = {
    TEST_POINT:
        [{ title: 'Status', property: 'statusFilter' },
        { title: 'Test point type', property: 'testPointTypeFilter' },
        { title: 'Readings', property: 'readingTypeFilter' },
        ],
    RECTIFIER: [],
    PIPELINE: []
}


const Filter = (props) => {
    const dispatch = useDispatch()
    const backAction = () => dispatch(setFilterView(props.dataType, 0))
    const filter = filterOptions[props.dataType]
    if (filter.length !== 0)
        return <>
            <FilterTitle
                dataType={props.dataType}
                closeSheet={props.closeSheet}
                backAction={backAction} />
            <FilterList
                closeSheet={props.closeSheet}
                dataType={props.dataType} />
            {filter.map((_, i) => <FilterDisplay
                key={filter[i].property}
                dataType={props.dataType}
                filterViewIndex={i + 1}
                filter={filter[i].property} />)}
            <FilterButtons
                dataType={props.dataType}
                closeSheet={props.closeSheet} />
        </>
    else
        return null
}

export default React.memo(Filter)

