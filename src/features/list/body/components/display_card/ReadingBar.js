import React from 'react'
import { View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { displayCard } from './styles/displayCardStyles'
import { basic, primary } from '../../../../../styles/colors'

const MAX_ICONS_IN_BAR = 3 //it's actually +1

const renderReadingIcons = (iconsArray, readingIndex) =>
    <View style={displayCard.readingBarIcons}>
        {iconsArray.map((item, i) => {
            if (i > MAX_ICONS_IN_BAR)
                return null
            else return <Icon
                pack='cp'
                key={'ReadingId - ' + item.uid}
                name={item.iconName}
                fill={i === readingIndex ? primary : basic}
                style={i === readingIndex ? displayCard.selectedBarIcon : displayCard.icon} />
        })}
        {iconsArray.length > MAX_ICONS_IN_BAR ? <Text style={displayCard.iconText}>...</Text> : null}
    </View>


const ReadingBar = (props) => {
    if (props.readingList !== 'none' && props.readingList.length > 0 && !props.hide)
        return (
            <>
                <Text category={'s2'} appearance='hint' numberOfLines={1} ellipsizeMode='tail'>{props.readingList[props.readingIndex]?.name ?? null}</Text>
                {renderReadingIcons(props.readingList, props.readingIndex)}
            </>
        )
    else return null
}


export default React.memo(ReadingBar)
