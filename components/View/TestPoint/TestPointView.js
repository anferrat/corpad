import React from 'react'
import { View, StyleSheet } from 'react-native'
import StatusIcon from '../StatusIcon'
import { testPointTypeCodes, testPointTypes } from '../../../constants/constants'
import IconLine from '../../_Stateless/IconLine'
import { toString, getFullDate } from '../../customFunctions'
import TopBarTitle from '../../_Stateless/TopBarTitle'

const combineLatLon = (lat, lon) => lat === '' && lon === '' ? '' : lat + ', ' + lon

const TestPointView = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TopBarTitle
                    iconName={testPointTypeCodes[props.tpData.testPointType]}
                    cp={true}
                    subtitle={testPointTypes[props.tpData.testPointType]}
                    title={props.tpData.name}
                    large={true} />
                <StatusIcon
                    dataType={props.dataType}
                    itemId={props.itemId} />
            </View>
            <IconLine icon='calendar-outline' value={getFullDate(props.tpData.timeModified)} hideEmpty />
            <IconLine icon='pin-outline' value={combineLatLon(toString(props.tpData.latitude), toString(props.tpData.longitude))} hideEmpty />
            <IconLine icon='map-outline' value={props.tpData.location} hideEmpty />
            <IconLine icon='message-square-outline' value={props.tpData.comment} hideEmpty />
        </View>
    )
}
export default React.memo(TestPointView)

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    }
})