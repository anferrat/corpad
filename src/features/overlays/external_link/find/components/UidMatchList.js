import React from 'react'
import Title from './Title'
import ListItem from './ListItem'
import { translateOverlay } from '../../../../../localization'

const UidMatchList = ({ uidMatch, navigateToView }) => {
    if (uidMatch)
        return (
            <>
                <Title
                    hint={''}
                    title={translateOverlay('externalLink.exactMatch')} />
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
