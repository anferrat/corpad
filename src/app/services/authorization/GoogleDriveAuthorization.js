export class GoogleDriveAuthorization {
    constructor(googleDriveAuthorizationRepo) {
        this.googleDriveAuthorizationRepo = googleDriveAuthorizationRepo
    }

    async signOut() {
        return await this.googleDriveAuthorizationRepo.signOut()
    }

    async signIn() {
        return await this.googleDriveAuthorizationRepo.signIn()
    }

}