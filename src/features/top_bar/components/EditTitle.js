import React from 'react'
import { useSelector } from 'react-redux'
import { getEditTitle, getEditSubtype } from '../helpers/functions'
import TopBarTitle from './TopBarTitle'
import { ItemTypes } from '../../../constants/global'
import { ItemTypeSingleIcons, TestPointTypeIcons } from '../../../constants/icons'
import { ItemTypeLabels, TestPointTypeLabels } from '../../../constants/labels'



const EditTitle = ({ itemType }) => {
    const title = useSelector(state => getEditTitle(state, itemType))
    const subType = useSelector(state => getEditSubtype(state, itemType))
    const subtitle = itemType === ItemTypes.TEST_POINT ? (subType === undefined ? 'Loading' : TestPointTypeLabels[subType]) : ItemTypeLabels[itemType]
    const icon = itemType === ItemTypes.TEST_POINT ? TestPointTypeIcons[subType] : ItemTypeSingleIcons[itemType]
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