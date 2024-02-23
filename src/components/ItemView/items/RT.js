import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider } from '@ui-kitten/components'
import ItemHeader from '../components/ItemHeader'
import IconLine from '../components/IconLine'
import TextLine from '../../TextLine'
import { PowerSourceLabels, TapOptionLabels } from '../../../constants/labels'
import { TapOptions } from '../../../constants/global'
import { getTapValue } from '../helpers/functions'


const RT = ({ name, itemType, coord, date, location, comment, maxVoltage, maxCurrent, model, serialNumber, powerSource, tapValue, tapSetting, tapFine, tapCoarse }) => {
    const { unit, value } = getTapValue(tapSetting, tapValue, tapCoarse, tapFine)
    return (
        <View style={styles.container}>
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
            <TextLine title='Max. voltage' value={maxVoltage} unit='V' />
            <TextLine title='Max. current' value={maxCurrent} unit='A' />
            <TextLine title='Model' value={model} />
            <TextLine title='Serial number' value={serialNumber} />
            <TextLine title='Power source' value={PowerSourceLabels[powerSource] ?? null} />
            <TextLine title={tapSetting === TapOptions.AUTO ? 'Current control' : TapOptionLabels[tapSetting]} value={value} unit={unit} />
        </View>
    )
}

export default React.memo(RT)

const styles = StyleSheet.create({

    divider: {
        marginVertical: 4
    },
    container: {
        marginBottom: 12
    },
    header: {
        paddingHorizontal: 8
    }
})