export class AssetFileUploadControl {
    constructor() { }

    execute(assets, cloudFileList, fileList) {
        const assetFileNames = new Set(assets.map(({ fileName }) => fileName))
        const localFileNames = new Set(fileList.map(({ filename }) => filename))
        const cloudFileNames = new Set(cloudFileList.map(({ name }) => name))
        return {
            localFilesToUpload: fileList.filter(({ filename }) => !cloudFileNames.has(filename) && assetFileNames.has(filename)),
            cloudFilesToDelete: cloudFileList.filter(({ name }) => !localFileNames.has(name) && !assetFileNames.has(name)),
            missingAssets: assets.filter(({ fileName }) => !localFileNames.has(fileName))
        }
    }
}