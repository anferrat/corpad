import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { displayCard } from './styles/displayCardStyles'
import DisplayCardTitle from './Title'
import StatusIndicator from './StatusIndicator'
import ReadingBar from './ReadingBar'
import ReadingDisplay from './ReadingDisplay'
import { nextReading, firstReading } from '../../../helpers/functions'
import { androidRipple } from '../../../../../styles/styles'
import Pressable from '../../../../../components/Pressable'

const DisplayCard = ({ id, dataList, subtitle, timeModified, status, onPress, name, firstReadingIndex, displayedReading, icon, readingList, itemType }) => {
    const [readingIndex, setReadingIndex] = useState(() => firstReading(readingList))

    const toggleReading = () => setReadingIndex(r => nextReading(r, readingList))

    return (
        <Pressable
            style={displayCard.pressable}
            android_ripple={androidRipple}
            onPress={onPress}>
            <View style={displayCard.Card}>
                <View style={displayCard.StatusAndTitleView}>
                    <StatusIndicator
                        status={status} />
                    <DisplayCardTitle
                        dataList={dataList}
                        title={name}
                        subtitle={subtitle}
                        icon={icon} />
                </View>
                <ReadingDisplay
                    itemType={itemType}
                    displayedReading={displayedReading}
                    readingList={readingList}
                    readingIndex={readingIndex}
                    onPress={toggleReading} />
            </View>
            <View style={readingList.length ? displayCard.readingBar : displayCard.hidden}>
                <ReadingBar
                    readingIndex={readingIndex}
                    readingList={readingList} />
            </View>
        </Pressable>
    )
}


export default React.memo(DisplayCard, (prev, next) => prev.timeModified === next.timeModified)

