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
            console.log(er)
            const code = er?.code ?? errorCode
            if (onError)
                onError(code, er)
            return {
                status: code,
                errorMessage: er.message
            }
        }
    }

    callbackHandler(onSuccess, onError, errorCode, callback) {
        try {
            const response = callback()
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
            console.log(er)
            const code = er?.code ?? errorCode
            if (onError)
                onError(code, er)
            return {
                status: code,
                errorMessage: er.message
            }
        }
    }
}