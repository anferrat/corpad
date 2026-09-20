export default {
    common: {
        calculate: 'Calculate',
        saved: 'Saved',
        reset: 'Reset',
        on: 'On',
        off: 'Off',
        noCalculationsDescription: 'After completing a calculation press save button to find it here.'
    },
    categories: {
        current: 'Current',
        soil: 'Soil',
        coating: 'Coating',
        other: 'Other'
    },
    types: {
        coating: 'Coating quality',
        currentFourWire: 'Current span (4-wire)',
        currentTwoWire: 'Current span (2-wire)',
        referenceCell: 'Reference converter',
        shunt: 'Shunt converter',
        wenner: 'Layer resistivity'
    },
    titles: {
        coating: 'Conductance',
        currentFourWire: 'Current span',
        currentTwoWire: 'Current span',
        referenceCell: 'Reference',
        shunt: 'Shunt',
        wenner: 'Resistivity'
    },
    descriptions: {
        coating: 'Calculate coating conductance of the pipeline section using ON/OFF potentials and current, and determine coating quality.',
        currentFourWire: 'Calculate in-line current using voltage drop between two points and calculated pipe resistance.',
        currentTwoWire: 'Calculate in-line current using pipe diameter and voltage drop between two points.',
        referenceCell: 'Convert voltage values with reference to different cell types.',
        shunt: 'Covert voltage drop across a shunt to current using shunt factor or ratio.',
        wenner: 'Calculate resistivity of soil layers using Wenner method and Barnes analysis.'
    },
    inputs: {
        factor: 'Factor',
        currentRatio: 'Current ratio',
        voltageRatio: 'Voltage ratio',
        voltageDrop: 'Voltage drop',
        pipeDiameter: 'Pipe diameter',
        selectDiameter: 'Select diameter',
        pipeSchedule: 'Pipe schedule',
        selectSchedule: 'Select schedule',
        segmentLength: 'Segment length',
        testCurrent: 'Test current',
        baseReferenceType: 'Base reference type',
        targetReferenceType: 'Target reference type',
        selectReferenceType: 'Select reference type',
        basePotentialReading: 'Base potential reading',
        averageSoilResistivity: 'Average soil resistivity',
        current: 'Current',
        potentials: 'Potentials',
        spacing: 'Spacing',
        resistance: 'Resistance'
    },
    selectors: {
        ratio: 'Ratio',
        factor: 'Factor',
        average: 'Average',
        layers: 'Layers'
    },
    coating: {
        testPointStart: 'Test point 1 - Start',
        testPointEnd: 'Test point 2 - End'
    },
    results: {
        shuntTitle: 'Shunt ({{ratioVoltage}} mV - {{ratioCurrent}} A)',
        shuntFactor: 'Shunt factor',
        shuntResistance: 'Shunt resistance',
        twoWireTitle: 'Two-wire line current ({{distance}} {{unit}})',
        steelResistivity: 'Steel resistivity',
        pipeWeight: 'Pipe weight',
        pipeSegmentResistance: 'Pipe segment resistance',
        fourWireTitle: 'Four-wire line current ({{current}} A test current)',
        sectionResistance: 'Section resistance',
        calibrationFactor: 'Calibration factor',
        coatingTitle: 'Coating resistance ({{npsValue}}, {{spacing}} {{unit}})',
        pipeToEarthResistance: 'Pipe-to-earth resistance',
        specificResistance: 'Specific resistance',
        conductance: 'Conductance',
        specificConductance: 'Specific conductance',
        normalizedConductance: 'Conductance (1000 ohm-cm soil)',
        potentialsConverter: 'Potentials converter',
        coefficient: 'Coefficient',
        targetReference: 'Target reference',
        convertedPotential: 'Converted potential',
        layer: 'Layer',
        resultLabel: 'Layers: {{count}}, 0 - {{spacing}} {{unit}}',
        resultLabelDistance: '{{distance}} {{unit}},  {{current}} A',
        resultLabelResistance: '{{resistance}} ohm, {{current}} A',
        resultLabelShunt: '{{ratioVoltage}} mV - {{ratioCurrent}} A',
        resultLabelReference: '{{initialCode}} -> {{targetCode}}',
        resistivity: 'Resistivity'
    },
    referenceCells: {
        copperSulfate: 'Copper/Copper sulfate',
        saturatedCalomel: 'Saturated calomel',
        silverChloride: 'Silver/Silver chloride',
        zinc: 'Zinc',
        standardHydrogen: 'Standard hydrogen'
    },
    info: {
        setup: 'Setup:',
        procedure: 'Procedure:',
        hints: 'Hints:',
        points: {
            coating: [
                'Allocate a pipe segment for the coating quality test. It must have two access points (e.g., test stations) where it is possible to measure pipe potentials and passing through current.',
                'Set interruption schedule on existing cathodic protection rectifier or install a temporary power source with ground bed.',
                'Measure distance between two access points (m or ft) and determine pipe diameter.',
                'At first access point (Start) measure ON/OFF pipe-to-soil potentials and passing through current at ON and OFF state.',
                'Measure average soil resistivity from surface to the depth of the pipe at first access point (Start).',
                'Repeat steps 4 and 5 for the second access point (End), fill out the fields and press “Calculate”.'
            ],
            currentFourWire: [
                'Measure voltage drop between two test points. Make sure to record the magnitude of the voltage drop.',
                'Set up external power source and connect negative and positive terminals to the pipe, outside of the initial test points as per diagram.',
                'Record applied test current, and measure voltage drop between initial two test points. Keep positive and negative terminals of the voltmeter at the same locations as in step 1.',
                'Fill out the fields and press “Calculate”. Result current is the residual current that was flowing through the pipe before test current applied.',
                'If voltage drop reading in step 1 is positive, the direction of the residual current is from positive to negative terminal of the voltmeter, and if it is negative, the current direction is opposite.'
            ],
            currentTwoWire: [
                'Measure voltage drop between two test points of the pipe.',
                'Determine length of the pipe segment between two test points, select pipe diameter and schedule.',
                'Fill out the fields and press "Calculate".',
                'If voltage drop reading in step 1 is positive, the direction of the current is from positive to negative terminal of the voltmeter, and if it is negative, the current direction is opposite.'
            ],
            shunt: [
                'Determine shunt ratio or shunt factor as it is indicated on the shunt body or in the manufacture’s specification.',
                'Measure voltage drop across the shunt at the measurement terminals.',
                'Fill out the fields and press "Calculate"',
                'If voltage drop reading in step 2 is positive, the direction of the current is from positive to negative terminal of the voltmeter, and if it is negative, the current direction is opposite.'
            ],
            referenceCell: [
                'Measure potential using a reference cell type from the list.',
                'Fill out the fields. Select based reference type as reference cell type that was used and target reference type as reference cell type that potential value should be converted to.',
                'Press "Calculate"'
            ],
            wenner: [
                'Place four equally spaced and in-line electrodes into the ground.',
                "Connect the electrodes to a soil resistivity meter in accordance with the diagram or meter's manufacturer manual. Two outer electrodes are injecting current into the soil and two inner electrodes are measuring the voltage.",
                'Measure resistance and enter data into the form. If you wish to measure resistivity of different soil layers using Barnes method, press "Add layer", and repeat steps 1 and 2 with different spacing between the electrodes. Spacing values do not have to be in order. You can maximum have five layers in one calculation.',
                'Press "Calculate".'
            ]
        },
        hintItems: {
            coating: [
                'For more details refer to NACE TM0102 Measurement of Protective Coating Electrical Conductance on Underground Pipelines.',
                'Attenuation method is not implemented in this calculator. If there is a significant difference in IR drop between two locations, calculated result may be imprecise. Refer to NACE TM0102 for details.',
                'Choose access points that are remote from ground bed and other sources of interference.',
                'Soil resistivity can be calculated using Wenner method (Layer resistivity calculator)'
            ],
            currentFourWire: [
                'Calibration factor can be used for subsequent current calculations at the same location. It must be recalculated if pipe operating temperature changes.'
            ],
            currentTwoWire: [
                'Pipe segment resistance is calculated based on carbon steel (99% Fe, 1% C) resistivity of 14.3 μΩ-cm at 20 deg. C, however it may vary from 10 to 70 μΩ-cm according to different publications.',
                'This method is imprecise and suitable only for approximate estimation of current flowing within the pipe. Calculation error increases with larger pipe diameters, segment lengths and higher temperatures.'
            ],
            referenceCell: [
                'This converter does not take into account temperature effect on potential readings. Potential values are assumed to be taken at 25 deg. C'
            ],
            wenner: [
                'For more details refer to ASTM G57 - Standard Test Method for Measurement of Soil Resistivity Using the Wenner Four-Electrode Method'
            ]
        },
        addLayer: 'Add layer ({{count}}/{{max}})'
    }
}
