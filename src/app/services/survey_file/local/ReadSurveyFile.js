import { Error, errors } from "../../../utils/Error"

export class ReadSurveyFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(path) {
        try {
            const [file, hash] = await Promise.all([
                this.fileSystemRepo.readFile(path),
                this.fileSystemRepo.getHash(path)
            ])
            const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
            return {
                fileName,
                file: JSON.parse(file),
                hash: hash,
                isCloud: false,
                cloudId: null,
                isNew: false,
            }
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to read file', er, 411)
        }
    }
}