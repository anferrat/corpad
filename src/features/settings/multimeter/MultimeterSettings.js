import React from 'react'
import { View, StyleSheet } from 'react-native'
import { globalStyle } from '../../../styles/styles'
import useMultimeterSettings from './hooks/useMultimeterSettings'
import LoadingView from '../../../components/LoadingView'
import Input from '../../../components/Input'
import { TimeUnitLabels } from '../../../constants/labels'
import { TimeUnits } from '../../../constants/global'


const MultimeterSettings = () => {
    const { onTime, offTime, delay, syncMode, loading } = useMultimeterSettings()
    return (

        <View style={styles.container}>
            <View style={globalStyle.card}>
                <LoadingView loading={loading}>
                    <View style={styles.row}>
                        <Input
                            style={styles.left}
                            label='On'
                            property='cycleTime'
                            unit={TimeUnitLabels[TimeUnits.SECONDS]}
                            value={onTime.value}
                            valid={onTime.valid} />
                        <Input
                            style={styles.right}
                            label='Off'
                            property='cycleTime'
                            unit={TimeUnitLabels[TimeUnits.SECONDS]}
                            value={offTime.value}
                            valid={offTime.valid} />
                    </View>
                </LoadingView>
            </View>
        </View>
    )
}

export default MultimeterSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 300,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        flex: 1,
        paddingRight: 12,
    },
    right: {
        flex: 1,
        paddingLeft: 12,
    }
})