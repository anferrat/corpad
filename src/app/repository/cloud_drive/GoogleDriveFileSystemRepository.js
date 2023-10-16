import { Error, errors } from "../../utils/Error"
import { GoogleDriveAuthorizationRepository } from "./GoogleDriveAuthorizationRepository"
import { gdrive, folderIds } from "../../config/cloud_drive"
import { ListQueryBuilder, MimeTypes } from "@robinbobin/react-native-google-drive-api-wrapper"
import { GoogleDriveFileTransferManager } from "./GoogleDriveFileTransferManager"
import { CloudFile } from "../../entities/survey/other/CloudFile"


export class GoogleDriveFileSystemRepository {
    constructor() {
        this.googleDriveAuth = new GoogleDriveAuthorizationRepository()
        this.fileTransferManager = new GoogleDriveFileTransferManager()
        this.APPLICATION_FOLDER_NAME = 'Corpad'
        this.ASSET_FOLDER_NAME = 'assets'
        this.appFolderId = undefined
        this.assetFolderId = undefined
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

    async createFolder(name, parents) {
        try {
            const folder = await this.authHandler(async () => await gdrive.files.newMetadataOnlyUploader()
                .setRequestBody({
                    name: name,
                    parents: parents,
                    mimeType: MimeTypes.FOLDER,
                })
                .execute())
            return folder.id
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to create folder', er)
        }
    }

    async getAppFolderId() {
        //returns id of Corpad folder on users cloud, if it doesnt exist, creates one and returns id
        if (folderIds.appFolder)
            return folderIds.appFolder
        else
            try {
                const list = await this.authHandler(async () => await gdrive.files.list({
                    q: new ListQueryBuilder()
                        .e('name', this.APPLICATION_FOLDER_NAME)
                }))
                if (list?.files.length === 0) {
                    const createFolderId = await this.createFolder(this.APPLICATION_FOLDER_NAME, ['root'])
                    folderIds.appFolder = createFolderId
                    return createFolderId
                }
                else {
                    this.appFolderId = list.files[0].id
                    return list.files[0].id
                }
            }
            catch (er) {
                throw new Error(errors.GOOGLE_DRIVE, 'Unable to get id of app folder', er, er.code ?? 701)
            }
    }

    async getAssetFolderId() {
        if (folderIds.assetFolder)
            return folderIds.assetFolder
        else try {
            const appFolderId = await this.getAppFolderId()
            const list = await this.authHandler(async () => await gdrive.files.list({
                q: new ListQueryBuilder()
                    .e('name', this.ASSET_FOLDER_NAME)
                    .and()
                    .in(appFolderId, 'parents')
                    .and()
                    .e('mimeType', MimeTypes.FOLDER)
                    .and()
                    .e('trashed', false)
            }))
            if (list && list.files && list.files.length) {
                this.assetFolderId = list.files[0].id
                return list.files[0].id
            }
            else {
                const assetFolderId = await this.createFolder(this.ASSET_FOLDER_NAME, [appFolderId])
                folderIds.assetFolder = assetFolderId
                return assetFolderId
            }
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to get asset folder id', er)
        }
    }

    async readAppFolder() {
        const folderId = await this.getAppFolderId()
        try {
            const { files } = await this.authHandler(async () => await gdrive.files.list({
                fields: "files/id,files/name,files/modifiedTime,files/size",
                q: new ListQueryBuilder()
                    .in(folderId, 'parents')
                    .and()
                    .e('trashed', false)
            }))
            return files.map(file => new CloudFile(file.name, file.id, [folderId], new Date(file.modifiedTime).getTime(), file.size))
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to read app folder', er, er.code ?? 702)
        }
    }

    async getSurveyAssetFolderId(uid) {
        try {
            const assetFolderId = await this.getAssetFolderId()
            const list = await this.authHandler(async () => await gdrive.files.list({
                q: new ListQueryBuilder()
                    .e('name', uid)
                    .and()
                    .in(assetFolderId, 'parents')
                    .and()
                    .e('mimeType', MimeTypes.FOLDER)
            }))
            if (list && list.files && list.files.length)
                return list.files[0].id
            else {
                return await this.createFolder(uid, [assetFolderId])
            }
        }
        catch (er) {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to get survey asset folder id', er)
        }
    }

    async readSurveyAssetFolder(uid) {
        const surveyAssetFolderId = await this.getSurveyAssetFolderId(uid)
        const { files } = await this.authHandler(async () => await gdrive.files.list({
            fields: "files/id,files/name,files/modifiedTime,files/size",
            q: new ListQueryBuilder()
                .in(surveyAssetFolderId, 'parents')
        }))
        return files.map(({ id, name, modifiedTime, size }) => new CloudFile(name, id, [surveyAssetFolderId], new Date(modifiedTime).getTime(), size))
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
        const folderId = await this.getAppFolderId()
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

    async deleteFiles(cloudFileList) {
        try {
            for (let i = 0; i < cloudFileList.length; i++) {
                try {
                    await this.authHandler(async () => await gdrive.files.delete(cloudFileList[i].cloudId))
                }
                catch (er) {
                    throw `Error delete file with index ${i}`
                }
            }
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


    async download(cloudId, destinationPath) {
        const { jobId, promise } = this.fileTransferManager.download(cloudId, destinationPath)
        const { statusCode } = await promise
        if (statusCode !== 200)
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to download a file', statusCode)
    }

    async upload(filepath, filename, parents, mimeType) {
        const { jobId, promise } = await this.fileTransferManager.upload(filepath, filename, parents, mimeType)
        const { statusCode } = await promise
        if (statusCode !== 200)
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to upload file', statusCode)
    }

}