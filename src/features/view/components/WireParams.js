import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { WireGauges, WireColors } from '../../../constants/global'
import { WireColorColors } from '../../../styles/colors'
import { WireGaugeLabels } from '../../../constants/labels'

const WireParams = ({ wireColor, wireGauge }) => {
    const hideWireColor = wireColor === null || !~Object.values(WireColors).indexOf(wireColor)
    const hideWireGauge = wireGauge === null || !~Object.values(WireGauges).indexOf(wireGauge)

    return (
        <View style={styles.view} >
            {!hideWireColor ?
                <Icon
                    style={styles.icon}
                    name={WireColorColors[wireColor].length === 2 ? 'color-circle-double' : 'color-circle'}
                    pack='cp'
                    fill={WireColorColors[wireColor][0]}
                    fill2={WireColorColors[wireColor][1]} />
                : null}
            {!hideWireGauge ?
                <Text
                    category='s2'>{WireGaugeLabels[wireGauge]}</Text>
                : null}
        </View >
    )
}

export default React.memo(WireParams)

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
        marginRight: 6
    },
    view: {
        flexBasis: 80,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})