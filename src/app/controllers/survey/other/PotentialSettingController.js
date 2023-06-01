import { Controller } from "../../../utils/Controller"
import { BasicPresenter } from "../../../presenters/BasciPresenter"
import { PotentialTypeValidation } from "../../../validation/PotentialTypeValidation"
import { PotentialTypeRepository } from "../../../repository/sqlite/PotentialTypeRepository"
import { PotentialTypePresenter } from "../../../presenters/PotentialTypePresenter"
import { CreatePotentialType } from "../../../services/survey/other/potential_types/CreatePotentialType"
import { UpdatePotentialUnit } from "../../../services/survey/other/potential_types/UpdatePotentialUnit"
import { UpdateAutoCreatePotentials } from "../../../services/survey/other/potential_types/UpdateAutoCreatePotentials"
import { GetPotentialSettingData } from "../../../services/survey/other/potential_types/GetPotentialSettingData"
import { SettingRepository } from "../../../repository/sqlite/SettingRepository"
import { DeletePotentialType } from "../../../services/survey/other/potential_types/DeletePotentialType"

class PotentialSettingController extends Controller {
    constructor(potentialTypeRepo, settingRepo, basicPresenter, potentialTypePresenter) {
        super()

        this.createPotentialTypeServie = new CreatePotentialType(potentialTypeRepo, basicPresenter)
        this.deletePotentialTypeService = new DeletePotentialType(potentialTypeRepo)
        this.updatePotentialUnitService = new UpdatePotentialUnit(settingRepo)
        this.updateAutoCreateService = new UpdateAutoCreatePotentials(settingRepo)
        this.getPotentialSettingDataService = new GetPotentialSettingData(settingRepo, potentialTypeRepo, potentialTypePresenter)

        this.validation = new PotentialTypeValidation()
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 634, async () => {
            const { name } = this.validation.create(params)
            return this.createPotentialTypeServie.execute(name)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 635, async () => {
            const { id } = this.validation.delete(params)
            return this.deletePotentialTypeService.execute(id)
        })
    }

    updateUnit(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 636, async () => {
            const { unit } = this.validation.updateUnit(params)
            return this.updatePotentialUnitService.execute(unit)
        })
    }

    updateAutoCreate(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 623, async () => {
            const { autoCreate } = this.validation.updateAutoCreate(params)
            return this.updateAutoCreateService.execute(autoCreate)
        })
    }

    getData(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 638, async () => {
            return this.getPotentialSettingDataService.execute()
        })
    }
}

const potentialSettingController = new PotentialSettingController(
    new PotentialTypeRepository(),
    new SettingRepository(),
    new BasicPresenter(),
    new PotentialTypePresenter())

export const getPotentialSettingData = (onError, onSuccess) => potentialSettingController.getData(onError, onSuccess)

export const updateAutoCreate = ({ autoCreate }, onError, onSuccess) => potentialSettingController.updateAutoCreate({ autoCreate }, onError, onSuccess)

export const updatePotentialUnit = ({ unit }, onError, onSuccess) => potentialSettingController.updateUnit({ unit }, onError, onSuccess)

export const deletePotentialType = ({ id }, onError, onSuccess) => potentialSettingController.delete({ id }, onError, onSuccess)

export const createPotentialType = ({ name }, onError, onSuccess) => potentialSettingController.create({ name }, onError, onSuccess)

