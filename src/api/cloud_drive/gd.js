import { GDrive, MimeTypes, ListQueryBuilder } from "@robinbobin/react-native-google-drive-api-wrapper"
import { authHandler } from "./auth"

export const gdrive = new GDrive()
gdrive.fetchTimeout = -1

export const getAppFolderId = async () => {
    //returns id of Corpad folder on users cloud, if it doesnt exist, creates one and returns id
    try {
        const list = await authHandler(async () => await gdrive.files.list({
            q: new ListQueryBuilder()
                .e('name', 'Corpad')
        }), 701)
        if (list?.files.length === 0) {
            const createFolderId = await authHandler(async () => await gdrive.files.newMetadataOnlyUploader()
                .setRequestBody({
                    name: "Corpad",
                    parents: ['root'],
                    mimeType: MimeTypes.FOLDER,
                })
                .execute(), 701)
            return {
                status: 200,
                result: createFolderId.id
            }
        }
        else return {
            status: 200,
            result: list.files[0].id
        }
    }
    catch (er) {
        if (er?.corpadErrorStatus)
            return { status: er?.corpadErrorStatus }
        else
            return {
                status: 701
            }
    }
}

export const isFileExist = async (fileId) => {
    try {
        const meta = await authHandler(async () => await gdrive.files.getMetadata(fileId), 702)
        if (meta.id)
            return {
                status: 200,
                result: true
            }
        else return {
            status: 200,
            result: false
        }
    }
    catch (er) {
        if (er?.corpadErrorStatus)
            return { status: er?.corpadErrorStatus }
        else
            return {
                status: 702
            }
    }
}

export const createFile = async (name, content) => {
    const appFolder = await getAppFolderId()
    if (appFolder.status === 200) {
        try {
            const id = (await authHandler(async () => await gdrive.files.newMultipartUploader()
                .setData(content, MimeTypes.JSON)
                .setRequestBody({
                    name: name,
                    parents: [appFolder.result]
                })
                .execute(), 703)
            ).id
            return {
                status: 200,
                result: id
            }
        }
        catch (er) {
            if (er?.corpadErrorStatus)
                return { status: er?.corpadErrorStatus }
            else
                return {
                    status: 703
                }
        }
    }
    else return appFolder
}

export const updateFile = async (fileId, content) => {
    const appFolder = await getAppFolderId()
    if (appFolder.status === 200) {
        try {
            (await authHandler(async () => await gdrive.files.newMultipartUploader()
                .setData(content, MimeTypes.JSON)
                .setIdOfFileToUpdate(fileId)
                .execute(), 704)
            )?.id
            return {
                status: 200
            }
        }
        catch (er) {
            if (er?.corpadErrorStatus)
                return { status: er?.corpadErrorStatus }
            else
                return {
                    status: 704
                }
        }
    }
    else return appFolder
}


export const deleteFile = async (fileId) => {
    try {
        await authHandler(async () => await gdrive.files.delete(fileId), 709)
        return { status: 200 }
    }
    catch (er) {
        if (er?.corpadErrorStatus)
            return { status: er?.corpadErrorStatus }
        else
            return {
                status: 709
            }
    }
}


