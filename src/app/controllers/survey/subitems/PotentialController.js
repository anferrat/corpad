import { GetOnOffPotentialPair } from "../../../services/survey/other/multimeter/collect_readings/GetOnOffPotentialPair"
import { CreatePotential } from "../../../services/survey/subitems/potentials/CreatePotential"
import { DeletePotential } from "../../../services/survey/subitems/potentials/DeletePotential"
import { GetPotentialList } from "../../../services/survey/subitems/potentials/GetPotentialList"
import { UpdatePotential } from "../../../services/survey/subitems/potentials/UpdatePotential"
import { UpdatePotentialList } from "../../../services/survey/subitems/potentials/UpdatePotentialList"
import { Controller } from "../../../utils/Controller"
import { PotentialValidation } from "../../../validation/PotentialValidation"
import { convertPotentialUnits } from "../../_instances/converters"
import { potentialPresenter } from "../../_instances/presenters"
import { potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo } from "../../_instances/repositories"

class PotentialController extends Controller {
    constructor(potentialRepo, settingRepo, potentialPresenter, potentialTypeRepo, referenceCellRepo, convertPotentialUnits) {
        super()
        this.createPotentialService = new CreatePotential(potentialRepo, potentialPresenter)
        this.deletePotentialService = new DeletePotential(potentialRepo)
        this.getPotentialListService = new GetPotentialList(potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo, potentialPresenter, convertPotentialUnits)
        this.updatePotentialService = new UpdatePotential(potentialRepo, potentialPresenter, convertPotentialUnits)
        this.updatePotentialListService = new UpdatePotentialList(potentialRepo, potentialPresenter, convertPotentialUnits)
        this.getOnOffPotentialPairService = new GetOnOffPotentialPair(potentialRepo, potentialTypeRepo)
        this.validation = new PotentialValidation()
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 609, async () => {
            const { referenceCellIndex, potentialTypeIndex, subitemId, potentialTypes, referenceCells } = this.validation.create(params)
            return this.createPotentialService.execute(referenceCellIndex, potentialTypeIndex, subitemId, potentialTypes, referenceCells)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 610, async () => {
            const { id } = this.validation.delete(params)
            return this.deletePotentialService.execute(id)
        })
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 612, async () => {
            const { subitemId, itemId } = this.validation.getList(params)
            return this.getPotentialListService.execute(subitemId, itemId)
        })
    }

    update(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 611, async () => {
            const { id, value, unit } = this.validation.update(params)
            return this.updatePotentialService.execute(id, value, unit)
        })
    }

    updateList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 611, async () => {
            const { potentials, subitemId } = this.validation.updateList(params)
            return this.updatePotentialListService.execute(potentials, subitemId)
        })
    }

    getOnOffPair(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 655, async () => {
            const { subitemId, potentialId } = this.validation.getOnOffPair(params)
            return await this.getOnOffPotentialPairService.execute({ subitemId, potentialId })
        })
    }
}

const potentialController = new PotentialController(
    potentialRepo,
    settingRepo,
    potentialPresenter,
    potentialTypeRepo,
    referenceCellRepo,
    convertPotentialUnits
)

export const createPotential = (params, onError, onSuccess) => potentialController.create(params, onError, onSuccess)

export const deletePotential = (params, onError, onSuccess) => potentialController.delete(params, onError, onSuccess)

export const updatePotential = (params, onError, onSuccess) => potentialController.update(params, onError, onSuccess)

export const getPotentialList = (params, onError, onSuccess) => potentialController.getList(params, onError, onSuccess)

export const updatePotentialList = (params, onError, onSuccess) => potentialController.updateList(params, onError, onSuccess)

export const getOnOffPotentialPair = ({ subitemId, potentialId }, onError, onSuccess) => potentialController.getOnOffPair({ subitemId, potentialId }, onError, onSuccess)