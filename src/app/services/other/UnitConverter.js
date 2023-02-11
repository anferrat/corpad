import { CurrentUnits, PotentialUnits } from "../../entities/survey/other/properties"

export class UnitConverter {
    constructor () {
    }

    convertVolts(value, inputUnit, outputUnit) {
        if (inputUnit === outputUnit) {
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
        return result
    }

    convertAmps(value, inputUnit, outputUnit) {
        if (inputUnit === outputUnit) {
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
            result = result.toFixed(1)
        }
        return result
    }
}