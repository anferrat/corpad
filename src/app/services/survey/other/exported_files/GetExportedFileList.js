import { ExportedFile } from "../../../../entities/survey/other/ExportedFile"
import { FileMimeTypes, FileSystemLocations } from "../../../../../constants/global"

export class GetExportedFileList {
    constructor(fileSystemRepo, listPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.listPresenter = listPresenter
        this.SUPPORTED_EXTENSIONS = ['zip', 'csv', 'kml', 'png']
    }

    _getFileType(filename) {
        switch (filename.split('.').pop()) {
            case 'csv':
                return FileMimeTypes.CSV
            case 'zip':
                return FileMimeTypes.ZIP
            case 'kml':
                return FileMimeTypes.KML
            case 'png':
                return FileMimeTypes.IMAGE
            default:
                return undefined
        }
    }

    async execute() {
        const dir = await this.fileSystemRepo.readDir(FileSystemLocations.EXPORTS)
        const files = dir.filter(({ filename, isFile }) => (~this.SUPPORTED_EXTENSIONS.indexOf(filename.split('.').pop())) && isFile)
            .sort((a, b) => b.timeModified - a.timeModified)
            .map(({ timeModified, filename, path, size }) => new ExportedFile(filename, path, size, timeModified, this._getFileType(filename)))
        return this.listPresenter.execute(files)
    }
}