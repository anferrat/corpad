import React from 'react'
import { useSelector } from 'react-redux'
import { getEditTitle, iconHandler, subtitleHandler, getEditSubtype } from '../helpers/functions'
import TopBarTitle from './TopBarTitle'
import { labels, testPointTypeCodes } from '../../../constants/constants'



const EditTitle = ({ itemType }) => {
    const title = useSelector(state => getEditTitle(state, itemType))
    const subType = useSelector(state => getEditSubtype(state, itemType))
    const subtitle = itemType === 'TEST_POINT' ? (subType === undefined ? 'Loading' : labels[testPointTypeCodes[subType]].label) : labels[itemType].label
    const icon = itemType === 'TEST_POINT' ? testPointTypeCodes[subType] : itemType
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