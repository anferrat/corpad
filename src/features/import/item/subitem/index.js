import React from 'react'
import SubitemView from './Subitem'
import { ImportDataProvider } from '../ImportDataProvider'

export const ImportSubitem = ({ subitemIndex, navigateToParameters, goBack }) => {
    return (
        <ImportDataProvider
            subitemIndex={subitemIndex}
            navigateToParameters={navigateToParameters}
            goBack={goBack}>
            <SubitemView />
        </ImportDataProvider>
    )
}