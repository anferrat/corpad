import { Validation } from "./Validation";

export class Controller {
    constructor() {
        this.validation = new Validation()
    }

    async controllerHandler(onSuccess, onError, errorCode, controller) {
        try {
            const response = await controller()
            if (onSuccess)
                onSuccess(response)
            if (response)
                return {
                    status: 200,
                    response: response
                }
            else return {
                status: 200
            }
        }
        catch (er) {
            if (onError)
                onError(errorCode, er)
            return {
                status: errorCode,
                errorMessage: er.message
            }
        }
    }
}