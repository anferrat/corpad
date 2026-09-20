import React from 'react'
import FilterListItem from '../FilterListItem'
import { useTestPointFilterCounter } from '../../hooks/test_point_filters/useTestPointFilterCounter'
import { TestPointFilterScreens } from '../../constants/constants'
import ToggleListItem from '../ToggleListItem'
import { useTestPointHideEmptyToggleFilter } from '../../hooks/test_point_filters/useTestPointHideEmptyToggleFilter'
import SheetHeader from '../../../components/SheetHeader'
import { translateBottomSheet } from '../../../../../localization'


const TestPointFilterList = ({ onPressListItem, closeSheet }) => {
    const { statusCounter, readingCounter, testPointTypeCounter, pipelineCounter } = useTestPointFilterCounter()
    const { onApply, filter } = useTestPointHideEmptyToggleFilter({ closeSheet })
    return (
        <>
            <SheetHeader
                title={translateBottomSheet('filters')}
                onClosePress={closeSheet} />
            <FilterListItem
                title={translateBottomSheet('status')}
                onPress={onPressListItem}
                counter={statusCounter}
                routeKey={TestPointFilterScreens.STATUS_FILTER}
                disabled={false} />
            <FilterListItem
                title={translateBottomSheet('testPointType')}
                onPress={onPressListItem}
                counter={testPointTypeCounter}
                routeKey={TestPointFilterScreens.TEST_POINT_TYPE_FILTER}
                disabled={false} />
            <FilterListItem
                title={translateBottomSheet('readings')}
                onPress={onPressListItem}
                counter={readingCounter}
                routeKey={TestPointFilterScreens.READING_FILTER}
                disabled={false} />
            <FilterListItem
                title={translateBottomSheet('pipelines')}
                onPress={onPressListItem}
                counter={pipelineCounter}
                routeKey={TestPointFilterScreens.PIPELINE_FILTER}
                disabled={false} />
            <ToggleListItem
                title={translateBottomSheet('hideEmptyTestPoints')}
                onApply={onApply}
                isChecked={filter}
                disabled={false}
            />
        </>
    )
}

export default TestPointFilterList
