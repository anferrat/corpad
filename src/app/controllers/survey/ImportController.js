import { ImportConverter } from "../../converters/import_from_spreadsheet/ImportConverter"
import { ImportSpreadsheetData } from "../../services/survey/manager/import/csv/ImportSpreadsheetData"
import { SelectFileForImport } from "../../services/survey/manager/import/csv/SelectFileForImport"
import { Controller } from "../../utils/Controller"
import { ImportValidation } from "../../validation/import_from_spreadsheet/ImportValidation"
import { commaSeparatedFileParser, documentPicker, subitemFactory, unitConverter } from "../_instances/general_services"
import { importDataPresenter } from "../_instances/presenters"
import { defaultNameRepo, fileSystemRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, settingRepo, subitemRepo, testPointRepo } from "../_instances/repositories"

class ImportController extends Controller {
    constructor(importDataConverter, importDataValidator, testPointRepository, rectifierRepository, pipelineRepository, potentialRepository, subitemRepository, subitemFactory, unitConverter, fileSystemRepo, defaultNameRepo, potentialTypeRepo, referenceCellRepo, settingRepo, importDataPresenter, documentPicker, csvParser) {
        super()
        this.importDataConverter = importDataConverter
        this.importDataValidator = importDataValidator
        this.importSpreadsheetData = new ImportSpreadsheetData(testPointRepository, rectifierRepository, pipelineRepository, subitemRepository, potentialRepository, subitemFactory, unitConverter)
        this.selectFileForImportService = new SelectFileForImport(fileSystemRepo, documentPicker, csvParser, defaultNameRepo, potentialTypeRepo, pipelineRepository, referenceCellRepo, settingRepo, importDataPresenter)
    }

    importData(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 628, async () => {
            const { itemType, callback } = params
            const convertedData = this.importDataConverter.execute(params)
            const data = this.importDataValidator.execute(convertedData, itemType)
            return await this.importSpreadsheetData.execute(data, itemType, callback)
        })
    }

    selectFileForImport(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 646, async () => {
            return this.selectFileForImportService.execute()
        })
    }
}

const importController = new ImportController(
    new ImportConverter(),
    new ImportValidation(),
    testPointRepo,
    rectifierRepo,
    pipelineRepo,
    potentialRepo,
    subitemRepo,
    subitemFactory,
    unitConverter,
    fileSystemRepo,
    defaultNameRepo,
    potentialTypeRepo,
    referenceCellRepo,
    settingRepo,
    importDataPresenter,
    documentPicker,
    commaSeparatedFileParser
)


export const importData = async (params, onError, onSuccess) => await importController.importData(params, onError, onSuccess)

export const selectFileForImport = (onError, onSuccess) => importController.selectFileForImport(onError, onSuccess)