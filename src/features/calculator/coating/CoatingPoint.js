import React from 'react'
import { View, StyleSheet } from 'react-native'
import DataLine from './DataLine'
import PointLabel from '../components/PointLabel'
import InputDataField from './InputDataField'


const CoatingPoint = (props) => {
    return (
        <>
            <PointLabel label={props.label} />
            <InputDataField
                point={props.point}
                status={null}
                property='resistivity'
                style={styles.inputs}
                disabled={props.disabled}
                setValue={props.setValue}
                setValid={props.setValid}
                label='Average soil resistivity'
                value={props.data.resistivity}
                valid={props.valid.resistivity}
                unit={`\u03A9-cm`} />
            <View style={styles.mainView}>
                <View style={styles.inputs}>
                    <DataLine
                        label='Current'
                        property='current'
                        point={props.point}
                        data={props.data.current}
                        valid={props.valid.current}
                        setValue={props.setValue}
                        setValid={props.setValid}
                        unit='A'
                        disabled={props.disabled}
                    />
                    <DataLine
                        label='Potentials'
                        property='potential'
                        point={props.point}
                        data={props.data.potential}
                        valid={props.valid.potential}
                        setValue={props.setValue}
                        setValid={props.setValid}
                        unit='mV'
                        disabled={props.disabled}
                    />
                </View>
            </View>
        </>
    )
}

export default React.memo(CoatingPoint)


const styles = StyleSheet.create({
    label: {
        flexBasis: 70,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    inputs: {
        flex: 1
    },
    mainView: {
        flexDirection: 'row'
    }
})