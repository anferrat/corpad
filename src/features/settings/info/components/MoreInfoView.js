import React from 'react'
import InfoListItem from './InfoListItem'
import { getFormattedDate } from '../../../../helpers/functions'
import { getDistance } from '../helpers/functions'
import { ReferenceCellCodeLabels } from '../../../../constants/labels'
import { translateSettings } from '../../../../localization'


const MoreInfoView = ({ extraInfo }) => {
    const { lastUpdated, mainReference, surveyRadius, potentials, assetCount } = extraInfo
    return (
        <>
            {mainReference ?
                <InfoListItem
                     title={translateSettings('mainReference')}
                     subtitle={ReferenceCellCodeLabels[mainReference.rcType] ?? translateSettings('unknownType')}
                    icon={'RE'}
                    pack={'cp'}
                    value={mainReference.name} /> : null}
            {lastUpdated ?
                <InfoListItem
                     title={translateSettings('lastUpdated')}
                    subtitle={getFormattedDate(lastUpdated.timeModified)}
                    icon={lastUpdated.markerType ?? lastUpdated.itemType}
                    pack={'cp'}
                    value={lastUpdated.name} /> : null}
            <InfoListItem
                 title={translateSettings('surveyArea')}
                 subtitle={translateSettings('radius')}
                icon={'map-outline'}
                value={getDistance(surveyRadius)} />
            <InfoListItem
                 title={translateSettings('potentials')}
                 subtitle={translateSettings('totalReadings')}
                icon={'grid'}
                value={potentials} />
            <InfoListItem
                 title={translateSettings('images')}
                 subtitle={translateSettings('imageAssets')}
                icon={'image'}
                value={assetCount} />
        </>
    )
}

export default MoreInfoView
