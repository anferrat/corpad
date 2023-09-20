import { guid } from "../../../../utils/guid"
import { ExternalFile } from "../../../../entities/survey/other/ExternalFile"
import { FileSystemLocations } from "../../../../../constants/global"

export class CreateAssetFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(uri) {
        const file = new ExternalFile(uri, undefined)
        const path = file.getPath()
        const ext = path.substring(path.lastIndexOf('.') + 1, path.length)
        const uid = guid()
        const newFileName = `image-${uid}${ext ? `.${ext}` : ''}`
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
        await this.fileSystemRepo.copyFile(path, `${destinationPath}/${newFileName}`)
        return {
            filename: newFileName,
            uid: uid,
            folder: destinationPath
        }
    }
}