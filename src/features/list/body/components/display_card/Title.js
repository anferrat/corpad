import React from 'react'
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic } from '../../../../../styles/colors'
import { displayCard } from './styles/displayCardStyles'
import DataRow from './DataRow'
import { dataListIcons } from '../../../helpers/functions'


const DisplayCardTitle = ({ dataList, icon, title, subtitle }) => {
    return (
        <View style={displayCard.TitleDisplay}>
            <Text
                category='h4'
                numberOfLines={1}
                ellipsizeMode='tail'>{title}</Text>
            <Text
                style={displayCard.subtitle}
                category='p1'
                appearance='hint'>{subtitle}</Text>
            {Object.keys(dataList).map(key =>
                <DataRow
                    key={`Item data type ${key}`}
                    icon={dataListIcons[key].icon}
                    pack={dataListIcons[key].pack}
                    fill={basic}
                    value={dataList[key]}
                />)}
        </View>
    )
}

export default React.memo(DisplayCardTitle)