import { FileSystemLocations, ItemTypes } from "../../../../../../../constants/global"
import { Error, errors } from "../../../../../../utils/Error"

export class _ExportAssets {
    constructor(fileSystemRepo, assetRepo, testPointRepo, rectifierRepo, fileNameGenerator) {
        this.fileSystemRepo = fileSystemRepo
        this.assetRepo = assetRepo
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.fileNameGenerator = fileNameGenerator
    }

    async _getItems(itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.getAll()
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.getAll()
            default:
                throw new Error(errors.GENERAL, `Unable to get items`, `Item type ${itemType} is not supporting asset export`)
        }
    }

    _getAssetFileName(count, itemName, assetFileName) {
        const name = this.fileNameGenerator.sanitizeFileName(itemName)
        const ext = this.fileNameGenerator.getExtension(assetFileName)
        return `${name}_image${count ? `-${count + 1}` : ""}.${ext}`
    }

    async execute(itemType, exportFileName) {
        const items = await this._getItems(itemType)
        if (items.length > 0) {
            const assetFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP_ASSETS)
            const tempAssetFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_ASSETS)
            const exportedFilesFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.EXPORTS)
            const assets = (await this.assetRepo.getAll()).filter(({ parentType }) => parentType === itemType)
            const itemNames = new Map(items.map(({ id, name }) => [id, name]))
            const itemAssetCount = new Map(items.map(({ id }) => [id, 0]))
            const assetNames = assets.map(({ parentId, fileName }) => {
                const itemName = itemNames.get(parentId)
                const count = itemAssetCount.get(parentId)
                itemAssetCount.set(parentId, count + 1)
                return this._getAssetFileName(count, itemName, fileName)
            })
            await Promise.all(assets.map(async ({ parentId, fileName }, index) => {
                await this.fileSystemRepo.copyFile(`${assetFolder}/${fileName}`, `${tempAssetFolder}/${assetNames[index]}`)
            }))
            const archiveName = `${exportFileName}_images.zip`
            await this.fileSystemRepo.zip(tempAssetFolder, `${exportedFilesFolder}/${archiveName}`)
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP_ASSETS)
        }
    }
}