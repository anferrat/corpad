import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { basic, displayCard } from '../../../styles/GlobalStyle'
import DataRow from './DataRow'
import { View } from 'react-native'
import { getIconByFieldType } from '../../customFunctions'


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

export default DisplayCardTitle