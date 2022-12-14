import { GDrive, MimeTypes, ListQueryBuilder } from "@robinbobin/react-native-google-drive-api-wrapper"
import { authHandler } from "./auth"

export const gdrive = new GDrive()
gdrive.fetchTimeout = 30000

const errorWrapper = (error, errorCode) => error?.status ? error : ({ status: errorCode })


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
                .execute())
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
        return errorWrapper(er, 701)
    }
}

export const readAppFolder = async () => {
    try {
        const appFolder = await getAppFolderId()
        if (appFolder.status === 200) {
            return ({
                status: 200,
                result: await authHandler(async () => await gdrive.files.list({
                    fields: "files/id,files/name,files/modifiedTime",
                    q: new ListQueryBuilder()
                        .in(appFolder.result, 'parents')
                        .and()
                        .e('trashed', false)
                }))
            })
        }
        else return appFolder
    }
    catch (er) {
        return errorWrapper(er, 705)
    }
}

export const isFileExist = async (fileId) => {
    try {
        const meta = await authHandler(async () => await gdrive.files.getMetadata(fileId))
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
        return errorWrapper(er, 702)
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
                .execute())
            ).id
            return {
                status: 200,
                result: id
            }
        }
        catch (er) {
            return errorWrapper(er, 703)
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
                .execute())
            )?.id
            return {
                status: 200
            }
        }
        catch (er) {
            return errorWrapper(er, 704)
        }
    }
    else return appFolder
}


export const deleteFile = async (fileId) => {
    try {
        await authHandler(async () => await gdrive.files.delete(fileId))
        return { status: 200 }
    }
    catch (er) {
        return errorWrapper(er, 709)
    }
}

export const readFile = async (fileId) => {
    try {
        const data = await authHandler(async () => await gdrive.files.getJson(fileId))
        return ({
            status: 200,
            result: data
        })
    }
    catch (er) {
        return errorWrapper(er, 706)
    }
}

export const getMeta = async (fileId) => {
    try {
        const meta = await authHandler(async () => await gdrive.files.getMetadata(fileId, { fields: 'modifiedTime,name' }))
        return ({
            status: 200,
            result: meta
        })
    }
    catch (er) {
        return errorWrapper(er, 702)
    }
}


export const getWebLink = async (fileId) => {
    try {
        await authHandler(async () => await gdrive.permissions.create(fileId, undefined, {
            role: "reader",
            type: "anyone"
        }), 710)
        const meta = await authHandler(async () => await gdrive.files.getMetadata(fileId,
            {
                fields: "webViewLink"
            }))
        return {
            status: 200,
            result: meta.webViewLink
        }
    }
    catch (er) {
        return errorWrapper(er, 710)
    }
}

