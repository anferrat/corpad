import { ListPresenter } from "../../../presenters/ListPresenter"
import { FileSystemRepository } from "../../../repository/fs/FileSystemRepository"
import { CommaSeparatedFileParser } from "../../../services/other/CommaSeparatedFileParser"
import { OpenInExternalApp } from "../../../services/other/OpenInExternalApp"
import { Share } from "../../../services/other/Share"
import { CopyExportedFileToDownloads } from "../../../services/survey/other/exported_files/CopyExportedFileToDownloads"
import { DeleteExportedFile } from "../../../services/survey/other/exported_files/DeleteExportedFile"
import { GetExportedFileList } from "../../../services/survey/other/exported_files/GetExportedFileList"
import { LoadCommaSeparatedFile } from "../../../services/survey/other/exported_files/LoadCommaSeparatedFile"
import { Controller } from "../../../utils/Controller"

class ExportedFileController extends Controller {
    constructor(fileSystemRepo, listPresenter, csvParser) {
        super()
        this.copyExportedFileToDownloadsService = new CopyExportedFileToDownloads(fileSystemRepo)
        this.deleteExportedFileService = new DeleteExportedFile(fileSystemRepo)
        this.getExportedFileListService = new GetExportedFileList(fileSystemRepo, listPresenter)
        this.loadCommaSeparatedFileService = new LoadCommaSeparatedFile(fileSystemRepo, csvParser)
        this.openInExternalAppService = new OpenInExternalApp()
        this.shareService = new Share()
    }

    getList(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            return this.getExportedFileListService.execute()
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { path } = params
            return this.deleteExportedFileService.execute(path)
        })
    }

    deleteAll(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            return this.deleteExportedFileService.executeForAll()
        })
    }

    copyToDownloads(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { path } = params
            return this.copyExportedFileToDownloadsService.execute(path)
        })
    }

    loadCsvFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { path } = params
            return this.loadCommaSeparatedFileService.execute(path)
        })
    }

    openIn(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { url, mimeType } = params
            return this.openInExternalAppService.execute(url, mimeType)
        })
    }

    share(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { url, mimeType } = params
            return this.shareService.shareFile(url, mimeType)
        })
    }
}

const exportedFileController = new ExportedFileController(
    new FileSystemRepository(),
    new ListPresenter(),
    new CommaSeparatedFileParser()
)

export const getExportedFileList = (onError, onSuccess) => exportedFileController.getList(onError, onSuccess)

export const deleteExportedFile = ({ path }, onError, onSuccess) => exportedFileController.delete({ path }, onError, onSuccess)

export const deleteAllExportedFiles = (onError, onSuccess) => exportedFileController.deleteAll(onError, onSuccess)

export const saveExportedFileToDownloads = ({ path }, onError, onSuccess) => exportedFileController.copyToDownloads({ path }, onError, onSuccess)

export const loadCommaSeparatedFile = ({ path }, onError, onSuccess) => exportedFileController.loadCsvFile({ path }, onError, onSuccess)

export const openFileIn = ({ url, mimeType }, onError, onSuccess) => exportedFileController.openIn({ url, mimeType }, onError, onSuccess)

export const shareFile = ({ url, mimeType }, onError, onSuccess) => exportedFileController.share({ url, mimeType }, onError, onSuccess)
