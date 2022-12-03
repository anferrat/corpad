import React from 'react'
import { Layout } from '@ui-kitten/components'
import TextLine from '../components/TextLine'
import Header from '../components/Header'
import SmartDivider from '../components/SmartDivider'
import InputField from '../InputField'
import { globalStyle } from '../../../styles/styles'

const getRatio = (ratioCurrent, ratioVoltage) => {
    if (ratioCurrent && ratioVoltage)
        return + ratioVoltage + ' mV - ' + ratioCurrent + ' A'
    else return null
}

const targetDisplayHandler = (min, max) => {
    if (min === null && max === null) {
        return null
    }
    else
        if (min === null) {
            return 'Max. ' + max
        }
        else if (max === null) {
            return 'Min. ' + min
        }
        else return min + ' - ' + max
}

const CircuitView = (props) => {
    return (
        <Layout style={globalStyle.card}>
            <Header
                title={props.circuitData?.name}
                icon='CT'
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[true]} />
            <InputField
                dataTypeItem='RECTIFIER'
                dataTypeSubitem='CIRCUIT'
                keyboardType='numeric'
                itemId={props.itemId}
                subitemId={props.circuitData.id}
                value={props.circuitData.current}
                title='Current'
                property='current'
                unit={'A'} />
            <InputField
                dataTypeItem='RECTIFIER'
                dataTypeSubitem='CIRCUIT'
                keyboardType='numeric'
                itemId={props.itemId}
                subitemId={props.circuitData.id}
                value={props.circuitData.voltage}
                title='Voltage'
                property='voltage'
                unit={'V'} />
            <TextLine title='Target' value={targetDisplayHandler(props.circuitData?.targetMin, props.circuitData?.targetMax)} unit='A' hideEmpty />
            <TextLine title='Shunt ratio' value={getRatio(props.circuitData.ratioCurrent, props.circuitData.ratioVoltage)} hideEmpty />
        </Layout>
    )
}
export default CircuitView