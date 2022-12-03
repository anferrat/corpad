import React from 'react'
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic } from '../../../../../styles/colors'
import { displayCard } from './styles/displayCardStyles'
import DataRow from './DataRow'
import { getIconByFieldType } from '../../../../../helpers/functions'


const renderDataRows = (dataList, id) => <>
    {dataList.map(data => <DataRow
        key={id + '-' + data.type}
        iconName={getIconByFieldType(data.type).icon}
        pack={getIconByFieldType(data.type).pack}
        fill={basic}
        value={data.value}
    />)}
</>

const DisplayCardTitle = (props) => {
    return (
        <View style={displayCard.TitleDisplay}>
            <Text
                category='h5'
                numberOfLines={1}
                ellipsizeMode='tail'>{props.title}</Text>
            <Text
                style={displayCard.subtitle}
                category='p1'
                appearance='hint'>{props.subtitle}</Text>
            {renderDataRows(props.dataList, props.uid)}
        </View>
    )
}

export default React.memo(DisplayCardTitle)