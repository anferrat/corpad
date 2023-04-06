import React from 'react'
import InfoListItem from './InfoListItem'
import { referenceCellCodes } from '../../../../constants/constants'
import { getDistance, getFormattedDate } from '../../../../helpers/functions'


const MoreInfoView = ({ extraInfo }) => {
    const { lastUpdated, mainReference, surveyRadius, potentials } = extraInfo
    return (
        <>
            <InfoListItem
                title={'Main reference'}
                subtitle={referenceCellCodes[mainReference.rcType] ?? 'Unknown type'}
                icon={'RE'}
                pack={'cp'}
                value={mainReference.name} />
            <InfoListItem
                title={'Last updated'}
                subtitle={getFormattedDate(lastUpdated.timeModified)}
                icon={lastUpdated.markerType ?? lastUpdated.itemType}
                pack={'cp'}
                value={lastUpdated.name} />
            <InfoListItem
                title={'Survey area'}
                subtitle={'Radius'}
                icon={'map-outline'}
                value={getDistance(surveyRadius)} />
            <InfoListItem
                title={'Potentials'}
                subtitle={'Total numbr of readings'}
                icon={'grid'}
                value={potentials} />
        </>
    )
}

export default MoreInfoView