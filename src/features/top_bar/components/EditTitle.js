import React from 'react'
import { useSelector } from 'react-redux'
import { getEditTitle, iconHandler, subtitleHandler, getEditSubtype } from '../helpers/functions'
import TopBarTitle from './TopBarTitle'



const EditTitle = ({ dataType }) => {
    const title = useSelector(state => getEditTitle(state, dataType))
    const subType = useSelector(state => getEditSubtype(state, dataType))
    return (
        <TopBarTitle
            isPrimary={false}
            title={title}
            subtitle={subtitleHandler(dataType, subType)}
            icon={iconHandler(dataType, subType)}
            pack='cp'
        />
    )
}
export default EditTitle