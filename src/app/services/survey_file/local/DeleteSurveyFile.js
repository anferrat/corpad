import { Error, errors } from "../../../utils/Error"

export class DeleteSurveyFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(path, hash) {
        const hashMatch = hash === (await this.fileSystemRepo.getHash(path))
        if (hashMatch)
            await this.fileSystemRepo.unlink(path)
        else {
            throw new Error(errors.GENERAL, `Hash of deleted file doesn't match one from meta data`)
        }
    }
}