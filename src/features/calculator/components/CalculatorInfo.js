import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic200, primary } from '../../../styles/colors'
import { globalStyle } from '../../../styles/styles'
import { CoatingDrawing, FourWireDrawing, ShuntDrawing, TwoWireDrawing, WennerDrawing } from '../../../../assets/drawings'

const Drawing = (props) => {
    switch (props.calculatorType) {
        case 'coating':
            return <CoatingDrawing {...props} />
        case 'current4Wire':
            return <FourWireDrawing {...props} />
        case 'current2Wire':
            return <TwoWireDrawing {...props} />
        case 'shunt':
            return <ShuntDrawing {...props} />
        case 'wenner':
            return <WennerDrawing {...props} />
        default:
            return null
    }
}

const getPoints = (calculatorType) => {
    switch (calculatorType) {
        case 'coating':
            return [
                'Allocate a pipe segment for the coating quality test. It must have two access points (e.g., test stations) where it is possible to measure pipe potentials and passing through current.',
                'Set interruption schedule on existing cathodic protection rectifier or install a temporary power source with ground bed.',
                'Measure distance between two access points (m or ft) and determine pipe diameter.',
                'At first access point (Start) measure ON/OFF pipe-to-soil potentials and passing through current at ON and OFF state.',
                'Measure average soil resistivity from surface to the depth of the pipe at first access point (Start).',
                'Repeat steps 4 and 5 for the second access point (End), fill out the fields and press “Calculate”.'

            ]
        case 'current4Wire':
            return [
                'Measure voltage drop between two test points. Make sure to record the magnitude of the voltage drop.',
                'Set up external power source and connect negative and positive terminals to the pipe, outside of the initial test points as per diagram.',
                'Record applied test current, and measure voltage drop between initial two test points. Keep positive and negative terminals of the voltmeter at the same locations as in step 1.',
                'Fill out the fields and press “Calculate”. Result current is the residual current that was flowing through the pipe before test current applied.',
                'If voltage drop reading in step 1 is positive, the direction of the residual current is from positive to negative terminal of the voltmeter, and if it is negative, the current direction is opposite.'
            ]
        case 'current2Wire':
            return [
                'Measure voltage drop between two test points of the pipe.',
                'Determine length of the pipe segment between two test points, select pipe diameter and schedule.',
                'Fill out the fileds and press "Calculate".',
                'If voltage drop reading in step 1 is positive, the direction of the current is from positive to negative terminal of the voltmeter, and if it is negative, the current direction is opposite.'
            ]
        case 'shunt':
            return [
                'Determine shunt ratio or shunt factor as it is indicated on the shunt body or in the manufacture’s specification.',
                'Measure voltage drop across the shunt at the measurement terminals.',
                'Fill out the fields and press "Calculate"',
                'If voltage drop reading in step 2 is positive, the direction of the current is from positive to negative terminal of the voltmeter, and if it is negative, the current direction is opposite.'
            ]
        case 'refCell':
            return [
                'Measure potential using a reference cell type from the list.',
                'Fill out the fields. Select based reference type as reference cell type that was used and target reference type as reference cell type that potential value should be converted to.',
                'Press "Calculate"'

            ]
        case 'wenner':
            return [
                'Place four equally spaced and in-line electrodes into the ground.',
                `Connect the electrodes to a soil resistivity meter in accordance with the diagram or meter's manufacturer manual. Two outer electrodes are injecting current into the soil and two inner electrodes are measuring the voltage.`,
                'Measure resistance and enter data into the form. If you wish to measure resistivity of different soil layers using Barnes method, press "Add layer", and repeat steps 1 and 2 with different spacing between the electrodes. Spacing values do not have to be in order. You can maximum have five layers in one calculation.',
                'Press "Calculate".'
            ]
        default:
            return []
    }
}

const getHints = (calculatorType) => {
    switch (calculatorType) {
        case 'coating':
            return [
                'For more details refer to NACE TM0102 Measurement of Protective Coating Electrical Conductance on Underground Pipelines.',
                'Attenuation method is not implemented in this calculator. If there is a significant difference in IR drop between two locations, calculated result may be imprecise. Refer to NACE TM0102 for details.',
                'Choose access points that are remote from ground bed and other sources of interference.',
                'Soil resistivity can be calculated using Wenner method (Layer resistivity calculator)'
            ]
        case 'current4Wire':
            return [
                'Calibration factor can be used for subsequent current calculations at the same location. It must be recalculated if pipe operating temperature changes.'
            ]
        case 'current2Wire':
            return [
                'Pipe segment resistance is calculated based on carbon steel (99% Fe, 1% C) resistivity of 14.3 \u03BC\u03A9-cm at 20 deg. C, however it may vary from 10 to 70 \u03BC\u03A9-cm according to different publications.',
                'This method is imprecise and suitable only for approximate estimation of current flowing within the pipe. Calculation error increases with larger pipe diameters, segment lengths and higher temperatures.'
            ]
        case 'refCell':
            return [
                'This converter does not take into account temperature effect on potential readings. Potential values are assumed to be taken at 25 deg. C'
            ]
        case 'wenner':
            return [
                'For more details refer to ASTM G57 - Standard Test Method for Measurement of Soil Resistivity Using the Wenner Four-Electrode Method',
            ]
        default:
            return []
    }
}

const CalculatorInfo = (props) => {
    const points = getPoints(props.calculatorType)
    const hints = getHints(props.calculatorType)
    return (
        <ScrollView contentContainerStyle={styles.mainView} style={styles.scroll}>
            {props.calculatorType !== 'refCell' ?
                <View style={globalStyle.card}>
                    <Text category='h5' appearance='hint'>Setup:</Text>
                    <View style={styles.drawingContainer}>
                        <Drawing style={styles.drawing} fill={primary} calculatorType={props.calculatorType} />
                    </View>
                </View> : null}
            <View style={globalStyle.card}>
                <Text category='h5' appearance='hint' style={styles.title}>Procedure:</Text>
                {points.map((point, i) => (
                    <Text key={`point-${i}`} category='p1' style={styles.text}>{i + 1}. {point}</Text>

                ))}
            </View>
            {
                hints.length > 0 ?
                    <View style={globalStyle.card}>
                        <Text category='h5' appearance='hint' style={styles.title}>Hints:</Text>
                        {hints.map((hint, i) => (
                            <Text key={`hint-${i}`} category='p1' style={styles.text}>- {hint}</Text>
                        ))}
                    </View> : null}
        </ScrollView>
    )
}

export default React.memo(CalculatorInfo, () => true)

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: basic200,
    },
    mainView: {
        backgroundColor: basic200,
        paddingBottom: 12
    },
    drawing: {
        flex: 1,
        flexDirection: 'row',
        aspectRatio: 2,
    },
    drawingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        paddingBottom: 12
    },
    text: {
        paddingBottom: 18
    }
})