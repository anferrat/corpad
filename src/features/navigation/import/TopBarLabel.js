import React from 'react'
import { Text } from '@ui-kitten/components'
import ItemTitle from '../../../components/ItemTitle'
import { fieldProperties } from '../../../constants/fieldProperties'
import { labels } from '../../../constants/constants'

const TopBarLabel = ({ params }) => {
    if (params?.property)
        return (
            <ItemTitle
                control={true}
                title={`Property: "${fieldProperties[params.property]?.label ?? null}"`}
                subtitle={'Import from .csv'} />
        )
    else if (params?.itemType)
        return (
            <ItemTitle
                control={true}
                title={labels[params.itemType].label ?? null}
                subtitle={'Import from .csv'} />)
    else return <Text category='h5' status='control'>Import from .csv</Text>
}

export default TopBarLabel