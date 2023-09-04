import { GenerateItem } from "../services/survey/other/GenerateItemDev"
import { Controller } from "../utils/Controller"
import { appRepo, pipelineRepo, potentialRepo, potentialTypeRepo, referenceCellRepo, subitemRepo, testPointRepo } from "./_instances/repositories"


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
    testPointRepo,
    subitemRepo,
    potentialRepo,
    pipelineRepo,
    potentialTypeRepo,
    referenceCellRepo,
    appRepo
)


export const generateTestPoints = async ({ count }, onError, onSuccess) => await devController.generateTestPoints({ count }, onError, onSuccess)

export const resetDatabase = async (onError, onSuccess) => await devController.resetDatabase(onError, onSuccess)