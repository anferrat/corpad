import map from './map'
import { applyMapFilter, loadMarkers, refreshMarkers, resetMapFilters } from '../actions/map'

describe('map reducer marker fitting', () => {
    it('requests a camera fit after filters are applied or reset', () => {
        const initial = map(undefined, {type: '@@INIT'})

        expect(map(initial, applyMapFilter('statusFilter', [1])).fitMarkersAfterLoad).toBe(true)
        expect(map(initial, resetMapFilters()).fitMarkersAfterLoad).toBe(true)
    })

    it('requests a camera fit after refresh', () => {
        const initial = map(undefined, {type: '@@INIT'})

        expect(map(initial, refreshMarkers()).fitMarkersAfterLoad).toBe(true)
    })

    it('clears the fit request when markers finish loading', () => {
        const filtered = map(
            map(undefined, {type: '@@INIT'}),
            applyMapFilter('statusFilter', [1])
        )

        const loaded = map(filtered, loadMarkers([]))

        expect(loaded.fitMarkersAfterLoad).toBe(false)
        expect(loaded.loading).toBe(false)
    })
})
