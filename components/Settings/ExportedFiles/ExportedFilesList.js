import React from 'react'
import { View, Text } from 'react-native'
import ExportedFileListItem from '../../_Stateless/Settings/ExportedFileListItem'

const ExportedFilesList = (props) => {
    return (
        <>
        <ExportedFileListItem  fileName='MyName' fileSize='2444' type='kml'/>
        <ExportedFileListItem  fileName='MyName' fileSize='2444' type='kml'/>
        </>
    )
}

export default ExportedFilesList