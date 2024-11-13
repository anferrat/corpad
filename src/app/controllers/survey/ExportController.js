import { ExportToSpreadsheet } from "../../services/survey/manager/export/csv/ExportToSpreadsheet"
import { GetExportItemProperties } from "../../services/survey/manager/export/csv/GetExportItemProperties"
import { GetExportPotentailPropertiesData } from "../../services/survey/manager/export/csv/GetExportPotentialPropertiesData"
import { GetExportSubitemProperties } from "../../services/survey/manager/export/csv/GetExportSubitemProperties"
import { Controller } from "../../utils/Controller"
import { commaSeparatedFileParser, fileNameGenerator, geoParser } from "../_instances/general_services"
import { listPresenter } from "../_instances/presenters"
import { assetRepo, fileSystemRepo, mapLayerRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, surveyRepo, testPointRepo } from "../_instances/repositories"


class ExportController extends Controller {
    constructor(pipelineRepo, referenceCellRepo, potentialtypeRepo, listPresenter, testPointRepo, rectifierRepo, potentialRepo, potentialTypeRepo, fileSystemRepo, surveyRepo, csvParser, fileNameGenerator, assetRepo, mapLayerRepo) {
        super()
        this.getExportItemPropertiesService = new GetExportItemProperties()
        this.getPotentialPropertiesDataService = new GetExportPotentailPropertiesData(pipelineRepo, referenceCellRepo, potentialtypeRepo, listPresenter)
        this.getExportSubitemPropertiesService = new GetExportSubitemProperties()

        this.exportToSpreadsheetService = new ExportToSpreadsheet(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, potentialTypeRepo, fileSystemRepo, csvParser, fileNameGenerator, assetRepo, mapLayerRepo)
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
            const { itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties, includeAssets, exportType, includeMapLayers } = params
            return this.exportToSpreadsheetService.execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties, includeAssets, exportType, includeMapLayers })
        })
    }

}

const exportController = new ExportController(
    pipelineRepo,
    referenceCellRepo,
    potentialTypeRepo,
    listPresenter,
    testPointRepo,
    rectifierRepo,
    potentialRepo,
    potentialTypeRepo,
    fileSystemRepo,
    surveyRepo,
    commaSeparatedFileParser,
    fileNameGenerator,
    assetRepo,
    mapLayerRepo
)


export const getExportItemProperties = async (params, onError, onSuccess) => await exportController.getItemProperties(params, onError, onSuccess)

export const getExportSubitemProperties = async (params, onError, onSuccess) => await exportController.getSubitemProperties(params, onError, onSuccess)

export const getExportPotentialPropertiesData = async (onError, onSuccess) => await exportController.getPotentialPropertiesData(onError, onSuccess)

export const exportSurveyToSpreadsheet = ({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties, includeAssets, includeMapLayers, exportType }, onError, onSuccess) => exportController.exportToSpreadsheet({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties, includeAssets, includeMapLayers, exportType }, onError, onSuccess)  