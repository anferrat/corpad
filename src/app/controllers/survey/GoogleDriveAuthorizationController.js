import { GoogleDriveAuthorization } from "../../services/authorization/GoogleDriveAuthorization"
import { Controller } from "../../utils/Controller"
import { googleDriveAuthorizationRepo } from "../_instances/repositories"

class GoogleDriveAuthorizationController extends Controller {
    constructor(googleDriveAuthorizationRepo) {
        super()
        this.googleDriveAuthorizationService = new GoogleDriveAuthorization(googleDriveAuthorizationRepo)
    }

    async signIn(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 303, async () => {
            return await this.googleDriveAuthorizationService.signIn()

        })
    }

    async signOut(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 304, async () => {
            return await this.googleDriveAuthorizationService.signOut()
        })
    }

}

const authController = new GoogleDriveAuthorizationController(googleDriveAuthorizationRepo)

export const signInToGoogleDrive = (onError, onSuccess) => authController.signIn(onError, onSuccess)

export const signOutFromGoogleDrive = (onError, onSuccess) => authController.signOut(onError, onSuccess)