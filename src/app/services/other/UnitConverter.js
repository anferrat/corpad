import { AreaUnits, CurrentUnits, FactorUnits, PotentialUnits } from "../../../constants/global"

export class UnitConverter {
    constructor() {
    }

    convertVolts(value, inputUnit, outputUnit) {
        if (inputUnit === outputUnit || value === null) {
            return value
        }

        let result = value
        switch (inputUnit) {
            case PotentialUnits.MILIVOLTS:
                result *= 0.001
                break;
            case PotentialUnits.NEGATIVE_MILIVOLTS:
                result *= -0.001
                break;
            case PotentialUnits.NEGATIVE_VOLTS:
                result *= -1
                break;
        }
        switch (outputUnit) {
            case PotentialUnits.MILIVOLTS:
                result *= 1000
                break;
            case PotentialUnits.NEGATIVE_MILIVOLTS:
                result *= -1000
                break;
            case PotentialUnits.NEGATIVE_VOLTS:
                result *= -1
                break;
        }

        if (outputUnit === PotentialUnits.VOLTS || outputUnit === PotentialUnits.NEGATIVE_VOLTS) {
            result = result.toFixed(3)
        } else {
            result = result.toFixed(0)
        }
        return parseFloat(result)
    }

    convertAmps(value, inputUnit, outputUnit) {
        if (inputUnit === outputUnit || value === null) {
            return value
        }
        let result = value
        switch (inputUnit) {
            case CurrentUnits.MICRO_AMPS:
                result *= 0.000001
                break
            case CurrentUnits.MILI_AMPS:
                result *= 0.001
                break
        }
        switch (outputUnit) {
            case CurrentUnits.MICRO_AMPS:
                result *= 1000000
                break
            case CurrentUnits.MILI_AMPS:
                result *= 1000
                break
        }
        if (outputUnit === CurrentUnits.AMPS) {
            result = result.toFixed(3)
        } else {
            result = result.toFixed(3)
        }
        return parseFloat(result)
    }

    convertArea(value, inputUnit, outputUnit) {
        //only works for cm2 and m2. change when added more
        if (inputUnit === outputUnit || value === null) {
            return value
        }
        else if (inputUnit === AreaUnits.CENTIMETER_SQUARE)
            return parseFloat((value * 0.0001).toFixed(3))
        else return parseFloat((value * 10000).toFixed(2))
    }

    convertFactor(value, inputUnit, outputUnit) {
        if (inputUnit === outputUnit || value === null)
            return value
        let result = value
        switch (inputUnit) {
            case FactorUnits.AMPS_OVER_VOLTS:
                result = result * 0.001
                break
            case FactorUnits.MILIVOLTS_OVER_AMPS:
                result = 1 / (result)
                break
            case FactorUnits.VOLTS_OVER_AMPS:
                result = 1 / (result * 0.001)
                break
        }
        switch (outputUnit) {
            case FactorUnits.AMPS_OVER_VOLTS:
                result = result * 1000
                break
            case FactorUnits.MILIVOLTS_OVER_AMPS:
                result = 1 / (result)
                break
            case FactorUnits.VOLTS_OVER_AMPS:
                result = 1 / (result * 1000)
                break
        }
        return result

    }
}