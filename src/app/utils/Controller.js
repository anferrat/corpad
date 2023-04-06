export class Controller {
    constructor() {
    }

    async controllerHandler(onSuccess, onError, errorCode, controller) {
        try {
            const response = await controller()
            if (onSuccess)
                onSuccess(response)
            if (response !== undefined)
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