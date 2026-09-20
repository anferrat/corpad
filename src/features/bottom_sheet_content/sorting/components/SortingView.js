import React from 'react'
import { SortingOptions } from '../../../../constants/global'
import { SortingOptionLabels } from '../../../../constants/labels'
import SheetHeader from '../../components/SheetHeader'
import RadioListItem from '../../components/RadioListItem'
import BottomSheetContentScrollView from '../../components/BottomSheetContentScrollView'
import { translateBottomSheet } from '../../../../localization'

const SortingView = ({ selectedSorting, setSelectedSorting, closeSheet, refresh, visible }) => {

    return (
        <>
            <SheetHeader
                title={translateBottomSheet('sorting')}
                onClosePress={closeSheet} />
            <BottomSheetContentScrollView isActive={visible}>
                {Object.values(SortingOptions).filter(sorting => sorting !== SortingOptions.NEAREST).map((sorting) =>
                    <RadioListItem
                        key={sorting}
                        title={SortingOptionLabels[sorting]}
                        onSelect={setSelectedSorting}
                        value={sorting}
                        checked={sorting === selectedSorting} />)}
                <RadioListItem
                    title={SortingOptionLabels[SortingOptions.NEAREST]}
                    onSelect={setSelectedSorting}
                    value={SortingOptions.NEAREST}
                    checked={selectedSorting === SortingOptions.NEAREST}
                    button={translateBottomSheet('refresh')}
                    onButtonPress={refresh} />
            </BottomSheetContentScrollView>
        </>
    )
}

export default SortingView
