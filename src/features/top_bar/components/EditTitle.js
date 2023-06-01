import React from 'react'
import { useSelector } from 'react-redux'
import TopBarTitle from './TopBarTitle'
import { ItemTypes } from '../../../constants/global'
import { ItemTypeSingleIcons, TestPointTypeIcons } from '../../../constants/icons'
import { ItemTypeLabels, TestPointTypeLabels } from '../../../constants/labels'



const EditTitle = ({ itemType }) => {
    const title = useSelector(state => state.item.edit.name ?? state.item.edit.defaultName ?? 'Loading...')
    const subType = useSelector(state => itemType === ItemTypes.TEST_POINT ? state.item.edit.testPointType : itemType)
    const subtitle = itemType === ItemTypes.TEST_POINT ? (TestPointTypeLabels[subType] ?? '') : ItemTypeLabels[subType]
    const icon = itemType === ItemTypes.TEST_POINT ? TestPointTypeIcons[subType] : ItemTypeSingleIcons[subType]
    return (
        <TopBarTitle
            isPrimary={false}
            title={title}
            subtitle={subtitle}
            icon={icon}
            pack='cp' />
    )
}
export default EditTitle