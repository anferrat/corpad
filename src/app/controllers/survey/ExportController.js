import { ListPresenter } from "../../presenters/ListPresenter"
import { PipelineRepository } from "../../repository/sqlite/PipelineRepository"
import { PotentialTypeRepository } from "../../repository/sqlite/PotentialTypeRepository"
import { ReferenceCellRepository } from "../../repository/sqlite/ReferenceCellRepository"
import { GetExportItemProperties } from "../../services/survey/manager/export/csv/GetExportItemProperties"
import { GetExportPotentailPropertiesData } from "../../services/survey/manager/export/csv/GetExportPotentialPropertiesData"
import { GetExportSubitemProperties } from "../../services/survey/manager/export/csv/GetExportSubitemProperties"
import { Controller } from "../../utils/Controller"


class ExportController extends Controller {
    constructor(pipelineRepo, referenceCellRepo, potentialtypeRepo, listPresenter) {
        super()
        this.getExportItemPropertiesService = new GetExportItemProperties()
        this.getPotentialPropertiesDataService = new GetExportPotentailPropertiesData(pipelineRepo, referenceCellRepo, potentialtypeRepo, listPresenter)
        this.getExportSubitemPropertiesService = new GetExportSubitemProperties()
    }

    getItemProperties(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, () => {
            const { itemType } = params
            return this.getExportItemPropertiesService.execute(itemType)
        })
    }

    getSubitemProperties(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, () => {
            const { itemType } = params
            return this.getExportSubitemPropertiesService.execute(itemType)
        })
    }

    getPotentialPropertiesData(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, () => {
            return this.getPotentialPropertiesDataService.execute()
        })
    }
}

const exportController = new ExportController(
    new PipelineRepository(),
    new ReferenceCellRepository(),
    new PotentialTypeRepository(),
    new ListPresenter()
)


export const getExportItemProperties = async (params, onError, onSuccess) => await exportController.getItemProperties(params, onError, onSuccess)

export const getExportSubitemProperties = async (params, onError, onSuccess) => await exportController.getSubitemProperties(params, onError, onSuccess)

export const getExportPotentialPropertiesData = async (onError, onSuccess) => await exportController.getPotentialPropertiesData(onError, onSuccess)