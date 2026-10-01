import { _ExportAssets } from './_ExportAssets'

describe('_ExportAssets', () => {
    const fileNameGenerator = {
        sanitizeFileName: filename => filename.replace(/[/:*?"<>|\\]/g, ''),
        getExtension: filename => filename.split('.').pop()
    }

    const createService = () => new _ExportAssets(null, null, null, null, fileNameGenerator)

    it('keeps the existing names when exported item names are unique', () => {
        const service = createService()
        const items = [{ id: 1, name: 'Test Point 1' }]
        const assets = [{ id: 10, uid: 'asset-one', parentId: 1, fileName: 'image-one.jpg' }]

        expect(service._getAssetFileNames(assets, items)).toEqual(['Test Point 1_image.jpg'])
    })

    it('adds a stable asset suffix when item names collide after sanitizing', () => {
        const service = createService()
        const items = [
            { id: 1, name: 'Test/Point' },
            { id: 2, name: 'TestPoint' }
        ]
        const assets = [
            { id: 10, uid: 'asset-one', parentId: 1, fileName: 'image-one.jpg' },
            { id: 20, uid: 'asset-two', parentId: 2, fileName: 'image-two.jpg' }
        ]

        expect(service._getAssetFileNames(assets, items)).toEqual([
            'TestPoint_image.jpg',
            'TestPoint_image-asset-two.jpg'
        ])
    })

    it('treats filenames as case-insensitive like iOS', () => {
        const service = createService()
        const items = [
            { id: 1, name: 'Test Point' },
            { id: 2, name: 'test point' }
        ]
        const assets = [
            { id: 10, uid: 'asset-one', parentId: 1, fileName: 'image-one.jpg' },
            { id: 20, uid: 'asset-two', parentId: 2, fileName: 'image-two.JPG' }
        ]

        expect(service._getAssetFileNames(assets, items)).toEqual([
            'Test Point_image.jpg',
            'test point_image-asset-two.JPG'
        ])
    })

    it('keeps multiple assets for one item distinct', () => {
        const service = createService()
        const items = [{ id: 1, name: 'Test Point' }]
        const assets = [
            { id: 10, uid: 'asset-one', parentId: 1, fileName: 'image-one.jpg' },
            { id: 20, uid: 'asset-two', parentId: 1, fileName: 'image-two.jpg' }
        ]

        expect(service._getAssetFileNames(assets, items)).toEqual([
            'Test Point_image.jpg',
            'Test Point_image-2.jpg'
        ])
    })
})
