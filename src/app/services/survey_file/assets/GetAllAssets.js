import { FileSystemLocations } from "../../../../constants/global"

export class GetAllAssets {
    constructor(assetRepo, fileSystemRepo) {
        this.assetRepo = assetRepo
        this.fileSystemRepo = fileSystemRepo
    }

    async execute() {
        const [assets, location] = await Promise.all([
            this.assetRepo.getAll(),
            this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)])
        const uriList = assets.map(asset => {
            asset.getSource(location)
            return asset.source
        })

        const files = await this.fileSystemRepo.readDir(FileSystemLocations.CURRENT_ASSETS)
        const size = files.reduce((total, next) => total + next.size, 0)
        return {
            uriList,
            assets,
            size
        }
    }
}