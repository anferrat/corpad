import { ExportedFile } from "../../../../entities/survey/other/ExportedFile"
import { FileMimeTypes, FileSystemLocations } from "../../../../../constants/global"

export class GetExportedFileList {
    constructor(fileSystemRepo, listPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.listPresenter = listPresenter
    }

    async execute() {
        const dir = await this.fileSystemRepo.readDir(FileSystemLocations.EXPORTS)
        const files = dir.filter(item => (item.name.endsWith('.csv') || item.name.endsWith('.kml')) && item.isFile())
            .sort((a, b) => b?.mtime.getTime() - a?.mtime.getTime())
            .map(({ mtime, name, path, size }) => new ExportedFile(name, path, size, mtime.getTime(), name.endsWith('.csv') ? FileMimeTypes.CSV : FileMimeTypes.KML))
        return this.listPresenter.execute(files)
    }
}