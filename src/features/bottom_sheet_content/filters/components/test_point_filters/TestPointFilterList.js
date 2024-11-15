import React from 'react'
import FilterListItem from '../FilterListItem'
import { useTestPointFilterCounter } from '../../hooks/test_point_filters/useTestPointFilterCounter'
import { TestPointFilterScreens } from '../../constants/constants'
import ToggleListItem from '../ToggleListItem'
import { useTestPointHideEmptyToggleFilter } from '../../hooks/test_point_filters/useTestPointHideEmptyToggleFilter'
import SheetHeader from '../../../components/SheetHeader'


const TestPointFilterList = ({ onPressListItem, closeSheet }) => {
    const { statusCounter, readingCounter, testPointTypeCounter } = useTestPointFilterCounter()
    const { onApply, filter } = useTestPointHideEmptyToggleFilter({ closeSheet })
    return (
        <>
            <SheetHeader
                title='Filters'
                onClosePress={closeSheet} />
            <FilterListItem
                title='Status'
                onPress={onPressListItem}
                counter={statusCounter}
                routeKey={TestPointFilterScreens.STATUS_FILTER}
                disabled={false} />
            <FilterListItem
                title='Test point type'
                onPress={onPressListItem}
                counter={testPointTypeCounter}
                routeKey={TestPointFilterScreens.TEST_POINT_TYPE_FILTER}
                disabled={false} />
            <FilterListItem
                title='Readings'
                onPress={onPressListItem}
                counter={readingCounter}
                routeKey={TestPointFilterScreens.READING_FILTER}
                disabled={false} />
            <ToggleListItem
                title='Hide test points without readings'
                onApply={onApply}
                isChecked={filter}
                disabled={false}
            />
        </>
    )
}

export default TestPointFilterList
