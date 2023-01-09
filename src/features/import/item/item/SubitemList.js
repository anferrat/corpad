import React from 'react'
import SubitemListItem from '../components/SubitemListItem'
import { getTypedIndex } from '../helpers/functions'

const SubitemList = ({ subitems, pushToSubitem }) => {
    return (
        <>
            {subitems.map((subitem, index) => (
                <SubitemListItem
                    key={subitem.key}
                    typedIndex={getTypedIndex(subitems, index)}
                    type={subitem.type}
                    index={index}
                    onPress={pushToSubitem}
                />))}
        </>
    )
}

export default React.memo(SubitemList)

