export class AssetFileDownloadControl {
    constructor() { }

    execute(assets, cloudFileList, fileList) {
        const assetFileNames = new Set(assets.map(({ fileName }) => fileName))
        const localFileNames = new Set(fileList.map(({ filename }) => filename))
        const cloudFileNames = new Set(cloudFileList.map(({ name }) => name))
        return {
            cloudFilesToDownload: cloudFileList.filter(({ name }) => !localFileNames.has(name) && assetFileNames.has(name)),
            localFilesToCopy: fileList.filter(({ filename }) => assetFileNames.has(filename)),
            missingAssets: assets.filter(({ fileName }) => !cloudFileNames.has(fileName))
        }
    }
}