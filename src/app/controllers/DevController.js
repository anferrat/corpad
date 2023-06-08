import { AppRepository } from "../repository/sqlite/AppRepository"
import { PipelineRepository } from "../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../repository/sqlite/PotentialTypeRepository"
import { ReferenceCellRepository } from "../repository/sqlite/ReferenceCellRepository"
import { SubitemRepository } from "../repository/sqlite/SubitemRepository"
import { TestPointRepository } from "../repository/sqlite/TestPointRepository"
import { GenerateItem } from "../services/survey/other/GenerateItemDev"
import { Controller } from "../utils/Controller"


class DevController extends Controller {
    constructor(testPointRepo, subitemRepo, potentialRepo, pipelineRepo, potentialTypeRepo, referenceCellRepo, appRepo) {
        super()
        this.appRepo = appRepo
        this.generateItemService = new GenerateItem(testPointRepo, subitemRepo, potentialRepo, pipelineRepo, potentialTypeRepo, referenceCellRepo)
    }

    generateTestPoints(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            const { count } = params
            return await this.generateItemService.execute(count)
        })
    }

    resetDatabase(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.appRepo.fullResetDevOnly()
        })
    }

}

const devController = new DevController(
    new TestPointRepository(),
    new SubitemRepository(),
    new PotentialRepository(),
    new PipelineRepository(),
    new PotentialTypeRepository(),
    new ReferenceCellRepository(),
    new AppRepository()
)


export const generateTestPoints = async ({ count }, onError, onSuccess) => await devController.generateTestPoints({ count }, onError, onSuccess)

export const resetDatabase = async (onError, onSuccess) => await devController.resetDatabase(onError, onSuccess)