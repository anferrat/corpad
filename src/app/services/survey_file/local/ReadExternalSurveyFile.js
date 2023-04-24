import { Error, errors } from "../../../utils/Error"

export class ReadExternalSurveyFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(path) {
        try {
            const file = await this.fileSystemRepo.readFile(path)
            return {
                fileName: null,
                file: JSON.parse(file),
                hash: null,
                isCloud: false,
                cloudId: null,
                isNew: true,
            }
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to read external file', er, 411)
        }
    }
}