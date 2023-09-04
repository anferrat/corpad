import { FileSystemLocations, ItemTypes, MediaTypes } from "../../../../constants/global"

export class GetItemPhotos {
    constructor(assetRepo, fileSystemRepo) {
        this.assetRepo = assetRepo
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(itemId, itemType) {
        if (itemType !== ItemTypes.PIPELINE) {
            const assets = await this.assetRepo.getByItemId(itemId, itemType)
            const photos = assets.filter(({ mediaType }) => mediaType === MediaTypes.IMAGE)
            const assetDirPath = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
            return photos.map(photo => {
                photo.getSource(assetDirPath)
                return photo
            })
        }
        else return []
    }

}