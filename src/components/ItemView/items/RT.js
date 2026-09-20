import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider } from '@ui-kitten/components'
import ItemHeader from '../components/ItemHeader'
import IconLine from '../components/IconLine'
import TextLine from '../../TextLine'
import { PowerSourceLabels, TapOptionLabels } from '../../../constants/labels'
import { TapOptions } from '../../../constants/global'
import { getTapValue } from '../helpers/functions'
import { translateItemView } from '../../../localization'


const RT = ({ name, itemType, coord, date, location, comment, maxVoltage, maxCurrent, model, serialNumber, powerSource, tapValue, tapSetting, tapFine, tapCoarse }) => {
    const { unit, value } = getTapValue(tapSetting, tapValue, tapCoarse, tapFine)
    return (
        <>
            <View style={styles.header}>
                <ItemHeader
                    name={name}
                    itemType={itemType} />
                <IconLine icon='calendar-outline' label={date} />
                <IconLine icon='pin-outline' label={coord} />
                <IconLine icon='map-outline' label={location} />
                <IconLine icon='message-square-outline' label={comment} />
            </View>
            <View style={styles.divider} />
            <TextLine title={translateItemView('maxVoltage')} value={maxVoltage} unit='V' />
            <TextLine title={translateItemView('maxCurrent')} value={maxCurrent} unit='A' />
            <TextLine title={translateItemView('model')} value={model} />
            <TextLine title={translateItemView('serialNumber')} value={serialNumber} />
            <TextLine title={translateItemView('powerSource')} value={PowerSourceLabels[powerSource] ?? null} />
            <TextLine title={tapSetting === TapOptions.AUTO ? translateItemView('currentControl') : TapOptionLabels[tapSetting]} value={value} unit={unit} />
        </>
    )
}

export default React.memo(RT)

const styles = StyleSheet.create({

    divider: {
        marginVertical: 4
    },
    header: {
        paddingHorizontal: 8
    }
})
