import React from 'react'
import useRectifierSorting from '../hooks/useRectifierSorting'
import SortingView from './SortingView'

const RectifierSorting = ({ closeSheet }) => {
    const { selectedSorting, setSelectedSorting, refresh } = useRectifierSorting({ closeSheet })

    return <SortingView
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
        closeSheet={closeSheet}
        refresh={refresh} />
}

export default RectifierSorting