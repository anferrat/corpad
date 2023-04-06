import React from 'react'
import { View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { displayCard } from './styles/displayCardStyles'
import { basic, primary } from '../../../../../styles/colors'

const MAX_ICONS_IN_BAR = 4

const ReadingBar = ({ readingIndex, readingList }) => {
    if (readingList.length)
        return (
            <>
                <Text
                    category={'s2'}
                    appearance='hint'
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {readingList[readingIndex] && readingList[readingIndex].name}</Text>
                <View style={displayCard.readingBarIcons}>
                    {readingList.filter((_, index) => index < MAX_ICONS_IN_BAR)
                        .map(({ type, uid }, i) => {
                            const selected = i === readingIndex
                            return (
                                <Icon
                                    pack='cp'
                                    key={'ReadingId - ' + uid}
                                    name={type}
                                    fill={selected ? primary : basic}
                                    style={selected ? displayCard.selectedBarIcon : displayCard.icon} />)
                        })}
                    {readingList.length > MAX_ICONS_IN_BAR ?
                        <Text style={readingIndex >= MAX_ICONS_IN_BAR
                            ? displayCard.iconTextSelected :
                            displayCard.iconText}>...</Text>
                        : null}
                </View>
            </>
        )
    else return null
}


export default React.memo(ReadingBar)
