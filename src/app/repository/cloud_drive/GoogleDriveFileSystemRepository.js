import { Error, errors } from "../../utils/Error"
import { GoogleDriveAuthorizationRepository } from "./GoogleDriveAuthorizationRepository"
import { gdrive } from "../../config/cloud_drive"
import { ListQueryBuilder, MimeTypes } from "@robinbobin/react-native-google-drive-api-wrapper"


export class GoogleDriveFileSystemRepository {
    constructor() {
        this.googleDriveAuth = new GoogleDriveAuthorizationRepository()
        this.APPLICATION_FOLDER = 'Corpad'
    }

    async authHandler(request) {
        /*
            Auth handler is for Unauthorized 401 error. It updates the gDrive tocken and attepmts to execute request second time before rejecting.
        */
        try {
            return await request()
        }
        catch (er) {
            if (er?.json?.error?.code && er.json.error.code === 401) {
                const { isSigned } = await this.googleDriveAuth.checkSignInStatus()
                if (!isSigned)
                    throw new Error(errors.AUTH, 'Unable to execute gdrive opertaion. Not signed in.', 'Not signed in', 302)
                else return await request()
            }
            else
                throw new Error(errors.GOOGLE_DRIVE, 'Unable to complete request', er)
        }
    }

    async getAppFolderId() {
        //returns id of Corpad folder on users cloud, if it doesnt exist, creates one and returns id
        try {
            const list = await this.authHandler(async () => await gdrive.files.list({
                q: new ListQueryBuilder()
                    .e('name', this.APPLICATION_FOLDER)
            }))
            if (list?.files.length === 0) {
                const createFolderId = await this.authHandler(async () => await gdrive.files.newMetadataOnlyUploader()
                    .setRequestBody({
                        name: this.APPLICATION_FOLDER,
                        parents: ['root'],
                        mimeType: MimeTypes.FOLDER,
                    })
                    .execute())
                return {
                    folderId: createFolderId.id
                }
            }
            else return {
                folderId: list.files[0].id
            }
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to get id of app folder', er, er.code ?? 701)
        }
    }

    async readAppFolder() {
        try {
            const { folderId } = await this.getAppFolderId()
            return (await this.authHandler(async () => await gdrive.files.list({
                fields: "files/id,files/name,files/modifiedTime",
                q: new ListQueryBuilder()
                    .in(folderId, 'parents')
                    .and()
                    .e('trashed', false)
            }))
            )
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to read app folder', er, er.code ?? 702)
        }
    }

    async isFileExist(fileId) {
        try {
            const meta = await this.authHandler(async () => await gdrive.files.getMetadata(fileId))
            return meta.id ? true : false
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to check if file exists', er, er.code ?? 703)
        }
    }

    async createFile(name, content) {
        const { folderId } = await this.getAppFolderId()
        try {
            const { id } = (await this.authHandler(async () => await gdrive.files.newMultipartUploader()
                .setData(content, MimeTypes.JSON)
                .setRequestBody({
                    name: name,
                    parents: [folderId]
                })
                .execute())
            )
            return {
                fileId: id
            }
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to create file', er, er.code ?? 704)
        }

    }

    async updateFile(fileId, content) {
        try {
            (await this.authHandler(async () => await gdrive.files.newMultipartUploader()
                .setData(content, MimeTypes.JSON)
                .setIdOfFileToUpdate(fileId)
                .execute())
            )?.id
            return {
                fileId: fileId
            }
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to update file', er, er.code ?? 705)
        }
    }


    async deleteFile(fileId) {
        try {
            return await this.authHandler(async () => await gdrive.files.delete(fileId))
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to delete file', er, er.code ?? 706)
        }
    }

    async readFile(fileId) {
        try {
            const [file, { name }] = await this.authHandler(async () => await Promise.all([
                gdrive.files.getJson(fileId),
                gdrive.files.getMetadata(fileId, { fields: 'name' })
            ]))
            return ({ file, fileName: name })
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to read file', er, er.code ?? 707)
        }
    }

    //NOT USED TO BE DELETED
    async getMeta(fileId) {
        try {
            const meta = await this.authHandler(async () => await gdrive.files.getMetadata(fileId, { fields: 'modifiedTime,name' }))
            return ({ ...meta })
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to get file meta data', er, er.code ?? 100)
        }
    }


    async getLink(fileId) {
        try {
            await this.authHandler(async () => await gdrive.permissions.create(fileId, undefined, {
                role: "reader",
                type: "anyone"
            }))
            const meta = await this.authHandler(async () => await gdrive.files.getMetadata(fileId,
                {
                    fields: "webViewLink"
                }))
            return { link: meta.webViewLink }
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to get file web link', er, er.code ?? 708)
        }
    }

}