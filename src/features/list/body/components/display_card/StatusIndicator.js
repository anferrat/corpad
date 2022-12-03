import React from 'react'
import { View } from 'react-native'
import { displayCard } from './styles/displayCardStyles'

export default React.memo((props) => props.status !== 'none' ? <View style={props.status === 0 ? displayCard.statusGood : props.status === 1 ? displayCard.statusWarning : props.status === 2 ? displayCard.statusDanger : displayCard.statusBasic} /> : null)
