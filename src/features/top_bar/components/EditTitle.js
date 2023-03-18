import React from 'react'
import { useSelector } from 'react-redux'
import { getEditTitle, iconHandler, subtitleHandler, getEditSubtype } from '../helpers/functions'
import TopBarTitle from './TopBarTitle'



const EditTitle = ({ itemType }) => {
    const title = useSelector(state => getEditTitle(state, itemType))
    const subType = useSelector(state => getEditSubtype(state, itemType))
    return (
        <TopBarTitle
            isPrimary={false}
            title={title}
            subtitle={subtitleHandler(itemType, subType)}
            icon={iconHandler(itemType, subType)}
            pack='cp' />
    )
}
export default EditTitle