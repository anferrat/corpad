export class AssetFileSaveControl {
    constructor() { }

    execute(assets, currentAssetFiles, surveyAssetFiles) {
        const currentAssetFileNames = new Set(currentAssetFiles.map(({ filename }) => filename))
        const surveyAssetFileNames = new Set(surveyAssetFiles.map(({ filename }) => filename))
        const assetFileNames = new Set(assets.map(({ fileName }) => fileName))
        return {
            localFilesToDelete: surveyAssetFiles.filter(({ filename }) => !assetFileNames.has(filename)),
            localFilesToCopy: currentAssetFiles.filter(({ filename }) => !surveyAssetFileNames.has(filename) && assetFileNames.has(filename)),
            missingAssets: assets.filter(({ fileName }) => !currentAssetFileNames.has(fileName))
        }
    }
}