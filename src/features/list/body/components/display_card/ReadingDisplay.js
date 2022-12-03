import React from 'react'
import { Pressable, View } from 'react-native'
import { androidRipple } from '../../../../../styles/styles'
import { displayCard } from './styles/displayCardStyles'
import DataRow from './DataRow'
import { displayedReadingsValues } from '../../../helpers/functions'

const renderDataRows = (dataList, uid, dataType, reading) => {
    if (dataList && dataList !== 'none') {
        const single = !Array.isArray(displayedReadingsValues[dataType][reading].icon)
        return <>
            {dataList.map((value, i) => <DataRow
                pack={displayedReadingsValues[dataType][reading].pack}
                key={uid + '-' + i}
                fill={'#9ca9cb'}
                iconName={single ? displayedReadingsValues[dataType][reading].icon : displayedReadingsValues[dataType][reading].icon[i]}
                value={value}
                unitSuperscript={displayedReadingsValues[dataType][reading]?.unitSuperscript} // not ideal, but we hardly be using more units with supercript and subcripts, if so, change it
            />)}
        </>
    }
    else return null
}


const ReadingDisplay = (props) => {
    if (props?.readingList !== 'none' && props?.readingList[props.readingIndex]?.readings !== 'none') {
        return (
            <View style={displayCard.ReadingDisplay}>
                <View style={displayCard.ReadingDisplayRoundBorder}>
                    <Pressable
                        style={displayCard.ReadingDisplayPressable}
                        android_ripple={androidRipple}
                        onPress={props.onPress}>
                        {renderDataRows(props.readingList[props.readingIndex]?.readings, props.uid, props.dataType, props.displayedReading)}
                    </Pressable>
                </View>
            </View>
        )
    }
    else return null

}

export default React.memo(ReadingDisplay)

