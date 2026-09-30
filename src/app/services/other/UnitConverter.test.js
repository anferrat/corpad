import { CurrentUnits, PotentialUnits } from '../../../constants/global'
import { UnitConverter } from './UnitConverter'

describe('UnitConverter', () => {
    const converter = new UnitConverter()

    it('returns null for unavailable voltage and current values', () => {
        expect(converter.convertVolts(null, PotentialUnits.VOLTS, PotentialUnits.VOLTS, 3)).toBeNull()
        expect(converter.convertAmps(undefined, CurrentUnits.AMPS, CurrentUnits.AMPS, 3)).toBeNull()
        expect(converter.convertVolts('not-a-number', PotentialUnits.VOLTS, PotentialUnits.MILIVOLTS, 3)).toBeNull()
    })

    it('still converts valid numeric values', () => {
        expect(converter.convertVolts(1.2345, PotentialUnits.VOLTS, PotentialUnits.MILIVOLTS, 0)).toBe(1235)
        expect(converter.convertAmps(1.2345, CurrentUnits.AMPS, CurrentUnits.MILI_AMPS, 2)).toBe(1234.5)
    })
})
