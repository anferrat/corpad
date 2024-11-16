import React from 'react'
import { CreateItemSheet } from '../features/create_item'
import { MenuSheet } from '../features/survey_menu'
import MoreOptionsSheet from '../features/navigation/more_options/MoreOptionsSheet'
import useBottomSheetContent from './hooks/useBottomSheet'
import Router from '../components/Router/Router'
import Route from '../components/Router/Route'
import ImagePickerView from '../features/image_picker'
import { TestPointFilter } from '../features/bottom_sheet_content/filters'
import { RectifierReadingList, TestPointReadingList } from '../features/bottom_sheet_content/readings'
import { RectifierSorting, TestPointSorting } from '../features/bottom_sheet_content/sorting'

//implemented as single screen, possible to have embeded navigator inside

const BottomSheetContent = () => {
    const { selectedRoute, params, navigateToImport, navigateToEdit, navigateToSettings, navigateToExport, navigateToExportedFiles, navigateToCalculatorList, navigateToMultimeter, navigateToExternalLinkSettings, closeSheet } = useBottomSheetContent()
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
                <TestPointFilter
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='TEST_POINT_SORTING'>
                <TestPointSorting
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='RECTIFIER_SORTING'>
                <RectifierSorting
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='TEST_POINT_READINGS'>
                <TestPointReadingList
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='RECTIFIER_READINGS'>
                <RectifierReadingList
                    closeSheet={closeSheet} />
            </Route>
            <Route
                routeKey='BASIC_MENU'>
                <MoreOptionsSheet
                    navigateToExternalLinkSettings={navigateToExternalLinkSettings}
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
