import RNShare from 'react-native-share'
import { Platform } from 'react-native'
import { FileSystemLocations } from '../../../constants/global'

export class Share {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async shareFile(url, mimeType) {
        try {
            let sharePath = url
            if (Platform.OS === 'android') {
                const sourcePath = url.startsWith('file://') ? url.substring(7) : url
                const cachePath = await this.fileSystemRepo.getLocation(FileSystemLocations.CACHE)
                const fileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1)
                const cacheFileName = await this.fileSystemRepo.getFileName(fileName, FileSystemLocations.CACHE)
                sharePath = `${cachePath}/${cacheFileName}`
                await this.fileSystemRepo.copyFile(sourcePath, sharePath)
            }

            await RNShare.open({
                url: 'file://' + sharePath,
                type: mimeType,
                useInternalStorage: true,
                showAppsToView: true,
                isNewTask: true,
            })
        }
        catch (er) {
            console.log(er)
        }
    }

}
