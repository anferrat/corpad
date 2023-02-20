export class Controller {
    constructor() {
    }

    async controllerHandler(onSuccess, onError, errorCode, controller) {
        try {
            console.log(onSuccess)
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
            console.log(er)
            if (onError)
                onError(errorCode, er)
            return {
                status: errorCode,
                errorMessage: er.message
            }
        }
    }
}