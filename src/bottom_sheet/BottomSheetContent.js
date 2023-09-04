import React from 'react'
import Sorting from '../features/list/header/sorting/Sorting'
import Readings from '../features/list/header/readings/Readings'
import Filter from '../features/list/header/filter/Filter'
import { CreateItemSheet } from '../features/create_item'
import { MenuSheet } from '../features/survey_menu'
import MoreOptionsSheet from '../features/navigation/more_options/MoreOptionsSheet'
import useBottomSheetContent from './hooks/useBottomSheet'
import Router from './components/Router'
import Route from './components/Route'
import ImagePickerView from '../features/image_picker'

//implemented as single screen, possible to have embeded navigator inside

const BottomSheetContent = () => {
    const { selectedRoute, params, navigateToImport, navigateToEdit, navigateToSettings, navigateToExport, navigateToExportedFiles, navigateToCalculatorList, navigateToMultimeter, closeSheet } = useBottomSheetContent()
    return (
        <Router
            selectedRoute={selectedRoute}>
            <Route
                routeKey='CREATE'>
                <CreateItemSheet
                    navigateToEdit={navigateToEdit}
                    closeSheet={closeSheet}
                    navigateToImport={navigateToImport} />
            </Route>
            <Route
                routeKey='MENU'>
                <MenuSheet
                    navigateToMultimeter={navigateToMultimeter}
                    navigateToExport={navigateToExport}
                    navigateToCalculatorList={navigateToCalculatorList}
                    navigateToSettings={navigateToSettings}
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='TEST_POINT_FILTER'>
                <Filter
                    dataType={'TEST_POINT'}
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='TEST_POINT_SORTING'>
                <Sorting
                    dataType={'TEST_POINT'}
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='TEST_POINT_READINGS'>
                <Readings
                    dataType='TEST_POINT'
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='RECTIFIER_READINGS'>
                <Readings
                    dataType='RECTIFIER'
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='BASIC_MENU'>
                <MoreOptionsSheet
                    navigateToMultimeter={navigateToMultimeter}
                    navigateToExportedFiles={navigateToExportedFiles}
                    navigateToCalculatorList={navigateToCalculatorList}
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='IMAGE_PICKER'>
                <ImagePickerView
                    closeSheet={closeSheet}
                    params={params} />
            </Route>
        </Router>
    )

}


export default BottomSheetContent
