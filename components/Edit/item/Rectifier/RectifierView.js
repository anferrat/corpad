import React from 'react'
import InputField from '../InputField'
import StatusView from '../StatusView'
import LocationView from '../LocationView'
import SelectField from '../SelectField'
import { powerSourceList } from '../../../../constants/constants'
import { Layout } from '@ui-kitten/components'
import { androidStyle } from '../../../../styles/GlobalStyle'
import AddCircuitButton from './AddCircuitButton'
import TapView from './TapView'
import { View, StyleSheet } from 'react-native'

const RectifierView = (props) => {
    return (
        <>
            <StatusView
                status={props.rectifierData.status} />
            <Layout style={androidStyle.ConnectionCardMain}>
                <View style={styles.mainView}>
                    <InputField
                        property='name'
                        maxLength={40}
                        label='Name'
                        placeholder={props.rectifierData.defaultName}
                        value={props.rectifierData.name}
                        valid={props.rectifierData.valid.name} />
                    <LocationView
                        latitude={props.rectifierData.latitude}
                        longitude={props.rectifierData.longitude}
                        latValid={props.rectifierData.valid.latitude}
                        lonValid={props.rectifierData.valid.longitude} />
                    <InputField
                        maxLength={80}
                        valid={props.rectifierData.valid.location}
                        label='Location'
                        value={props.rectifierData.location}
                        property='location'
                        placeholder='Location description' />
                    <Layout style={{ flexDirection: 'row' }}>
                        <Layout style={{ flex: 1, paddingRight: 6 }}>
                            <InputField
                                property='maxCurrent'
                                maxLength={20}
                                label='DC Amps'
                                keyboardType='numeric'
                                value={props.rectifierData.maxCurrent}
                                valid={props.rectifierData.valid.maxCurrent}
                                unit='A' />
                        </Layout>
                        <Layout style={{ flex: 1, paddingLeft: 6 }}>
                            <InputField
                                property='maxVoltage'
                                maxLength={20}
                                label='DC Volts'
                                keyboardType='numeric'
                                value={props.rectifierData.maxVoltage}
                                valid={props.rectifierData.valid.maxVoltage}
                                unit='V' />
                        </Layout>
                    </Layout>
                    <InputField
                        property='model'
                        maxLength={80}
                        label='Model'
                        placeholder='eg. HHYW23-U2'
                        value={props.rectifierData.model}
                        valid={props.rectifierData.valid.model} />
                    <InputField
                        property='serialNumber'
                        maxLength={80}
                        label='Serial number'
                        placeholder='e.g. 24680-13'
                        value={props.rectifierData.serialNumber}
                        valid={props.rectifierData.valid.serialNumber} />
                    <SelectField
                        label='Power source'
                        property='powerSource'
                        selectedItem={props.rectifierData.powerSource}
                        itemsList={powerSourceList}
                        placeholder='Select Source' />
                    <TapView
                        rectifierData={props.rectifierData} />
                    <InputField
                        maxLength={300}
                        multiline={true}
                        valid={props.rectifierData.valid.comment}
                        textAlignVertical={'top'}
                        numberOfLines={3}
                        label='Comments'
                        property='comment'
                        value={props.rectifierData.comment} />
                </View>
                <AddCircuitButton
                    navigateToCircuit={props.navigateToSubitem}
                    rectifierId={props.rectifierId} />
            </Layout>
        </>
    )
}

export default RectifierView

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    }
})