import { CopyExportedFileToDownloads } from "../../../services/survey/other/exported_files/CopyExportedFileToDownloads"
import { DeleteExportedFile } from "../../../services/survey/other/exported_files/DeleteExportedFile"
import { GetExportedFileList } from "../../../services/survey/other/exported_files/GetExportedFileList"
import { LoadCommaSeparatedFile } from "../../../services/survey/other/exported_files/LoadCommaSeparatedFile"
import { Controller } from "../../../utils/Controller"
import { commaSeparatedFileParser, openInExternalAppService, permissions, shareService } from "../../_instances/general_services"
import { listPresenter } from "../../_instances/presenters"
import { fileSystemRepo } from "../../_instances/repositories"

class ExportedFileController extends Controller {
    constructor(fileSystemRepo, listPresenter, csvParser, permissions, shareService, openInExternalAppService) {
        super()
        this.copyExportedFileToDownloadsService = new CopyExportedFileToDownloads(fileSystemRepo, permissions)
        this.deleteExportedFileService = new DeleteExportedFile(fileSystemRepo)
        this.getExportedFileListService = new GetExportedFileList(fileSystemRepo, listPresenter)
        this.loadCommaSeparatedFileService = new LoadCommaSeparatedFile(fileSystemRepo, csvParser)
        this.openInExternalAppService = openInExternalAppService
        this.shareService = shareService
    }

    getList(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 424, async () => {
            return this.getExportedFileListService.execute()
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 425, async () => {
            const { path } = params
            return this.deleteExportedFileService.execute(path)
        })
    }

    deleteAll(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 426, async () => {
            return this.deleteExportedFileService.executeForAll()
        })
    }

    copyToDownloads(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 427, async () => {
            const { path } = params
            return this.copyExportedFileToDownloadsService.execute(path)
        })
    }

    loadCsvFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 428, async () => {
            const { path } = params
            return this.loadCommaSeparatedFileService.execute(path)
        })
    }

    openIn(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 429, async () => {
            const { url, mimeType } = params
            return this.openInExternalAppService.execute(url, mimeType)
        })
    }

    share(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 430, async () => {
            const { url, mimeType } = params
            return this.shareService.shareFile(url, mimeType)
        })
    }
}

const exportedFileController = new ExportedFileController(
    fileSystemRepo,
    listPresenter,
    commaSeparatedFileParser,
    permissions,
    shareService,
    openInExternalAppService
)

export const getExportedFileList = (onError, onSuccess) => exportedFileController.getList(onError, onSuccess)

export const deleteExportedFile = ({ path }, onError, onSuccess) => exportedFileController.delete({ path }, onError, onSuccess)

export const deleteAllExportedFiles = (onError, onSuccess) => exportedFileController.deleteAll(onError, onSuccess)

export const saveExportedFileToDownloads = ({ path }, onError, onSuccess) => exportedFileController.copyToDownloads({ path }, onError, onSuccess)

export const loadCommaSeparatedFile = ({ path }, onError, onSuccess) => exportedFileController.loadCsvFile({ path }, onError, onSuccess)

export const openFileIn = ({ url, mimeType }, onError, onSuccess) => exportedFileController.openIn({ url, mimeType }, onError, onSuccess)

export const shareFile = ({ url, mimeType }, onError, onSuccess) => exportedFileController.share({ url, mimeType }, onError, onSuccess)
