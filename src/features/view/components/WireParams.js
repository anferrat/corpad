import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { wireGaugesList } from '../../../constants/constants'
import WireColorIcon from '../../../components/WireColorIcon'


const valueCheck = (index, list) => !isNaN(index) && index >= 0 && list[index] !== undefined

const WireParams = (props) => {
    return <View style={styles.view}>
        <WireColorIcon colorIndex={props.wireColor} style={styles.icon} />
        {valueCheck(props.wireGauge, wireGaugesList) ? <Text category='s2'>{wireGaugesList[props.wireGauge]}</Text> : null}
    </View>
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