import React from 'react'
import Title from './Title'
import ListItem from './ListItem'

const UidMatchList = ({ uidMatch, navigateToView }) => {
    if (uidMatch)
        return (
            <>
                <Title
                    hint={''}
                    title={'Exact match (uid)'} />
                <ListItem
                    checked={true}
                    itemType={uidMatch.itemType}
                    id={uidMatch.id}
                    name={uidMatch.name}
                    testPointType={uidMatch.testPointType}
                    status={null}
                    navigateToView={navigateToView} />
            </>
        )
    else
        return null
}

export default UidMatchList
