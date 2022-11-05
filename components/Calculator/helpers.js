import fieldValidation from '../fieldValidation'
import { numberWithSpaces, fixRealValue, largeNumberHandler } from '../customFunctions'
import { thicknessTable, outerDiameters, npsList } from '../../constants/thicknessTable'
import { referenceCellValues, referenceCellCodes, referenceCellElectrodes } from './RefCell/ReferenceConverter'

export const initialCalculatorData = {
    shunt: {
        ratioVoltage: 50,
        ratioCurrent: null,
        factor: null,
        factorSelected: 0,
        voltageDrop: null
    },
    current2Wire: {
        voltageDrop: null,
        npsIndex: null,
        scheduleIndex: 3,
        distance: null,
    },
    current4Wire: {
        voltageDrop: {
            on: null,
            off: null,
        },
        current: null,
    },
    wenner: {
        layers: [{ spacing: null, resistance: null }],
    },
    coating: {
        npsIndex: null,
        spacing: null,
        start: {
            current: {
                on: null,
                off: null,
            },
            potential: {
                on: null,
                off: null,
            },
            resistivity: null
        },
        end: {
            current: {
                on: null,
                off: null,
            },
            potential: {
                on: null,
                off: null,
            },
            resistivity: null
        }
    },
    refCell: {
        initialType: null,
        targetType: null,
        potential: null
    }
}

export const initialValidObject = {
    shunt: {
        ratioVoltage: true,
        ratioCurrent: true,
        factor: true,
        voltageDrop: true
    },
    current2Wire: {
        voltageDrop: true,
        npsIndex: true,
        scheduleIndex: true,
        distance: true,
    },
    current4Wire: {
        voltageDrop: {
            on: true,
            off: true
        },
        current: true,
    },
    wenner: {
        layers: [{ spacing: true, resistance: true }],
    },
    coating: {
        npsIndex: true,
        spacing: true,
        start: {
            current: {
                on: true,
                off: true
            },
            potential: {
                on: true,
                off: true
            },
            resistivity: true
        },
        end: {
            current: {
                on: true,
                off: true
            },
            potential: {
                on: true,
                off: true
            },
            resistivity: true
        }
    },
    refCell: {
        initialType: true,
        targetType: true,
        potential: true
    }
}

export const validateAll = (data, calculatorType) => {
    switch (calculatorType) {
        case 'wenner':
            return ({
                isValid: data.layers.every(l => fieldValidation(l.resistance, 'resistance').valid && fieldValidation(l.spacing, 'spacing').valid),
                valid: {
                    layers: data.layers.map(l => ({
                        resistance: fieldValidation(l.resistance, 'resistance').valid,
                        spacing: fieldValidation(l.spacing, 'spacing').valid
                    }
                    ))
                }
            })
        case 'shunt':
            return ({
                isValid: ((fieldValidation(data.ratioVoltage, 'ratioVoltage', true).valid && fieldValidation(data.ratioCurrent, 'ratioCurrent', true).valid && data.factorSelected === 0) || (fieldValidation(data.factor, 'factor', true).valid && data.factorSelected === 1)) && fieldValidation(data.voltageDrop, 'voltageDrop', true).valid,
                valid: {
                    ratioVoltage: fieldValidation(data.ratioVoltage, 'ratioVoltage', true).valid,
                    ratioCurrent: fieldValidation(data.ratioCurrent, 'ratioCurrent', true).valid,
                    factor: fieldValidation(data.factor, 'factor', true).valid,
                    voltageDrop: fieldValidation(data.voltageDrop, 'voltageDrop', true).valid
                }
            })
        case 'current2Wire':
            return {
                isValid: fieldValidation(data.voltageDrop, 'voltageDrop', true).valid && fieldValidation(data.distance, 'distance', true).valid && data.npsIndex !== null && data.scheduleIndex !== null,
                valid: {
                    voltageDrop: fieldValidation(data.voltageDrop, 'voltageDrop', true).valid,
                    npsIndex: data.npsIndex !== null,
                    scheduleIndex: data.scheduleIndex !== null,
                    distance: fieldValidation(data.distance, 'distance', true).valid,
                }
            }
        case 'current4Wire':
            return {
                isValid: fieldValidation(data.voltageDrop.on, 'voltageDrop', true).valid && fieldValidation(data.voltageDrop.off, 'voltageDrop', true).valid && fieldValidation(data.current, 'current', true).valid && data.current !== 0,
                valid: {
                    voltageDrop: {
                        on: fieldValidation(data.voltageDrop.on, 'voltageDrop', true).valid,
                        off: fieldValidation(data.voltageDrop.off, 'voltageDrop', true).valid,
                    },
                    current: fieldValidation(data.current, 'current', true).valid && data.current !== 0,
                }
            }
        case 'coating':
            const pointValid = (data, point) => Object.keys(data[point])
                .every(property => {
                    return (typeof data[point][property] === "object" && data[point][property] !== null) ? Object.keys(data[point][property])
                        .every(status => fieldValidation(data[point][property][status], property, true).valid) : fieldValidation(data[point][property], property, true).valid
                })
            const validatePoint = (data, point) =>
                Object.fromEntries(Object.keys(data[point]).map(property =>
                    [property,
                        (typeof data[point][property] === "object" && data[point][property] !== null) ? Object.fromEntries(Object.keys(data[point][property]).map(status =>
                            [status, fieldValidation(data[point][property][status], property, true).valid])) : fieldValidation(data[point][property], property, true).valid]))
            return {
                isValid: pointValid(data, 'start') && pointValid(data, 'end') && fieldValidation(data.spacing, 'spacing', true).valid && data.npsIndex !== null,
                valid: {
                    npsIndex: data.npsIndex !== null,
                    spacing: fieldValidation(data.spacing, 'spacing', true).valid,
                    start: validatePoint(data, 'start'),
                    end: validatePoint(data, 'end')
                }
            }
        case 'refCell': {
            return {
                isValid: data.initialType !== null && data.targetType !== null && fieldValidation(data.potential, 'potential', true).valid,
                valid: {
                    initialType: data.initialType !== null,
                    targetType: data.targetType !== null,
                    potential: fieldValidation(data.potential, 'potential', true).valid
                }
            }
        }
        default:
            return {
                isValid: false,
                valid: {}
            }
    }

}

