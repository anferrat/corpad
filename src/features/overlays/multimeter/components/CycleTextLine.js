import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'
import { MultimeterCycleLabels, TimeUnitLabels } from '../../../../constants/labels'
import { MultimeterCycles, TimeUnits } from '../../../../constants/global'


const CycleTextLine = ({ title, onTime, offTime }) => {
    const { onTimeSec, offTimeSec } = React.useMemo(() => ({ onTimeSec: (onTime / 1000).toFixed(0), offTimeSec: (offTime / 1000).toFixed(0) }))
    return (
        <View
            style={styles.container}>
            <View style={styles.label}>
                <Text
                    style={styles.text}
                    status='primary'>
                    {title}
                </Text>
            </View>
            <View>
                <View
                    style={styles.cycleLabelRow}>
                    <View
                        style={styles.iconView}>
                        <Icon
                            pack='cp'
                            name={'On'}
                            style={styles.icon}
                            fill={basic} />
                        <Text
                            category='label'
                            appearance='hint'>
                            {MultimeterCycleLabels[MultimeterCycles.ON]}
                        </Text>
                    </View>
                    <Text
                        style={styles.value}>
                        {onTimeSec} {TimeUnitLabels[TimeUnits.SECONDS]}
                    </Text>
                </View>
                <View
                    style={styles.cycleLabelRow}>
                    <View
                        style={styles.iconView}>
                        <Icon
                            pack='cp'
                            name={'Off'}
                            style={styles.icon}
                            fill={basic} />
                        <Text
                            category='label'
                            appearance='hint'>
                            {MultimeterCycleLabels[MultimeterCycles.OFF]}
                        </Text>
                    </View>
                    <Text
                        style={styles.value}>
                        {offTimeSec} {TimeUnitLabels[TimeUnits.SECONDS]}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default React.memo(CycleTextLine)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 24,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 12,
        height: 12,
        marginRight: 6
    },
    cycleLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 60,
        justifyContent: 'space-between',
        height: 20
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    value: {
        marginLeft: 6,
        fontWeight: 'bold'
    }
})