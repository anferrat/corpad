import { ImportConverter } from "../../converters/import_from_spreadsheet/ImportConverter"
import { ImportDataPresenter } from "../../presenters/ImportDataPresenter"
import { FileSystemRepository } from "../../repository/fs/FileSystemRepository"
import { DefaultNameRepository } from "../../repository/sqlite/DefaultNameRepository"
import { PipelineRepository } from "../../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../../repository/sqlite/PotentialTypeRepository"
import { RectifierRepository } from "../../repository/sqlite/RectifierRepository"
import { ReferenceCellRepository } from "../../repository/sqlite/ReferenceCellRepository"
import { SettingRepository } from "../../repository/sqlite/SettingRepository"
import { SubitemRepository } from "../../repository/sqlite/SubitemRepository"
import { TestPointRepository } from "../../repository/sqlite/TestPointRepository"
import { CommaSeparatedFileParser } from "../../services/other/CommaSeparatedFileParser"
import { DocumentPicker } from "../../services/other/DocumentPicker"
import { SubitemFactory } from "../../services/other/SubitemFactory"
import { UnitConverter } from "../../services/other/UnitConverter"
import { ImportSpreadsheetData } from "../../services/survey/manager/import/csv/ImportSpreadsheetData"
import { SelectFileForImport } from "../../services/survey/manager/import/csv/SelectFileForImport"
import { Controller } from "../../utils/Controller"
import { ImportValidation } from "../../validation/import_from_spreadsheet/ImportValidation"

class ImportController extends Controller {
    constructor(importDataConverter, importDataValidator, testPointRepository, rectifierRepository, pipelineRepository, potentialRepository, subitemRepository, subitemFactory, unitConverter, fileSystemRepo, defaultNameRepo, potentialTypeRepo, referenceCellRepo, settingRepo, importDataPresenter) {
        super()
        this.importDataConverter = importDataConverter
        this.importDataValidator = importDataValidator
        this.documentPicker = new DocumentPicker()
        this.csvParser = new CommaSeparatedFileParser()
        this.importSpreadsheetData = new ImportSpreadsheetData(testPointRepository, rectifierRepository, pipelineRepository, subitemRepository, potentialRepository, subitemFactory, unitConverter)
        this.selectFileForImportService = new SelectFileForImport(fileSystemRepo, this.documentPicker, this.csvParser, defaultNameRepo, potentialTypeRepo, pipelineRepository, referenceCellRepo, settingRepo, importDataPresenter)
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
    new TestPointRepository(),
    new RectifierRepository(),
    new PipelineRepository(),
    new PotentialRepository(),
    new SubitemRepository(),
    new SubitemFactory(),
    new UnitConverter(),
    new FileSystemRepository(),
    new DefaultNameRepository(),
    new PotentialTypeRepository(),
    new ReferenceCellRepository(),
    new SettingRepository(),
    new ImportDataPresenter()
)


export const importData = async (params, onError, onSuccess) => await importController.importData(params, onError, onSuccess)

export const selectFileForImport = (onError, onSuccess) => importController.selectFileForImport(onError, onSuccess)