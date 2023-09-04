export class AssetFileSaveControl {
    constructor() { }

    execute(assets, currentAssetFiles, surveyAssetFiles) {
        const currentAssetFileNames = new Set(currentAssetFiles.map(({ filename }) => filename))
        const surveyAssetFileNames = new Set(surveyAssetFiles.map(({ filename }) => filename))
        return {
            localFilesToDelete: surveyAssetFiles.filter(({ filename }) => !currentAssetFileNames.has(filename)),
            localFilesToCopy: currentAssetFiles.filter(({ filename }) => !surveyAssetFileNames.has(filename)),
            missingAssets: assets.filter(({ fileName }) => !currentAssetFileNames.has(fileName))
        }
    }
}