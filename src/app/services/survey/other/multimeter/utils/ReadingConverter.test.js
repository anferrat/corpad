import { MultimeterReadingTypes, PotentialUnits } from '../../../../../../constants/global'
import { Reading } from '../../../../../entities/survey/multimeter/Reading'
import { UnitConverter } from '../../../../other/UnitConverter'
import { ReadingConverter } from './ReadingConverter'

describe('ReadingConverter', () => {
    const converter = new ReadingConverter(new UnitConverter())

    it('preserves a flagged reading without numeric conversion', () => {
        const reading = new Reading(
            null,
            null,
            Date.now(),
            MultimeterReadingTypes.VOLTAGE,
            PotentialUnits.VOLTS,
            'OL',
            false,
            null
        )

        expect(() => converter.execute(reading, PotentialUnits.MILIVOLTS, 'voltage')).not.toThrow()
        expect(converter.execute(reading, PotentialUnits.MILIVOLTS, 'voltage')).toMatchObject({
            value: null,
            flag: 'OL'
        })
    })

    it('preserves an unavailable unflagged reading', () => {
        const reading = new Reading(
            null,
            null,
            Date.now(),
            MultimeterReadingTypes.VOLTAGE,
            PotentialUnits.VOLTS,
            null,
            false,
            null
        )

        expect(converter.execute(reading, PotentialUnits.MILIVOLTS, 'voltage').value).toBeNull()
    })
})
