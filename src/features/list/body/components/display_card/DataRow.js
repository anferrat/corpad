import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { displayCard } from './styles/displayCardStyles'

const DataRow = ({ value, pack, icon, fill }) => {
    if (value === null)
        return null
    else
        return (
            <Text style={displayCard.dataText}
                appearance='hint'
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                <Icon
                    style={displayCard.iconRow}
                    pack={pack}
                    name={icon}
                    fill={fill} />
                {value}
            </Text>
        )
}


export default React.memo(DataRow)
