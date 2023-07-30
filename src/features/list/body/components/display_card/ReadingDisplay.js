import React from 'react'
import { View } from 'react-native'
import { androidRipple } from '../../../../../styles/styles'
import { displayCard } from './styles/displayCardStyles'
import ReadingRow from './ReadingRow'
import Pressable from '../../../../../components/Pressable'


const ReadingDisplay = ({ readingList, readingIndex, onPress, displayedReading, itemType }) => {
    if (readingList.length && readingIndex !== -1 && (readingList[readingIndex].v1 !== null || (readingList[readingIndex].v2 !== null && readingList[readingIndex].v2 !== undefined))) {
        return (
            <View style={displayCard.ReadingDisplay}>
                <View style={displayCard.ReadingDisplayRoundBorder}>
                    <Pressable
                        style={displayCard.ReadingDisplayPressable}
                        android_ripple={androidRipple}
                        onPress={onPress}>
                        <ReadingRow
                            index={0}
                            displayedReading={displayedReading}
                            value={readingList[readingIndex].v1}
                            itemType={itemType} />
                        <ReadingRow
                            index={1}
                            displayedReading={displayedReading}
                            value={readingList[readingIndex].v2}
                            itemType={itemType} />
                    </Pressable>
                </View>
            </View>
        )
    }
    else return null

}

export default React.memo(ReadingDisplay)

