import React from 'react'
import InfoListItem from './InfoListItem'
import { getFormattedDate } from '../../../../helpers/functions'
import { getDistance } from '../helpers/functions'
import { ReferenceCellCodeLabels } from '../../../../constants/labels'


const MoreInfoView = ({ extraInfo }) => {
    const { lastUpdated, mainReference, surveyRadius, potentials } = extraInfo
    return (
        <>
            {mainReference ?
                <InfoListItem
                    title={'Main reference'}
                    subtitle={ReferenceCellCodeLabels[mainReference.rcType] ?? 'Unknown type'}
                    icon={'RE'}
                    pack={'cp'}
                    value={mainReference.name} /> : null}
            {lastUpdated ?
                <InfoListItem
                    title={'Last updated'}
                    subtitle={getFormattedDate(lastUpdated.timeModified)}
                    icon={lastUpdated.markerType ?? lastUpdated.itemType}
                    pack={'cp'}
                    value={lastUpdated.name} /> : null}
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