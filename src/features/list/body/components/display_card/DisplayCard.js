import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { displayCard } from './styles/displayCardStyles'
import DisplayCardTitle from './Title'
import StatusIndicator from './StatusIndicator'
import ReadingBar from './ReadingBar'
import ReadingDisplay from './ReadingDisplay'
import { nextReading } from '../../../helpers/functions'
import { androidRipple } from '../../../../../styles/styles'


const DisplayCard = (props) => {
    const [readingIndex, setReadingIndex] = useState(props.firstReadingIndex)
    useEffect(() => {
        if (readingIndex !== props.firstReadingIndex) {
            setReadingIndex(props.firstReadingIndex)
        }
    }, [props.readingList]) // updates reading index in case of updates in the card. we don't care if reading index is updated as long as list of readings stays the same
    const toggleReading = React.useCallback(() => setReadingIndex(r => nextReading(r, props.readingList)), [props.readingList])
    return (
        <Pressable
            style={displayCard.pressable}
            android_ripple={androidRipple}
            onPress={props.onPress}>
            <View style={displayCard.Card}>
                <View style={displayCard.StatusAndTitleView}>
                    <StatusIndicator
                        status={props.status} />
                    <DisplayCardTitle
                        dataList={props.dataList}
                        uid={props.uid}
                        title={props.name}
                        subtitle={props.subtitle}
                        iconName={props.mainIcon} />
                </View>
                <ReadingDisplay
                    dataType={props.dataType}
                    displayedReading={props.displayedReading}
                    readingList={props.readingList}
                    readingIndex={readingIndex}
                    onPress={toggleReading} />
            </View>
            <View style={props.readingList !== 'none' ? displayCard.readingBar : displayCard.hidden}>
                <ReadingBar
                    readingIndex={readingIndex}
                    readingList={props.readingList} />
            </View>
        </Pressable>
    )
}


export default React.memo(DisplayCard, (prev, next) => prev.timeModified === next.timeModified)

