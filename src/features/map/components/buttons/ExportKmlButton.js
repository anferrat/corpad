import React from 'react'
import MapButton from './MapButton'
import useMarkerExport from '../../hooks/useMarkerExport'

const ExportKmlButton = ({ loading }) => {
    const { exporting, exportHandler } = useMarkerExport()
    return <MapButton
        disabled={(exporting || loading)}
        icon={exporting ? 'spinner' : 'download'}
        onPress={exportHandler} />
}

export default React.memo(ExportKmlButton)