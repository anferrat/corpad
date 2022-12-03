import { gdrive, getAppFolderId, isFileExist, updateFile, createFile, deleteFile } from '../../api/cloud_drive/gd'
import { ListQueryBuilder } from "@robinbobin/react-native-google-drive-api-wrapper"
import { checkConnection, authHandler } from '../../api/cloud_drive/auth'
import { generateMetaData } from '../../helpers/survey/genMetadata'

export const saveCloudSurvey = async (content, fileName, cloudId) => {
    const verifyConnection = await checkConnection()
    if (verifyConnection.status === 200) {
        const updateRequest = await isFileExist(cloudId)
        if (updateRequest.status === 200) {
            if (updateRequest.result) {
                return await updateFile(cloudId, content)
            }
            else
                return await createFile(fileName, content)
        }
        else return updateRequest
    }
    else return verifyConnection
}

export const getCloudMetaData = async () => {
    const verifyConnection = await checkConnection()
    if (verifyConnection.status === 200) {
        const appFolder = await getAppFolderId()
        if (appFolder.status === 200) {
            try {
                const list = await authHandler(async () => await gdrive.files.list({
                    fields: "files/id,files/name,files/modifiedTime",
                    q: new ListQueryBuilder()
                        .in(appFolder.result, 'parents')
                        .and()
                        .e('trashed', false)
                }), 705)
                const files = list.files.filter(item => item.name.endsWith('.json')).sort((a, b) => (new Date(b?.modifiedTime)).getTime() - (new Date(a?.modifiedTime)).getTime())
                return {
                    status: 200,
                    result: (await Promise.all(files.map(async file => await getMetaDataFromCloudFile(file.id)))).filter(file => file !== null)
                }
            }
            catch (er) {
                if (er?.corpadErrorStatus)
                    return { status: er?.corpadErrorStatus }
                else
                    return {
                        status: 705
                    }
            }
        }
        else return appFolder
    }
    return verifyConnection
}

export const getMetaDataFromCloudFile = async (cloudId) => {
    try {
        const fileData = await gdrive.files.getJson(cloudId)
        const meta = await gdrive.files.getMetadata(cloudId, {
            fields: 'modifiedTime,name'
        })
        return generateMetaData(meta.name, fileData, new Date(meta.modifiedTime).getTime(), null, null, true, cloudId)
    }
    catch (er) {
        return null
    }
}

export const readCloudSurvey = async (cloudId) => {
    const verifyConnection = await checkConnection()
    if (verifyConnection.status === 200) {
        try {
            return {
                status: 200,
                result: await authHandler(async () => await gdrive.files.getJson(cloudId), 706),
                hash: null,
                cloudId: cloudId,
                isSurveyNew: 0,
            }
        }
        catch (er) {
            if (er?.corpadErrorStatus)
                return { status: er?.corpadErrorStatus }
            else
                return {
                    status: 706
                }
        }
    }
    else return verifyConnection
}

export const deleteCloudSurvey = async (cloudId) => {
    const verifyConnection = await checkConnection()
    if (verifyConnection.status === 200) {
        return await deleteFile(cloudId)
    }
    else return verifyConnection
}

export const getFileLink = async (fileId) => {
    try {
        await authHandler(async () => await gdrive.permissions.create(fileId, undefined, {
            role: "reader",
            type: "anyone"
        }), 710)
        const meta = await authHandler(async () => await gdrive.files.getMetadata(fileId,
            {
                fields: "webViewLink"
            }), 710)
        return {
            status: 200,
            result: meta.webViewLink
        }
    }
    catch (er) {
        if (er?.corpadErrorStatus)
            return { status: er?.corpadErrorStatus }
        else
            return {
                status: 710
            }
    }
}