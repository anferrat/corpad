import React, { useEffect, useState } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { androidRipple} from '../../../styles/GlobalStyle'
import { nextReading } from '../../List/ListFunctions'
import { basic300, success, warning, danger, basic, primary } from '../../../styles/GlobalStyle'
import { Text, Icon } from '@ui-kitten/components'
import { displayedReadingsValues } from '../../List/ListFunctions'

//Optimized version of displaycard for flatList. ugly but works way faster then DisplayCard. 


const DisplayCard = (props) => {
    const [readingIndex, setReadingIndex] = useState(props.firstReadingIndex)
    useEffect(() => {
        if (readingIndex !== props.firstReadingIndex) {
            setReadingIndex(props.firstReadingIndex)
        }
    }, [props.readingList])
    const toggleReading = React.useCallback(() => setReadingIndex(r => nextReading(r, props.readingList)), [props.readingList])
    const hideStatus = props.status === 'none' || props.status === 3
    const hasReadings = !!displayedReadingsValues[props.dataType]
    const doubleReadings = hasReadings ? Array.isArray(displayedReadingsValues[props.dataType][props.displayedReading].icon) : false
    return (
        <Pressable
            style={styles.pressable}
            android_ripple={androidRipple}
            onPress={props.onPress}>
            <View style={hideStatus ? styles.cardDataWithoutStatus : styles.cardDataWithStatus}>
                <View style={hideStatus ?
                    styles.hidden : (
                        props.status === 0 ?
                            statusStyles.statusGood : (
                                props.status === 1 ? statusStyles.statusWarning : (
                                    props.status === 2 ? statusStyles.statusDanger :
                                        statusStyles.statusBasic)))} />
                <View style={styles.leftSide}>
                    <Text
                        category='h5'
                        numberOfLines={1}
                        ellipsizeMode='tail'>{props.name}</Text>
                    <Text
                        category='p1'
                        appearance='hint'>{props.subtitle}</Text>
                    <Text style={styles.dataText} appearance='hint'>
                        <Icon
                            name={'calendar-outline'}
                            fill={basic}
                            style={styles.iconRow} />{props.dataList[0].value}</Text>
                    <Text style={props.dataList[1] ? styles.dataText : styles.hidden} appearance='hint' numberOfLines={1} ellipsizeMode={'tail'}>
                        <Icon
                            name={props.dataList[1]?.type ?? 'question-mark-circle-outline'}
                            fill={basic}
                            style={styles.iconRow} />{props.dataList[1]?.value}</Text>
                </View>
                <View style={props.readingList[readingIndex]?.readings === 'none' || props.readingList[readingIndex] === 'none' ? styles.hidden : styles.rightSide}>
                    <Pressable
                        style={styles.readingPressable}
                        android_ripple={androidRipple}
                        onPress={toggleReading}>
                        <Text style={props.readingList[readingIndex]?.readings[0] === null || props.readingList[readingIndex]?.readings[0] === undefined ? styles.hidden : styles.dataText} appearance='hint'>
                            <Icon
                                name={hasReadings ? (doubleReadings ? displayedReadingsValues[props.dataType][props.displayedReading].icon[0] : displayedReadingsValues[props.dataType][props.displayedReading].icon) : 'question-mark-circle-outline'}
                                pack={hasReadings ? displayedReadingsValues[props.dataType][props.displayedReading].pack : null}
                                fill={basic}
                                style={props.readingList[readingIndex]?.readings[0] === null || props.readingList[readingIndex]?.readings[0] === undefined ? styles.hidden : styles.iconRow} />{props.readingList[readingIndex]?.readings[0]}</Text>
                        <Text style={props.readingList[readingIndex]?.readings[1] === null || props.readingList[readingIndex]?.readings[1] === undefined ? styles.hidden : styles.dataText} appearance='hint'>
                            <Icon
                                pack={hasReadings ? (displayedReadingsValues[props.dataType][props.displayedReading].pack) : null}
                                name={hasReadings ? (doubleReadings ? displayedReadingsValues[props.dataType][props.displayedReading].icon[1] : 'question-mark-circle-outline') : 'question-mark-circle-outline'}
                                fill={basic}
                                style={props.readingList[readingIndex]?.readings[1] === null || props.readingList[readingIndex]?.readings[1] === undefined ? styles.hidden : styles.iconRow} />{props.readingList[readingIndex]?.readings[1]}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={props.readingList !== 'none' ? styles.readingBar : styles.hidden}>
                <Text
                    category='s2'
                    appearance='hint'
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {props.readingList[readingIndex]?.name ?? null}
                </Text>
                <View style={styles.readingBarIcons}>
                    <Icon pack='cp' name={props.readingList[0]?.iconName} fill={readingIndex === 0 ? primary : basic} style={props.readingList[0]?.iconName ? (0 === readingIndex ? styles.iconBarSelected : styles.iconBar) : styles.hidden} />
                    <Icon pack='cp' name={props.readingList[1]?.iconName} fill={readingIndex === 1 ? primary : basic} style={props.readingList[1]?.iconName ? (1 === readingIndex ? styles.iconBarSelected : styles.iconBar) : styles.hidden} />
                    <Icon pack='cp' name={props.readingList[2]?.iconName} fill={readingIndex === 2 ? primary : basic} style={props.readingList[2]?.iconName ? (2 === readingIndex ? styles.iconBarSelected : styles.iconBar) : styles.hidden} />
                    <Icon pack='cp' name={props.readingList[3]?.iconName} fill={readingIndex === 3 ? primary : basic} style={props.readingList[3]?.iconName ? (3 === readingIndex ? styles.iconBarSelected : styles.iconBar) : styles.hidden} />
                    <Text style={props.readingList.length > 4 ? styles.iconBar : styles.hidden}>...</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default React.memo(DisplayCard, (prev, next) => prev.timeModified === next.timeModified)

const styles = StyleSheet.create({
    pressable: {
        elevation: 5,
        borderRadius: 6,
        margin: 6,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    cardDataWithStatus: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 12,
        paddingLeft: 36,
    },
    cardDataWithoutStatus: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 12,
    },
    hidden: {
        display: 'none'
    },
    leftSide: {
        flex: 1,
        paddingRight: 20
    },
    rightSide: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconRow: {
        width: 17,
        height: 17,
        marginRight: 10
    },
    iconBar: {
        width: 18,
        height: 18,
        marginLeft: 5,
    },
    iconBarSelected: {
        height: 22,
        width: 22,
        marginLeft: 5,
    },
    dataText: {
        fontSize: 13,
        textAlignVertical: 'bottom',
        height: 22,
        lineHeight: 20,
        paddingVertical: 3,
        width: '100%'
    },
    readingPressable: {
        padding: 12,
        borderRadius: 6,
    },
    readingBar: {
        borderTopWidth: 1,
        borderTopColor: basic300,
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    readingBarIcons: {
        alignItems: 'center',
        flexDirection: 'row',
    },
})


const statusStyles = StyleSheet.create({
    statusBasic: {
        position: 'absolute',
        left: 12,
        height: '100%',
        top: 12,
        borderRadius: 5,
        width: 12,
        backgroundColor: basic,
    },
    statusGood: {
        position: 'absolute',
        left: 12,
        height: '100%',
        top: 12,
        borderRadius: 5,
        width: 12,
        backgroundColor: success,
    },
    statusWarning: {
        position: 'absolute',
        left: 12,
        height: '100%',
        top: 12,
        borderRadius: 5,
        width: 12,
        backgroundColor: warning,
    },
    statusDanger: {
        position: 'absolute',
        left: 12,
        height: '100%',
        top: 12,
        borderRadius: 5,
        width: 12,
        backgroundColor: danger,
    }
})