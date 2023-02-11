import { PotentialPresenter } from "../../../presenters/PotentialPresenter"
import { PotentialRepository } from "../../../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../../../repository/sqlite/PotentialTypeRepository"
import { ReferenceCellRepository } from "../../../repository/sqlite/ReferenceCellRepository"
import { SettingRepository } from "../../../repository/sqlite/SettingRepository"
import { UnitConverter } from "../../../services/other/UnitConverter"
import { CreatePotential } from "../../../services/survey/subitems/potentials/CreatePotential"
import { DeletePotential } from "../../../services/survey/subitems/potentials/DeletePotential"
import { GetPotentialList } from "../../../services/survey/subitems/potentials/GetPotentialList"
import { UpdatePotential } from "../../../services/survey/subitems/potentials/UpdatePotential"
import { UpdatePotentialList } from "../../../services/survey/subitems/potentials/UpdatePotentialList"
import { Controller } from "../../../utils/Controller"
import { PotentialValidation } from "../../../validation/survey/PotentialValidation"

class PotentialController extends Controller {
    constructor (potentialRepo, settingRepo, potentialPresenter, unitConverter, potentialTypeRepo, referenceCellRepo) {
        super()
        this.createPotentialService = new CreatePotential(potentialRepo, potentialPresenter)
        this.deletePotentialService = new DeletePotential(potentialRepo)
        this.getPotentialListService = new GetPotentialList(potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo, potentialPresenter)
        this.updatePotentialService = new UpdatePotential(potentialRepo, unitConverter, potentialPresenter)
        this.updatePotentialListService = new UpdatePotentialList(potentialRepo, unitConverter)
        this.validation = new PotentialValidation()
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { referenceCellIndex, potentialTypeIndex, subitemId, potentialTypes, referenceCells, unit } = this.validation.create(params)
            return this.createPotentialService.execute(referenceCellIndex, potentialTypeIndex, subitemId, potentialTypes, referenceCells, unit)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id } = this.validation.delete(params)
            return this.deletePotentialService.execute(id)
        })
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { subitemId, itemId } = this.validation.getList(params)
            return this.getPotentialListService.execute(subitemId, itemId)
        })
    }

    update(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id, value, unit } = this.validation.update(params)
            return this.updatePotentialService.execute(id, value, unit)
        })
    }

    updateList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { potentials, unit, subitemId } = this.validation.updateList(params)
            return this.updatePotentialListService.execute(potentials, subitemId, unit)
        })
    }
}

const potentialController = new PotentialController(
    new PotentialRepository,
    new SettingRepository(),
    new PotentialPresenter(),
    new UnitConverter(),
    new PotentialTypeRepository(),
    new ReferenceCellRepository())

export const createPotential = (params, onError, onSuccess) => potentialController.create(params, onError, onSuccess)

export const deletePotential = (params, onError, onSuccess) => potentialController.delete(params, onError, onSuccess)

export const updatePotential = (params, onError, onSuccess) => potentialController.update(params, onError, onSuccess)

export const getPotentialList = (params, onError, onSuccess) => potentialController.getList(params, onError, onSuccess)

export const updatePotentialList = (params, onError, onSuccess) => potentialController.updateList(params, onError, onSuccess)