import React from 'react'
import { View } from 'react-native'
import { displayCard } from './styles/displayCardStyles'

export default React.memo(({ status }) =>
    status !== null ?
        <View style={status === 0 ?
            displayCard.statusGood
            : status === 1
                ? displayCard.statusWarning
                : status === 2
                    ? displayCard.statusDanger
                    : displayCard.statusBasic} /> : null)
