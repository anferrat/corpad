import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { wireGaugesList, wireColorList } from '../../../constants/constants'

const WireParams = ({ wireColor, wireGauge }) => {
    const hideWireColor = wireColor === null || !wireColorList[wireColor]
    const hideWireGauge = wireGauge === null || !wireGaugesList[wireGauge]

    return (
        <View style={styles.view} >
            {!hideWireColor ?
                <Icon
                    style={styles.icon}
                    name={wireColorList[wireColor].color.length === 2 ? 'color-circle-double' : 'color-circle'}
                    pack='cp'
                    fill={wireColorList[wireColor].color[0]}
                    fill2={wireColorList[wireColor].color[1]}
                />
                : null}
            {!hideWireGauge ?
                <Text
                    category='s2'>{wireGaugesList[wireGauge]}</Text>
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