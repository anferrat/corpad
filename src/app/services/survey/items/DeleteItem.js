import { FileSystemLocations, ItemTypes } from "../../../../constants/global";
import { Error, errors } from "../../../utils/Error";

export class DeleteItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, assetRepo, fileSystemRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.assetRepo = assetRepo
        this.fileSystemRepo = fileSystemRepo
    }

    _deleteItem(itemType, id) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.delete(id)
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.delete(id)
            case ItemTypes.PIPELINE:
                return this.pipelineRepo.delete(id)
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to delete item`)
        }
    }

    async execute(id, itemType) {
        const assets = await this.assetRepo.getByItemId(id, itemType)
        await Promise.all(assets.map(({ fileName }) => this.fileSystemRepo.deleteFile(FileSystemLocations.ASSETS, fileName)))
        await this._deleteItem(itemType, id)
    }
}