import { Controller } from "../../utils/Controller";

export class ImportController extends Controller {
    construtor() {}

    updateMain(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id } = this.validation.updateMain(params)
            return this.updateMainReferenceService.execute(id)
        })
    }
    
}