import React from 'react'
import { useTestPointFilterButton } from '../../hooks/test_point_filters/useTestPointFilterButtons'
import useTestPointFilterRouter from '../../hooks/test_point_filters/useTestPointFilterRouter'
import TestPointStatusFilter from './TestPointStatusFilter'
import Router from '../../../../../components/Router/Router'
import Route from '../../../../../components/Router/Route'
import { TestPointFilterScreens } from '../../constants/constants'
import TestPointFilterList from './TestPointFilterList'
import TestPointTestPointTypeFilter from './TestPointTypeFilter'
import TestPointReadingTypeFilter from './TestPointReadingTypeFilter'
import FilterButtons from '../FilterButtons'



const TestPointFilter = ({ closeSheet }) => {
    const { screen, navigateToScreen, goToList, applyButtonVisible } = useTestPointFilterRouter()
    const { onResetPress, resetVisible } = useTestPointFilterButton({ closeSheet })
    return (
        <>
            <Router
                selectedRoute={screen}>
                <Route
                    routeKey={TestPointFilterScreens.LIST}>
                    <TestPointFilterList
                        onPressListItem={navigateToScreen}
                        closeSheet={closeSheet} />
                </Route>
                <Route
                    routeKey={TestPointFilterScreens.STATUS_FILTER}>
                    <TestPointStatusFilter
                        key={screen === TestPointFilterScreens.STATUS_FILTER}
                        onBackPress={goToList}
                        closeSheet={closeSheet}
                        visible={screen === TestPointFilterScreens.STATUS_FILTER} />
                </Route>
                <Route
                    routeKey={TestPointFilterScreens.TEST_POINT_TYPE_FILTER}>
                    <TestPointTestPointTypeFilter
                        key={screen === TestPointFilterScreens.TEST_POINT_TYPE_FILTER}
                        onBackPress={goToList}
                        closeSheet={closeSheet}
                        visible={screen === TestPointFilterScreens.TEST_POINT_TYPE_FILTER} />
                </Route>
                <Route
                    routeKey={TestPointFilterScreens.READING_FILTER}>
                    <TestPointReadingTypeFilter
                        key={screen === TestPointFilterScreens.READING_FILTER}
                        onBackPress={goToList}
                        closeSheet={closeSheet}
                        visible={screen === TestPointFilterScreens.READING_FILTER} />
                </Route>
            </Router>
            <FilterButtons
                onResetPress={onResetPress}
                resetVisible={resetVisible}
                applyVisible={applyButtonVisible}
                closeSheet={closeSheet} />
        </>
    )
}

export default TestPointFilter
