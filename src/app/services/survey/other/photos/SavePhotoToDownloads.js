import { FileSystemLocations } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class SavePhotoToDownloads {
    constructor(fileSystemRepo, permissions, fileNameGenerator) {
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
        this.fileNameGenerator = fileNameGenerator
    }

    async execute(path, name) {
        await this.permissions.storage()
        const ext = path.substring(path.lastIndexOf('.') + 1, path.length)
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.DOWNLOADS)
        const fileName = this.fileNameGenerator.execute(`image-${name}`, ext)
        try {
            await this.fileSystemRepo.copyFile(path, `${destinationPath}/${fileName}`)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to save to Downloads', er, 416)
        }
        await this.fileSystemRepo.scanFile(`${destinationPath}/${fileName}`)
    }
}