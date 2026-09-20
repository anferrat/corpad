import React, { useMemo } from 'react'
import SheetHeader from '../../../components/SheetHeader'
import { useMarkerTypeFilter } from '../../hooks/map_filters/useTestPointTypeFilter'
import { useFilter } from '../../hooks/useFilter'
import { ItemTypes, TestPointTypes } from '../../../../../constants/global'
import { ItemTypeLabels, TestPointTypeLabels } from '../../../../../constants/labels'
import { Divider } from '@ui-kitten/components'
import { ItemTypeIcons, TestPointTypeIcons } from '../../../../../constants/icons'
import { FlashList } from '@shopify/flash-list'
import CheckBoxListItem from '../CheckBoxListItem'
import { translateBottomSheet } from '../../../../../localization'

const MapMarkerFilterItems = [
    TestPointTypes.TEST_STATION,
    ItemTypes.RECTIFIER,
    TestPointTypes.JUNCTION_BOX,
    TestPointTypes.HEADER,
    TestPointTypes.MEASURMENT,
    TestPointTypes.FIELD_NOTE
]
const MapMarkerFilterItemIcons = [
    TestPointTypeIcons[TestPointTypes.TEST_STATION],
    ItemTypeIcons[ItemTypes.RECTIFIER],
    TestPointTypeIcons[TestPointTypes.JUNCTION_BOX],
    TestPointTypeIcons[TestPointTypes.HEADER],
    TestPointTypeIcons[TestPointTypes.MEASURMENT],
    TestPointTypeIcons[TestPointTypes.FIELD_NOTE]
]



const MapMarkerTypeFilter = ({ onBackPress, closeSheet, visible }) => {
    const { filter, onApply } = useMarkerTypeFilter()
    const { notSelected, onChange } = useFilter({ excluded: filter, visible, onApply })
    const mapMarkerFilterItemLabels = useMemo(() => [
        TestPointTypeLabels[TestPointTypes.TEST_STATION],
        ItemTypeLabels[ItemTypes.RECTIFIER],
        TestPointTypeLabels[TestPointTypes.JUNCTION_BOX],
        TestPointTypeLabels[TestPointTypes.HEADER],
        TestPointTypeLabels[TestPointTypes.MEASURMENT],
        TestPointTypeLabels[TestPointTypes.FIELD_NOTE]
    ], [])

    const renderItem = ({ item, index }) => <CheckBoxListItem
        key={item}
        icon={MapMarkerFilterItemIcons[index]}
        onChange={onChange}
        checked={!~notSelected.indexOf(item)}
        value={item}
        status={'primary'}
        pack={'cp'}
        title={mapMarkerFilterItemLabels[index]}
    />

    return (
        <>
            <SheetHeader
                title={translateBottomSheet('markerType')}
                onBackPress={onBackPress}
                onClosePress={closeSheet} />
            <FlashList
                data={MapMarkerFilterItems}
                renderItem={renderItem}
                estimatedItemSize={60}
                extraData={notSelected}
                ItemSeparatorComponent={Divider}
            />
        </>
    )
}

export default MapMarkerTypeFilter
