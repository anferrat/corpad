import React from 'react'
import { View, StyleSheet } from 'react-native'
import StatusIcon from '../StatusIcon'
import { powerSourceList, tapSettings } from '../../../constants/constants'
import IconLine from '../../_Stateless/IconLine'
import TextLine from '../../_Stateless/TextLine'
import { toString, getValue, getFullDate } from '../../customFunctions'
import TopBarTitle from '../../_Stateless/TopBarTitle'
import SmartDivider from '../../_Stateless/SmartDivider'
import TapView from './TapView'

const combineLatLon = (lat, lon) => lat === '' && lon === '' ? '' : lat + ', ' + lon


const RectifierView = (props) => { // I know parts just copied from TestPointView, so what...
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TopBarTitle
                    iconName='RT'
                    cp={true}
                    subtitle='Rectifier'
                    title={props.rectifierData.name}
                    large={true} />
                <StatusIcon
                    dataType={props.dataType}
                    itemId={props.itemId} />
            </View>
            <IconLine icon='calendar-outline' value={getFullDate(props.rectifierData.timeModified)} hideEmpty />
            <IconLine icon='pin-outline' value={combineLatLon(toString(props.rectifierData.latitude), toString(props.rectifierData.longitude))} hideEmpty />
            <IconLine icon='map-outline' value={props.rectifierData.location} hideEmpty />
            <IconLine icon='message-square-outline' value={props.rectifierData.comment} hideEmpty />
            <SmartDivider depend={[
                props.rectifierData.maxVoltage,
                props.rectifierData.model,
                props.rectifierData.serialNumber,
                props.rectifierData.powerSource,
                props.rectifierData.controlMode
            ]} />
            <TextLine title='Max. voltage' value={props.rectifierData.maxVoltage} unit='V' hideEmpty />
            <TextLine title='Max. current' value={props.rectifierData.maxCurrent} unit='A' hideEmpty />
            <TextLine title='Model' value={props.rectifierData.model} hideEmpty />
            <TextLine title='Serial number' value={props.rectifierData.serialNumber} hideEmpty />
            <TextLine title='Power source' value={getValue(props.rectifierData.powerSource, powerSourceList)} hideEmpty />
            <TapView
                itemId={props.itemId}
                tapSetting={props.rectifierData.tapSetting} />
        </View>
    )
}
export default React.memo(RectifierView)

const styles = StyleSheet.create({
    mainView: {},
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    }
})