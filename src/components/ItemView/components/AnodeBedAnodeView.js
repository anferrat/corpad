import React from 'react'
import { View, StyleSheet } from 'react-native'
import Unit from '../../Unit'
import { Icon, Text } from '@ui-kitten/components'
import { WireColorColors } from '../../../styles/colors'
import { WireGaugeLabels } from '../../../constants/labels'


const AnodeBedAnodeView = ({ current, wireColor, wireGauge, index }) => {
    if (current === null)
        return null
    else
        return (
            <View style={styles.container}>
                <View
                    style={styles.title}>
                    {wireColor !== null ?
                        <Icon
                            style={styles.icon}
                            name={WireColorColors[wireColor].length === 2 ? 'color-circle-double' : 'color-circle'}
                            pack='cp'
                            fill={WireColorColors[wireColor][0]}
                            fill2={WireColorColors[wireColor][1]} /> : null}
                    <Text
                        style={styles.text}
                        category={'s2'}>
                        Anode #{index + 1} {wireGauge !== null ? ` (${WireGaugeLabels[wireGauge]})` : null}</Text>

                </View>
                <View
                    style={styles.valueView}>
                    <Text
                        style={styles.value}>
                        {current}
                    </Text>
                    <Unit
                        unit='A' />
                </View>
            </View>
        )
}

export default AnodeBedAnodeView


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    valueView: {
        flexDirection: 'row',
    },
    value: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 6
    },
    text: {
        flexBasis: 130,

    },
    colorIcon: {
        width: 15,
        height: 15
    }
})