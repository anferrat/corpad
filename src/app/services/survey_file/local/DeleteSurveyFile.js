import { Error, errors } from "../../../utils/Error"

export class DeleteSurveyFile {
    constructor(fileSystemRepo, deleteAssetsService) {
        this.fileSystemRepo = fileSystemRepo
        this.deleteAssetsService = deleteAssetsService
    }

    async execute(path, hash, uid) {
        const hashMatch = hash === (await this.fileSystemRepo.getHash(path))
        if (hashMatch)
            await Promise.all([
                this.fileSystemRepo.unlink(path),
                this.deleteAssetsService.execute(uid, false)
            ])
        else {
            throw new Error(errors.GENERAL, `Hash of deleting file doesn't match one from meta data`)
        }
    }
}