import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { displayCard } from '../../../styles/GlobalStyle'

const DataRow = (props) => {
    if (props.value === null)
        return null
    else
        return (
            <Text style={displayCard.dataText} appearance='hint' numberOfLines={1} ellipsizeMode={'tail'}>
                <Icon
                    pack={props.pack}
                    name={props.iconName}
                    fill={props.fill}
                    style={displayCard.iconRow} />{props.value}</Text>
        )
}


export default React.memo(DataRow)
