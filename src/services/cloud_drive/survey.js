import { isFileExist, updateFile, createFile, deleteFile, readAppFolder, readFile, getMeta } from '../../api/cloud_drive/gd'
import { checkConnection } from '../../api/cloud_drive/netinfo'
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
        const appFolder = await readAppFolder()
        if (appFolder.status === 200) {
            try {
                const files = appFolder.result.files.filter(item => item.name.endsWith('.json')).sort((a, b) => (new Date(b?.modifiedTime)).getTime() - (new Date(a?.modifiedTime)).getTime())
                return {
                    status: 200,
                    result: (await Promise.all(files.map(async file => await getMetaDataFromCloudFile(file.id)))).filter(file => file !== null)
                }
            }
            catch (er) {
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
    const verifyConnection = await checkConnection()
    if (verifyConnection.status === 200) {
        const fileData = await readFile(cloudId)
        const meta = await getMeta(cloudId)
        if (fileData.status === 200 && meta.status === 200)
            return generateMetaData(meta.result.name, fileData.result, new Date(meta.result.modifiedTime).getTime(), null, null, true, cloudId)
        else return null
    }
    else return null
}

export const readCloudSurvey = async (cloudId) => {
    const verifyConnection = await checkConnection()
    if (verifyConnection.status === 200) {
        const data = await readFile(cloudId)
        if (data.status === 200)
            return ({
                status: 200,
                result: data.result,
                hash: null,
                cloudId: cloudId,
                isSurveyNew: 0,
            })
        else
            return data
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