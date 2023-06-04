import { ListPresenter } from "../../presenters/ListPresenter"
import { FileSystemRepository } from "../../repository/fs/FileSystemRepository"
import { PipelineRepository } from "../../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../../repository/sqlite/PotentialTypeRepository"
import { RectifierRepository } from "../../repository/sqlite/RectifierRepository"
import { ReferenceCellRepository } from "../../repository/sqlite/ReferenceCellRepository"
import { SubitemRepository } from "../../repository/sqlite/SubitemRepository"
import { SurveyRepository } from "../../repository/sqlite/SurveyRepository"
import { TestPointRepository } from "../../repository/sqlite/TestPointRepository"
import { CommaSeparatedFileParser } from "../../services/other/CommaSeparatedFileParser"
import { FileNameGenerator } from "../../services/other/FileNameGenerator"
import { ExportToSpreadsheet } from "../../services/survey/manager/export/csv/ExportToSpreadsheet"
import { GetExportItemProperties } from "../../services/survey/manager/export/csv/GetExportItemProperties"
import { GetExportPotentailPropertiesData } from "../../services/survey/manager/export/csv/GetExportPotentialPropertiesData"
import { GetExportSubitemProperties } from "../../services/survey/manager/export/csv/GetExportSubitemProperties"
import { Controller } from "../../utils/Controller"


class ExportController extends Controller {
    constructor(pipelineRepo, referenceCellRepo, potentialtypeRepo, listPresenter, testPointRepo, rectifierRepo, potentialRepo, potentialTypeRepo, fileSystemRepo, surveyRepo) {
        super()
        this.getExportItemPropertiesService = new GetExportItemProperties()
        this.getPotentialPropertiesDataService = new GetExportPotentailPropertiesData(pipelineRepo, referenceCellRepo, potentialtypeRepo, listPresenter)
        this.getExportSubitemPropertiesService = new GetExportSubitemProperties()

        this.csvParser = new CommaSeparatedFileParser()
        this.fileNameGenerator = new FileNameGenerator()

        this.exportToSpreadsheetService = new ExportToSpreadsheet(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, potentialTypeRepo, fileSystemRepo, this.csvParser, this.fileNameGenerator)
    }

    getItemProperties(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 643, () => {
            const { itemType } = params
            return this.getExportItemPropertiesService.execute(itemType)
        })
    }

    getSubitemProperties(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 644, () => {
            const { itemType } = params
            return this.getExportSubitemPropertiesService.execute(itemType)
        })
    }

    getPotentialPropertiesData(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 645, () => {
            return this.getPotentialPropertiesDataService.execute()
        })
    }

    exportToSpreadsheet(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 629, async () => {
            const { itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties } = params
            return this.exportToSpreadsheetService.execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties })
        })
    }

}

const exportController = new ExportController(
    new PipelineRepository(),
    new ReferenceCellRepository(),
    new PotentialTypeRepository(),
    new ListPresenter(),
    new TestPointRepository(),
    new RectifierRepository(),
    new PotentialRepository(),
    new PotentialTypeRepository(),
    new FileSystemRepository(),
    new SurveyRepository()
)


export const getExportItemProperties = async (params, onError, onSuccess) => await exportController.getItemProperties(params, onError, onSuccess)

export const getExportSubitemProperties = async (params, onError, onSuccess) => await exportController.getSubitemProperties(params, onError, onSuccess)

export const getExportPotentialPropertiesData = async (onError, onSuccess) => await exportController.getPotentialPropertiesData(onError, onSuccess)

export const exportSurveyToSpreadsheet = ({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties }, onError, onSuccess) => exportController.exportToSpreadsheet({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties }, onError, onSuccess)  