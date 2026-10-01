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

    _getUniqueAssetFileName(fileName, asset, usedFileNames) {
        const normalizedFileName = fileName.toLowerCase()
        if (!usedFileNames.has(normalizedFileName))
            return fileName

        const extension = this.fileNameGenerator.getExtension(fileName)
        const extensionSuffix = extension ? `.${extension}` : ""
        const baseName = extension ? fileName.slice(0, -(extension.length + 1)) : fileName
        const uniqueId = asset.uid || asset.id || "asset"
        let uniqueFileName = `${baseName}-${uniqueId}${extensionSuffix}`
        let duplicateIndex = 2

        while (usedFileNames.has(uniqueFileName.toLowerCase())) {
            uniqueFileName = `${baseName}-${uniqueId}-${duplicateIndex}${extensionSuffix}`
            duplicateIndex++
        }

        return uniqueFileName
    }

    _getAssetFileNames(assets, items) {
        const itemNames = new Map(items.map(({ id, name }) => [id, name]))
        const itemAssetCount = new Map(items.map(({ id }) => [id, 0]))
        const usedFileNames = new Set()

        return assets.map(asset => {
            const { parentId, fileName } = asset
            const itemName = itemNames.get(parentId)
            const count = itemAssetCount.get(parentId) ?? 0
            itemAssetCount.set(parentId, count + 1)

            const fileNameWithItemName = this._getAssetFileName(count, itemName, fileName)
            const uniqueFileName = this._getUniqueAssetFileName(fileNameWithItemName, asset, usedFileNames)
            usedFileNames.add(uniqueFileName.toLowerCase())
            return uniqueFileName
        })
    }

    async execute(itemType, exportFileName) {
        const items = await this._getItems(itemType)
        if (items.length > 0) {
            const assetFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP_ASSETS)
            const tempAssetFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_ASSETS)
            const exportedFilesFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.EXPORTS)
            const assets = (await this.assetRepo.getAll()).filter(({ parentType }) => parentType === itemType)
            const assetNames = this._getAssetFileNames(assets, items)

            try {
                const copyResults = await Promise.allSettled(assets.map(async ({ fileName }, index) => {
                    await this.fileSystemRepo.copyFile(`${assetFolder}/${fileName}`, `${tempAssetFolder}/${assetNames[index]}`)
                }))
                const failedCopy = copyResults.find(({ status }) => status === 'rejected')
                if (failedCopy)
                    throw failedCopy.reason

                const archiveName = `${exportFileName}_images.zip`
                await this.fileSystemRepo.zip(tempAssetFolder, `${exportedFilesFolder}/${archiveName}`)
            }
            finally {
                await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP_ASSETS)
            }
        }
    }
}
