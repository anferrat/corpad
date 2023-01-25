import React from 'react'
import { useSelector } from 'react-redux'
import SubitemListItem from '../components/SubitemListItem'
import { getTypedIndex } from '../helpers/functions'
import { ImportData } from '../ImportDataProvider'
import { useContext } from 'react'

const SubitemList = () => {
    const { pushToSubitem } = useContext(ImportData)
    const subitems = useSelector(state => state.importData.subitems)
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

