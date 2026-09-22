import { GetInitialMapRegion } from './GetInitialMapRegion'

const createService = ({bbox, current = {latitude: 45, longitude: 12}, mapRegion = {valid: true}} = {}) => {
    const geolocationRepo = {
        getCurrent: jest.fn().mockResolvedValue(current)
    }
    const geolocationCalculator = {
        calculateMarkersBbox: jest.fn().mockReturnValue(bbox)
    }
    const permissions = {
        location: jest.fn().mockResolvedValue()
    }
    const getMapRegionFromBbox = {
        execute: jest.fn().mockReturnValue(mapRegion)
    }

    return {
        service: new GetInitialMapRegion(geolocationRepo, geolocationCalculator, permissions, getMapRegionFromBbox),
        geolocationRepo,
        permissions,
        getMapRegionFromBbox
    }
}

describe('GetInitialMapRegion', () => {
    it('falls back to the current location for an incomplete bbox', async () => {
        const {service, geolocationRepo, permissions, getMapRegionFromBbox} = createService({
            bbox: [10, null, 20, 30]
        })

        await expect(service.execute([])).resolves.toEqual({
            latitude: 45,
            longitude: 12,
            latitudeDelta: 0.25,
            longitudeDelta: 0.25
        })
        expect(permissions.location).toHaveBeenCalled()
        expect(geolocationRepo.getCurrent).toHaveBeenCalled()
        expect(getMapRegionFromBbox.execute).not.toHaveBeenCalled()
    })

    it('falls back to the current location when the calculated region is invalid', async () => {
        const {service, permissions, getMapRegionFromBbox} = createService({
            bbox: [10, 20, 30, 40],
            mapRegion: {valid: false}
        })

        await expect(service.execute([])).resolves.toMatchObject({
            latitude: 45,
            longitude: 12
        })
        expect(getMapRegionFromBbox.execute).toHaveBeenCalledWith([10, 20, 30, 40])
        expect(permissions.location).toHaveBeenCalled()
    })

    it('accepts zero coordinates as a valid bbox', async () => {
        const mapRegion = {
            valid: true,
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
        const {service, permissions, getMapRegionFromBbox} = createService({
            bbox: [0, 0, 0, 0],
            mapRegion
        })

        await expect(service.execute([])).resolves.toEqual(mapRegion)
        expect(getMapRegionFromBbox.execute).toHaveBeenCalledWith([0, 0, 0, 0])
        expect(permissions.location).not.toHaveBeenCalled()
    })
})
