import React from 'react'
import { useSelector } from 'react-redux'
import TopBarTitle from './TopBarTitle'
import { SubitemTypeIcons, } from '../../../constants/icons'
import { SubitemTypeLabels } from '../../../constants/labels'


const EditSubitemTitle = ({ subitemType }) => {
    const title = useSelector(state => state.subitem.name ?? state.subitem.defaultName ?? 'Loading')
    const subtitle = SubitemTypeLabels[subitemType]
    const icon = SubitemTypeIcons[subitemType]

    return (
        <TopBarTitle
            isPrimary={false}
            title={title}
            subtitle={subtitle}
            icon={icon}
            pack='cp' />
    )
}
export default EditSubitemTitle