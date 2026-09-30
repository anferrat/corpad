import { getActiveFields, getValue } from './functions'

describe('View multimeter helpers', () => {
    it('shows a device flag and falls back to the numeric value when no flag exists', () => {
        expect(getValue({ flag: 'OL', value: null })).toBe('OL')
        expect(getValue({ flag: undefined, value: 12.3 })).toBe(12.3)
        expect(getValue(null)).toBeUndefined()
    })

    it('does not throw when an ON/OFF potential is no longer available', () => {
        const selectedField = {
            potentialId: 1,
            subitemIndex: 0,
            property: 'potential',
        }

        expect(getActiveFields(selectedField, 2, 3, [{}])).toEqual([
            { ...selectedField, potentialId: 2, potentialIndex: -1 },
            { ...selectedField, potentialId: 3, potentialIndex: -1 },
        ])
    })
})
