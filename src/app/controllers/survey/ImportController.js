import { ImportConverter } from "../../converters/import_from_spreadsheet/ImportConverter"
import { PipelineRepository } from "../../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../../repository/sqlite/PotentialRepository"
import { RectifierRepository } from "../../repository/sqlite/RectifierRepository"
import { SubitemRepository } from "../../repository/sqlite/SubitemRepository"
import { TestPointRepository } from "../../repository/sqlite/TestPointRepository"
import { SubitemFactory } from "../../services/other/SubitemFactory"
import { UnitConverter } from "../../services/other/UnitConverter"
import { ImportSpreadsheetData } from "../../services/survey/manager/import/csv/ImportSpreadsheetData"
import { Controller } from "../../utils/Controller"
import { ImportValidation } from "../../validation/import_from_spreadsheet/ImportValidation"

class ImportController extends Controller {
    constructor (importDataConverter, importDataValidator, testPointRepository, rectifierRepository, pipelineRepository, potentialRepository, subitemRepository, subitemFactory, unitConverter) {
        super()
        this.importDataConverter = importDataConverter
        this.importDataValidator = importDataValidator
        this.importSpreadsheetData = new ImportSpreadsheetData(testPointRepository, rectifierRepository, pipelineRepository, subitemRepository, potentialRepository, subitemFactory, unitConverter)
    }

    execute(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType, callback } = params
            const convertedData = this.importDataConverter.execute(params)
            const data = this.importDataValidator.execute(convertedData, itemType)
            return await this.importSpreadsheetData.execute(data, itemType, callback)
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
    new UnitConverter())


export const importData = async (params, onError, onSuccess) => await importController.execute(params, onError, onSuccess)