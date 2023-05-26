import { SubitemTypes } from "../../../constants/global"

export class SubitemConverter {
    constructor(propertyConverter) {
        this.conv = propertyConverter
    }

    _potentialConverter(row, fields, potential, referenceCells, potentialTypes) {
        const { potentialTypeIndex, referenceCellIndex } = potential
        try {
            return {
                value: this.conv.convertValue(row, fields, potential),
                unit: this.conv.convertUnit(potential),
                referenceCellId: referenceCells[referenceCellIndex].id,
                potentialTypeId: potentialTypes[potentialTypeIndex].id
            }
        }
        catch (err) {
            return null
        }
    }

    _executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes) {
        if (potentials)
            return {
                potentials: potentials.map(potential => this._potentialConverter(row, fields, potential, referenceCells, potentialTypes)).filter(p => p !== null)
            }
        else return {
            potentials: []
        }
    }

    _namePropConverter(row, fields, type, key, name, defaultNames) {
        const defaultName = defaultNames[type]
        return {
            type: type,
            key: key,
            name: this.conv.convertValue(row, fields, name, null, defaultName)
        }
    }

    _wirePropConverter(row, fields, wireColor, wireGauge) {
        return {
            wireGauge: this.conv.convertValue(row, fields, wireGauge),
            wireColor: this.conv.convertValue(row, fields, wireColor)
        }
    }


    execute(row, fields, subitem, defaultNames, referenceCells, potentialTypes, pipelineList) {
        try {
            if (subitem?.type) {
                const { name, key, type, potentials, anodeMaterial, pipelineIndex, current, wireColor, wireGauge, sideA, sideB, fromAtoB, rcType, pipelineCardKey, couponType, area, shorted, isolationType, nps, factor, voltageDrop, voltage, targetMin, targetMax } = subitem
                const baseProps = this._namePropConverter(row, fields, type, key, name, defaultNames)
                switch (type) {
                    case SubitemTypes.ANODE:
                        return {
                            ...baseProps,
                            ...this._wirePropConverter(row, fields, wireColor, wireGauge),
                            anodeMaterial: this.conv.convertValue(row, fields, anodeMaterial),
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes)
                        }
                    case SubitemTypes.BOND:
                        return {
                            ...baseProps,
                            sideA: sideA,
                            sideB: sideB,
                            fromAtoB: fromAtoB,
                            current: this.conv.convertValue(row, fields, current),
                            currentUnit: this.conv.convertUnit(current)
                        }
                    case SubitemTypes.CIRCUIT:
                        return {
                            ...baseProps,
                            voltage: this.conv.convertValue(row, fields, voltage),
                            voltageUnit: this.conv.convertUnit(voltage),
                            currentUnit: this.conv.convertUnit(current),
                            current: this.conv.convertValue(row, fields, current),
                            targetMax: this.conv.convertValue(row, fields, targetMax),
                            targetMin: this.conv.convertValue(row, fields, targetMin)
                        }
                    case SubitemTypes.COUPON:
                        return {
                            ...baseProps,
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes),
                            couponType: this.conv.convertValue(row, fields, couponType),
                            pipelineCardKey: pipelineCardKey,
                            ...this._wirePropConverter(row, fields, wireColor, wireGauge),
                            current: this.conv.convertValue(row, fields, current),
                            area: this.conv.convertValue(row, fields, area),
                            areaUnit: this.conv.convertUnit(area),
                            currentUnit: this.conv.convertUnit(current),
                            density: null // density is calculated inside entity before import. Good idea is to have option to import density directly or import area and current. for future
                        }
                    case SubitemTypes.ISOLATION:
                        const shortedValue = this.conv.convertValue(row, fields, shorted)
                        return {
                            ...baseProps,
                            sideA: sideA,
                            sideB: sideB,
                            fromAtoB: fromAtoB,
                            current: shortedValue ? this.conv.convertValue(row, fields, current) : null,
                            currentUnit: this.conv.convertUnit(current),
                            isolationType: this.conv.convertValue(row, fields, isolationType),
                            shorted: shortedValue
                        }
                    case SubitemTypes.PIPELINE:
                        return {
                            ...baseProps,
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes),
                            pipelineId: pipelineList[pipelineIndex]?.id ?? null,
                            ...this._wirePropConverter(row, fields, wireColor, wireGauge)
                        }
                    case SubitemTypes.REFERENCE_CELL:
                        return {
                            ...baseProps,
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes),
                            rcType: this.conv.convertValue(row, fields, rcType),
                            ...this._wirePropConverter(row, fields, wireColor, wireGauge)
                        }
                    case SubitemTypes.RISER:
                        return {
                            ...baseProps,
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes),
                            nps: this.conv.convertValue(row, fields, nps),
                            pipelineId: pipelineList[pipelineIndex]?.id ?? null,
                        }
                    case SubitemTypes.SHUNT:
                        return {
                            ...baseProps,
                            sideA: sideA,
                            sideB: sideB,
                            fromAtoB: fromAtoB,
                            factor: this.conv.convertValue(row, fields, factor),
                            voltageDrop: this.conv.convertValue(row, fields, voltageDrop)
                        }
                    case SubitemTypes.STRUCTURE:
                        return {
                            ...baseProps,
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes),
                        }
                    case SubitemTypes.TEST_LEAD:
                        return {
                            ...baseProps,
                            ...this._executePotentialConverter(row, fields, potentials, referenceCells, potentialTypes),
                            ...this._wirePropConverter(row, fields, wireColor, wireGauge)
                        }
                    default: throw 'Unknown subitem type'
                }
            }

            else throw 'subitem type is not defined'
        }
        catch (err) {
            return null
        }
    }
}