export const getResult = (data, calculatorType, isMetric) => {
    switch (calculatorType) {
        case 'wenner':
            {
                const unit = isMetric ? 'cm' : 'ft'
                const multiplier = isMetric ? 2 * Math.PI : 30.48 * 2 * Math.PI
                const layers = [...data.layers].sort((a, b) => a.spacing - b.spacing)
                const layersCalculated = layers.map((l, i) => {
                    const layerResistance = i === 0 ? l.resistance : (l.resistance * layers[i - 1].resistance) / (layers[i - 1].resistance - l.resistance)
                    const resistivityAverage = l.resistance * l.spacing * multiplier
                    return ({
                        ...l,
                        layerStart: i === 0 ? 0 : layers[i - 1].spacing,
                        layerEnd: l.spacing,
                        resistivityAverage: resistivityAverage,
                        layerResistance: layerResistance,
                        layerResistivity: i === 0 ? resistivityAverage : (multiplier * (l.spacing - layers[i - 1].spacing) * layerResistance)
                    })
                })
                return {
                    result: {
                        spacingUnit: unit,
                        resistanceUnit: '\u03A9',
                        resistivityUnit: '\u03A9-cm',
                        average: layersCalculated.map(l => ({
                            a1: 0,
                            a2: fixRealValue(l.layerEnd),
                            resistance: fixRealValue(l.resistance),
                            resistivity: numberWithSpaces(fixRealValue(l.resistivityAverage)),

                        })),
                        layers: layersCalculated.map(l => ({
                            a1: fixRealValue(l.layerStart),
                            a2: fixRealValue(l.layerEnd),
                            resistance: fixRealValue(l.layerResistance),
                            resistivity: numberWithSpaces(fixRealValue(l.layerResistivity)),
                        }))
                    },
                    exportedObject: [
                        [`Spacing, ${unit}`, 'Resistance, ohm', 'Average resistivity, ohm-cm', 'Layer resistance, ohm', 'Layer resistivity, ohm-cm'],
                        ...layersCalculated.map(l => [l.spacing, l.resistance, l.resistivityAverage, l.layerResistance, l.layerResistivity])
                    ],
                    label: `${layers.length} layer${layers.length === 1 ? '' : 's'}, 0 - ${layers[layers.length - 1].spacing} ${unit}`
                }
            }
        case 'shunt':
            {
                const ratioVoltage = !data.factorSelected ? data.ratioVoltage : 50
                const ratioCurrent = !data.factorSelected ? data.ratioCurrent : data.factor * 50
                const factor = data.factorSelected ? data.factor : fixRealValue((ratioCurrent / ratioVoltage))
                const resistance = fixRealValue((ratioVoltage / ratioCurrent / 1000))
                const shuntCurrent = fixRealValue((ratioCurrent * data.voltageDrop / ratioVoltage))
                return ({
                    result: {
                        title: `Shunt (${ratioVoltage} mV - ${ratioCurrent} A)`,
                        values: [
                            {
                                title: 'Shunt factor',
                                value: factor,
                                unit: 'A/mV'
                            },
                            {
                                title: 'Shunt resistance',
                                value: resistance,
                                unit: '\u03A9'
                            },
                            {
                                title: 'Current',
                                value: shuntCurrent,
                                unit: 'A'
                            }
                        ]
                    },
                    exportedObject: [
                        ['Shunt ratio', 'Shunt factor, A/mV', 'Shunt resistance, ohm', 'Voltage drop, mV', 'Current, A'],
                        [`${ratioVoltage} mV - ${ratioCurrent} A`, factor, resistance, data.voltageDrop, shuntCurrent]
                    ],
                    label: `${ratioVoltage} mV - ${ratioCurrent} A`
                })
            }
        case 'current2Wire': {
            const unit = isMetric ? 'm' : 'ft'
            const weightUnit = isMetric ? 'kg/m' : 'lb/ft'
            const CARBON_STEEL_RESISTIVITY = isMetric ? 0.000000143 : 0.000000469160
            const steelDensity = isMetric ? 7832 : 489
            const pipeThickness = thicknessTable[data.npsIndex].filter(v => v !== null)[data.scheduleIndex]
            const od = outerDiameters[data.npsIndex]
            const weight = 10.69 * (od - pipeThickness) * pipeThickness * (isMetric ? 0.453592 / 0.3048 : 1)
            const resistance = steelDensity / weight * CARBON_STEEL_RESISTIVITY * data.distance
            const current = fixRealValue(data.voltageDrop / 1000 / resistance)
            return {
                result: {
                    title: `Two-wire line current (${data.distance} ${unit})`,
                    values: [
                        {
                            title: 'Steel resistivity',
                            value: 14.3,
                            unit: '\u03BC\u03A9-cm'
                        },
                        {
                            title: 'Pipe weight',
                            value: fixRealValue(weight),
                            unit: weightUnit
                        },
                        {
                            title: 'Pipe segment resistance',
                            value: fixRealValue(resistance * 1000),
                            unit: 'm\u03A9'
                        },
                        {
                            title: 'Current',
                            value: current,
                            unit: 'A'
                        }
                    ],
                },
                exportedObject:
                    [
                        [`Pipe segment length, ${unit}`, 'Pipe diameter', 'Pipe OD, in', 'Wall thickness, in', `Pipe weight, ${weightUnit}`, 'Steel resistivity, microohm-cm', 'Pipe segment resistance, ohm', 'Current, A'],
                        [data.distance, npsList[data.npsIndex], od, pipeThickness, weight, '14.3', resistance, current]
                    ],
                label: `${data.distance} ${unit},  ${current} A`
            }
        }
        case 'current4Wire': {
            const resistance = Math.abs(data.voltageDrop.on - data.voltageDrop.off) / data.current
            const calibrationFactor = data.current / Math.abs(data.voltageDrop.on - data.voltageDrop.off)
            const current = fixRealValue(calibrationFactor * data.voltageDrop.off)
            return {
                result: {
                    title: `Four-wire line current (${data.current} A test current)`,
                    values: [
                        {
                            title: 'Section resistance',
                            value: fixRealValue(resistance),
                            unit: 'm\u03A9'
                        },
                        {
                            title: 'Calibration factor',
                            value: fixRealValue(calibrationFactor),
                            unit: 'A/mV'
                        },
                        {
                            title: 'Current',
                            value: current,
                            unit: 'A'
                        }
                    ],
                },
                exportedObject:
                    [
                        ['Voltage drop (OFF), mV', 'Test current, A', 'Voltage drop (ON), mV', 'Resistance, mOhm', 'Calibration factor, A/mV', 'Current, A'],
                        [data.voltageDrop.off, data.current, data.voltageDrop.on, resistance, calibrationFactor, current]
                    ],
                label: `${fixRealValue(resistance)} m\u03A9, ${current} A`
            }
        }
        case 'coating':
            {
                const getCoatingQuality = (a) => a <= 100 ? 'excellent' : (a > 100 && a <= 500 ? 'good' : (a > 500 && a <= 2000 ? 'fair' : 'bad'))
                const unit = isMetric ? 'm' : 'ft'
                const od = outerDiameters[data.npsIndex] * (isMetric ? 0.0254 : 0.0833333)
                const npsValue = npsList[data.npsIndex]
                const surfaceArea = od * Math.PI * data.spacing
                const deltaEStart = Math.abs(data.start.potential.off - data.start.potential.on)
                const deltaEEnd = Math.abs(data.end.potential.off - data.end.potential.on)
                const deltaE = (deltaEStart + deltaEEnd) / 2
                const deltaIstart = (data.start.current.on - data.start.current.off)
                const deltaIend = (data.end.current.on - data.end.current.off)
                const deltaI = Math.abs(deltaIstart - deltaIend)
                const resistance = deltaE / 1000 / deltaI
                const specificResistance = resistance * surfaceArea
                const conductance = 1 / resistance
                const specificConductance = 1 / specificResistance * 1000000
                const averageResistivity = ((Number(data.start.resistivity) + Number(data.end.resistivity)) / 2)
                const normilizedConductance = specificConductance * averageResistivity / 1000
                const quality = getCoatingQuality(normilizedConductance)
                return {
                    result: {
                        title: `Coating resistance (${npsValue}, ${data.spacing} ${unit})`,
                        coatingQuality: quality,
                        values: [
                            {
                                title: 'Pipe-to-earth resistance',
                                value: fixRealValue(resistance),
                                unit: '\u03A9'
                            },
                            {
                                title: 'Specific resistance',
                                value: numberWithSpaces(fixRealValue(specificResistance)),
                                unit: {
                                    main: `\u03A9-${unit}`,
                                    script: '2',
                                    format: 'super'
                                }
                            },
                            {
                                title: 'Conductance',
                                value: fixRealValue(conductance),
                                unit: 'S'
                            },
                            {
                                title: 'Specific conductance',
                                value: fixRealValue(specificConductance),
                                unit: {
                                    main: `\u00B5S/${unit}`,
                                    script: '2',
                                    format: 'super'
                                }
                            },
                            {
                                title: 'Conductance (1000 \u03A9-cm soil)',
                                value: fixRealValue(normilizedConductance),
                                unit: {
                                    main: `\u00B5S/${unit}`,
                                    script: '2',
                                    format: 'super'
                                }
                            },
                        ],
                    },
                    exportedObject: [
                        [' ', 'Current (ON), A', 'Current (OFF), A', 'Potentials (ON), mV', 'Potentials (OFF), mV', 'Soil resistivity, ohm-cm'],
                        ['Test point 1 - Start', data.start.current.on, data.start.current.off, data.start.potential.on, data.start.potential.off, data.start.resistivity],
                        ['Test point 2 - End', data.end.current.on, data.end.current.off, data.end.potential.on, data.end.potential.off, data.end.resistivity],
                        [''],
                        [`Pipe segment length, ${unit}`, 'Pipe diameter', `Pipe OD, ${unit}`, 'Voltage difference(avg.), mV', 'Current picked up by pipeline, A', 'Pipe-to-earth resistance, ohm', 'Overall conductance, S', `Specific resistance, ohm-${unit}2`, `Specific conductance, ohm/${unit}2`, 'Average soil resistivity, ohm-cm', `Normilized conductance,  ohm-${unit}2`, 'Coating quality'],
                        [data.spacing, npsValue, od, deltaE, deltaI, resistance, conductance, specificResistance, specificConductance, averageResistivity, normilizedConductance, quality]
                    ],
                    label: `${npsValue}, ${data.spacing} ${unit}`
                }
            }
        case 'refCell': {
            const coefficient = -referenceCellValues[data.initialType] + referenceCellValues[data.targetType]
            const resultPotential = data.potential - (coefficient * 1000)
            return {
                result: {
                    title: `Potentials converter`,
                    values: [
                        {
                            title: 'Coefficient',
                            value: fixRealValue(coefficient),
                            unit: 'V'
                        },
                        {
                            title: 'Target reference',
                            value: referenceCellElectrodes[data.targetType],
                            unit: ''
                        },
                        {
                            title: 'Converted potential',
                            value: fixRealValue(resultPotential),
                            unit: {
                                main: `mV`,
                                script: referenceCellCodes[data.targetType],
                                format: 'sub'
                            }
                        }]
                },
                exportedObject: [
                    ['Initial reference cell', `Initial potential, mV(${referenceCellCodes[data.initialType]})`, 'Target reference cell', 'Coefficient, V', `Converted potential, mV(${referenceCellCodes[data.targetType]})`],
                    [referenceCellElectrodes[data.initialType], data.potential, referenceCellElectrodes[data.targetType], coefficient, resultPotential]
                ],
                label: `${referenceCellCodes[data.initialType]} -> ${referenceCellCodes[data.targetType]}`,
            }
        }
        default:
            return {
                result: {},
                exportedObject: [],
                label: '',
            }
    }
}