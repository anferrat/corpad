import React from 'react'
import { displayCard } from '../../../styles/GlobalStyle'
import { View } from 'react-native'

export default React.memo((props) => props.status !== 'none' ? <View style={props.status === 0 ? displayCard.statusGood : props.status === 1 ? displayCard.statusWarning : props.status === 2 ? displayCard.statusDanger : displayCard.statusBasic} /> : null)
