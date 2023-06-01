import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../Input'
import StatusView from '../StatusView'
import LocationView from '../LocationView'
import Select from '../Select'
import RectifierTapSetting from '../RectifierTapSetting'
import CreateSubitemButton from '../CreateSubitemButton'
import { globalStyle } from '../../../../../styles/styles'
import { PowerSources } from '../../../../../constants/global'
import { PowerSourceLabels } from '../../../../../constants/labels'

const powerSourceList = Object.values(PowerSources).map(source => ({ item: PowerSourceLabels[source], index: source }))


const RT = ({ data, createSubitem, itemType, update, validate, updateLatAndLon, updateTap }) => {
    const { name, status, defaultName, valid, latitude, longitude, location, maxCurrent, maxVoltage, model, serialNumber, powerSource, comment, tapSetting, tapValue, tapCoarse, tapFine } = data
    return (
        <>
            <StatusView
                update={update}
                status={status} />
            <View style={globalStyle.card}>
                <View style={styles.mainView}>
                    <Input
                        update={update}
                        validate={validate}
                        property='name'
                        maxLength={40}
                        label='Name'
                        placeholder={defaultName}
                        value={name}
                        valid={valid.name} />
                    <LocationView
                        updateLatAndLon={updateLatAndLon}
                        update={update}
                        validate={validate}
                        latitude={latitude}
                        longitude={longitude}
                        latitudeValid={valid.latitude}
                        longitudeValid={valid.longitude} />
                    <Input
                        update={update}
                        validate={validate}
                        maxLength={80}
                        valid={valid.location}
                        label='Location'
                        value={location}
                        property='location'
                        placeholder='Location description' />
                    <View style={styles.row}>
                        <View style={styles.leftItem}>
                            <Input
                                update={update}
                                validate={validate}
                                property='maxCurrent'
                                maxLength={20}
                                label='DC Amps'
                                keyboardType='numeric'
                                value={maxCurrent}
                                valid={valid.maxCurrent}
                                unit='A' />
                        </View>
                        <View style={styles.rightItem}>
                            <Input
                                update={update}
                                validate={validate}
                                property='maxVoltage'
                                maxLength={20}
                                label='DC Volts'
                                keyboardType='numeric'
                                value={maxVoltage}
                                valid={valid.maxVoltage}
                                unit='V' />
                        </View>
                    </View>
                    <Input
                        update={update}
                        validate={validate}
                        property='model'
                        maxLength={80}
                        label='Model'
                        placeholder='eg. HHYW23-U2'
                        value={model}
                        valid={valid.model} />
                    <Input
                        update={update}
                        validate={validate}
                        property='serialNumber'
                        maxLength={80}
                        label='Serial number'
                        placeholder='e.g. 24680-13'
                        value={serialNumber}
                        valid={valid.serialNumber} />
                    <Select
                        placeholderOption={true}
                        update={update}
                        label='Power source'
                        property='powerSource'
                        selectedIndex={powerSource}
                        itemList={powerSourceList}
                        placeholder='Select Source' />
                    <RectifierTapSetting
                        update={update}
                        validate={validate}
                        updateTap={updateTap}
                        tapSetting={tapSetting}
                        tapValue={tapValue}
                        tapCoarse={tapCoarse}
                        tapFine={tapFine}
                        tapValueValid={valid.tapValue} />
                    <Input
                        update={update}
                        validate={validate}
                        maxLength={300}
                        multiline={true}
                        valid={valid.comment}
                        textAlignVertical={'top'}
                        numberOfLines={3}
                        label='Comments'
                        property='comment'
                        value={comment} />
                </View>
                <View style={styles.button}>
                    <CreateSubitemButton
                        title={'Add circuit'}
                        onSelect={createSubitem}
                        itemType={itemType} />
                </View>
            </View>
        </>
    )
}

export default React.memo(RT)


const styles = StyleSheet.create({
    button: {
        marginHorizontal: -12,
        marginBottom: -12
    },
    row: {
        flexDirection: 'row'
    },
    leftItem: {
        flex: 1,
        paddingRight: 6
    },
    rightItem: {
        flex: 1,
        paddingLeft: 6
    }
})