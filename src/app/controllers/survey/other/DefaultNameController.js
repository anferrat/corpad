import { DefaultNamePresenter } from "../../../presenters/DefaultNamePresenter"
import { DefaultNameRepository } from "../../../repository/sqlite/DefaultNameRepository"
import { SettingRepository } from "../../../repository/sqlite/SettingRepository"
import { GetDefaulNameList } from "../../../services/survey/other/default_names/GetDefaultNameList"
import { UpdateDefaultNames } from "../../../services/survey/other/default_names/UpdateDefaultNames"
import { Controller } from "../../../utils/Controller"
import { DefaultNameValidation } from "../../../validation/DefaultNameValidation"

class DefaultNameController extends Controller {
    constructor(defaultNameRepo, settingRepo, defaultNamePresenter) {
        super()
        this.getDefaultNameListService = new GetDefaulNameList(defaultNameRepo, settingRepo, defaultNamePresenter)
        this.updateDefaultNamesService = new UpdateDefaultNames(defaultNameRepo, settingRepo)

        this.validation = new DefaultNameValidation()
    }

    getList(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 622, async () => {
            return this.getDefaultNameListService.execute()
        })
    }

    updateList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 623, async () => {
            const { defaultNames, pipelineNameAsDefault } = this.validation.updateList(params)
            return this.updateDefaultNamesService.execute(defaultNames, pipelineNameAsDefault)
        })
    }

}

const defaultNameController = new DefaultNameController(
    new DefaultNameRepository(),
    new SettingRepository(),
    new DefaultNamePresenter()
)

export const getDefaultNameList = (onError, onSuccess) => defaultNameController.getList(onError, onSuccess)

export const updateDefaultNameList = ({ defaultNames, pipelineNameAsDefault }, onError, onSuccess) => defaultNameController.updateList({ defaultNames, pipelineNameAsDefault }, onError, onSuccess)
