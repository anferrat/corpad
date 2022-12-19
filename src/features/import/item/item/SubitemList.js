import React from 'react'
import SubitemListItem from '../components/SubitemListItem'

const SubitemList = ({ subitems, pushToSubitem }) => {
    return (
        <>
            {subitems.map((subitem, index) => (
                <SubitemListItem
                    key={subitem.key}
                    type={subitem.type}
                    index={index}
                    onPress={pushToSubitem}
                />
            ))}
        </>
    )
}

export default React.memo(SubitemList)

