import { GeoJsonPointExtractor } from './GeoJsonPointExtractor'

describe('GeoJsonPointExtractor', () => {
    it('extracts point features without failing during iteration', () => {
        const extractor = new GeoJsonPointExtractor()

        const result = extractor.execute({
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {name: 'Point A'},
                    geometry: {type: 'Point', coordinates: [20, 10]}
                },
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {type: 'LineString', coordinates: [[20, 10], [30, 15]]}
                }
            ]
        })

        expect(result.points).toHaveLength(1)
        expect(result.points[0]).toMatchObject({
            name: 'Point A',
            latitude: 10,
            longitude: 20
        })
        expect(result.geoJson.features).toHaveLength(1)
        expect(result.bbox).toEqual([20, 10, 30, 15])
    })
})
