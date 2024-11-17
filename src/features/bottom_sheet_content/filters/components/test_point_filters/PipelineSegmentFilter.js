import React from 'react'
import SheetHeader from '../../../components/SheetHeader'
import { useTestPointPipelineFilter } from '../../hooks/test_point_filters/useTestPointPipelineFilter'
import { useFilter } from '../../hooks/useFilter'
import CheckBoxListItem from '../CheckBoxListItem'
import { ItemTypeIcons } from '../../../../../constants/icons'
import { FlashList } from '@shopify/flash-list'
import { Divider } from '@ui-kitten/components'
import LoadingView from '../../../../../components/LoadingView'




const PipelineSegmentFilter = ({ onBackPress, closeSheet, visible }) => {
    const { onApply, filter, isLoading, pipelines } = useTestPointPipelineFilter({ visible })
    const { notSelected, onChange } = useFilter({ excluded: filter, visible, onApply })

    const renderItem = ({ item }) =>
        <CheckBoxListItem
            key={item.uid + item.name}
            icon={ItemTypeIcons.PIPELINE}
            onChange={onChange}
            checked={!~notSelected.indexOf(item.id)}
            value={item.id}
            status={'primary'}
            pack={'cp'}
            title={item.name} />

    return (
        <>
            <SheetHeader
                title='Pipelines'
                onBackPress={onBackPress}
                onClosePress={closeSheet} />
            <LoadingView
                loading={isLoading}>
                <FlashList
                    data={pipelines}
                    renderItem={renderItem}
                    estimatedItemSize={60}
                    extraData={notSelected}
                    ItemSeparatorComponent={Divider} />
            </LoadingView>
        </>
    )
}

export default PipelineSegmentFilter
