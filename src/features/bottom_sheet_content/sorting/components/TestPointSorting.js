import React from 'react'
import useTestPointSorting from '../hooks/useTestPointSorting'
import SortingView from './SortingView'

const TestPointSorting = ({ closeSheet }) => {
    const { selectedSorting, setSelectedSorting, refresh } = useTestPointSorting({ closeSheet })

    return <SortingView
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
        closeSheet={closeSheet}
        refresh={refresh} />
}

export default TestPointSorting