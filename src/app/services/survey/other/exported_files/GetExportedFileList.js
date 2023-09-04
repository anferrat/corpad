import { ExportedFile } from "../../../../entities/survey/other/ExportedFile"
import { FileMimeTypes, FileSystemLocations } from "../../../../../constants/global"

export class GetExportedFileList {
    constructor(fileSystemRepo, listPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.listPresenter = listPresenter
    }

    async execute() {
        const dir = await this.fileSystemRepo.readDir(FileSystemLocations.EXPORTS)
        const files = dir.filter(({ filename, isFile }) => (filename.endsWith('.csv') || filename.endsWith('.kml')) && isFile)
            .sort((a, b) => b.timeModified - a.timeModified)
            .map(({ timeModified, filename, path, size }) => new ExportedFile(filename, path, size, timeModified, filename.endsWith('.csv') ? FileMimeTypes.CSV : FileMimeTypes.KML))
        return this.listPresenter.execute(files)
    }
}