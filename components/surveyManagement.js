import { sendRequest, resetSurvey, exportJSON, importJSON, importWIthForceJSON } from "../database/db"
import { getLocalMetaData, readLocalSurvey, saveLocalSurvey, readExternalSurvey, deleteLocalSurvey, getMetaDataFromFile, saveToDownloads, readLocalSurveyTemplate } from "../files/local/fsSurvey"
import { saveCloudSurvey, getCloudMetaData, readCloudSurvey, deleteCloudSurvey, getMetaDataFromCloudFile } from "../files/cloud/gdSurvey"
import { errorHandler, warningHandler } from "./errorHandler"
import { potentialFields } from "../constants/constants"
import idGen from './IdGen'
import { fileNameGen } from "./customFunctions"
import { recoverSurvey, validateSurvey } from "../json/validation"


// Functions that control survey files operations (delete, create, open, save etc...) and
// interactions between filesystem and database

export const isSurveyLoaded = async () => {
    const isLoaded = await sendRequest('SELECT', 'IS_LOADED', {})
    if (isLoaded.status === 200) {
        if (isLoaded.result) {
            const settings = await sendRequest('SELECT', 'SETTINGS')
            const survey = await sendRequest('SELECT', 'SURVEY')
            if (settings.status === 200 && survey.status === 200)
                return {
                    status: 200,
                    isLoaded: true,
                    syncTime: settings.result.lastSync,
                    name: survey.result.name,
                    fileName: settings.result.fileName,
                    isCloud: settings.result.isCloud
                }
            else return { status: 600 }
        }
        else return {
            status: 200,
            isLoaded: false
        }
    }
    else return isLoaded
}


export const saveSurveyToFile = async () => {
    const surveyObject = await exportJSON()
    const settings = await sendRequest('SELECT', 'SETTINGS')
    const survey = await sendRequest('SELECT', 'SURVEY')
    if (surveyObject.status === 200 && settings.status === 200 && survey.status === 200) {
        const content = JSON.stringify(surveyObject.result)
        const fileName = settings.result.isSurveyNew ? fileNameGen(survey.result.name, 'json') : settings.result.fileName
        const newSyncTime = Date.now()
        if (!settings.result.isCloud) {
            const savedFile = await saveLocalSurvey(content, fileName, settings.result.isSurveyNew, settings.result.originalHash)
            if (savedFile.status === 200) {
                //savedName may be different from fileName in case of duplicates
                const savedName = savedFile.filePath.substring(savedFile.filePath.lastIndexOf('/') + 1, savedFile.filePath.length)
                const settingUpdate = await sendRequest('UPDATE', 'SETTING', [{ setting: 'isSurveyNew', value: 0 }, { setting: 'originalHash', value: savedFile.hash }, { setting: 'fileName', value: savedName }, { setting: 'lastSync', value: newSyncTime }])
                if (settingUpdate.status === 200)
                    return {
                        status: 200,
                        fileName: fileName,
                        syncTime: newSyncTime,
                        isCloud: settings.result.isCloud,
                    }
                else return settingUpdate
            }
            else return savedFile
        }
        else {
            const cloudSave = await saveCloudSurvey(content, fileName, settings.result.cloudId)
            if (cloudSave.status === 200) {
                if (settings.result.isSurveyNew) {
                    const settingUpdate = await sendRequest('UPDATE', 'SETTING', [{ setting: 'isSurveyNew', value: 0 }, { setting: 'cloudId', value: cloudSave.result }, { setting: 'lastSync', value: newSyncTime }])
                    if (settingUpdate.status === 200)
                        return {
                            status: 200,
                            fileName: fileName,
                            syncTime: newSyncTime,
                            isCloud: settings.result.isCloud,
                        }
                    else return settingUpdate
                }
                else return {
                    status: 200,
                    fileName: fileName,
                    syncTime: newSyncTime,
                    isCloud: settings.result.isCloud,
                }
            }
            else return cloudSave
        }
    }
    else return {
        status: 600
    }
}



//Saves current database state to local file, resets database and returns metaData
export const saveSurveyHandler = async () => {
    const savedFile = await saveSurveyToFile()
    if (savedFile.status === 200) {
        const metaData = !savedFile.isCloud ? await getLocalMetaData() : await getCloudMetaData()
        if (metaData.status === 200) {
            const reset = await resetSurvey()
            if (reset.status === 200)
                return {
                    status: 200,
                    result: metaData.result,
                    isCloud: savedFile.isCloud
                }
            else return reset
        }
        else return metaData
    }
    else return savedFile

}

const loadSurveyHandler = async (surveyObject, valid) => {
    //handles load survey in cases when there are errors in data file
    if (valid.corrupted) {
        const ask = await warningHandler(41, 'Open survey', 'Cancel')
        if (ask) {
            const surveyRecovered = recoverSurvey(surveyObject, valid.result.validation)
            if (surveyRecovered.status === 200)
                return await importWIthForceJSON(surveyRecovered.result)
            else return surveyRecovered
        }
        else return { status: 412 }
    }
    else {
        const load = await importJSON(surveyObject)
        if (load.status === 630 || load.status === 628) {
            const tryAgain = await warningHandler(load.status === 630 ? 42 : 41, 'Open survey', 'Cancel')
            if (tryAgain)
                return await importWIthForceJSON(surveyObject)
            else return load
        }
        else return load
    }
}

export const surveyLoader = async (fileTag, loaderType, fileName) => {
    const isLoaded = await isSurveyLoaded()
    if (isLoaded.status === 200) {
        if (isLoaded.isLoaded) {
            errorHandler(627)
            return isLoaded
        }
        else {
            const currentTime = Date.now()
            // there are 5 loader types 'cloud', 'local', 'external', 'localTemplate', 'cloudTemplate' - each handles reading file differently but returns object with same properties
            const loadedFile = loaderType === 'cloud' ? await readCloudSurvey(fileTag) : (loaderType === 'local' ? await readLocalSurvey(fileTag) : (loaderType === 'external' ? await readExternalSurvey(fileTag) : await readLocalSurveyTemplate(fileTag)))
            if (loadedFile.status === 200) {
                const valid = validateSurvey(loadedFile.result)
                if (valid.status === 200) {
                    const loadSurveyObject = await loadSurveyHandler(loadedFile.result, valid)
                    if (loadSurveyObject.status === 200) {
                        const survey = await sendRequest('SELECT', 'SURVEY')
                        const settings = await sendRequest('UPDATE', 'SURVEY_SETTINGS', { isSurveyNew: loadedFile.isSurveyNew, isCloud: loaderType === 'cloud' || loaderType === 'cloudTemplate', originalHash: loadedFile.hash, fileName: fileName, cloudId: loadedFile.cloudId, lastSync: loadedFile.isSurveyNew ? null : currentTime })
                        if (settings.status === 200 && survey.status === 200)
                            return {
                                status: 200,
                                name: survey.result.name,
                                fileName: fileName,
                                syncTime: loadedFile.isSurveyNew ? null : currentTime,
                                isCloud: loaderType === 'cloud' || loaderType === 'cloudTemplate',
                            }
                        else {
                            await resetSurvey()
                            return { status: 600 }
                        }
                    }
                    else return loadSurveyObject
                }
                else return valid
            }
            else return loadedFile
        }
    }
    else return isLoaded
}

// creates new blank survey 
export const createSurvey = async (name, isCloud, technician = 'Wade Watts') => {
    const isLoaded = await isSurveyLoaded()
    if (isLoaded.status === 200) {
        if (isLoaded.isLoaded) {
            errorHandler(627)
            return isLoaded
        }
        else {
            const survey = await sendRequest('INSERT', 'SURVEY', { uid: idGen(), name: name, technician: technician })
            const potentialTypes = await sendRequest('INSERT', 'POTENTIAL_TYPE', potentialFields.map(f => ({ ...f, uid: idGen() })))
            const pipeId = await sendRequest('INSERT', 'PIPELINE', { uid: idGen(), timeCreated: Date.now(), name: 'Pipeline', timeModified: Date.now() })
            const refCellId = await sendRequest('INSERT', 'REFERENCE_CELL', { uid: idGen(), mainReference: 1, name: 'RC1', rcType: 0 })
            const settings = await sendRequest('UPDATE', 'SURVEY_SETTINGS', { isSurveyNew: 1, isCloud: isCloud, originalHash: null, fileName: null, cloudId: null, lastSync: null })
            if (survey.status === 200 && pipeId.status === 200 && refCellId.status === 200 && settings.status === 200 && potentialTypes.status === 200)
                return {
                    status: 200,
                    syncTime: null,
                    name: name,
                    fileName: null,
                    isCloud: isCloud,
                }
            else {
                return { status: 600 }
            }
        }
    }
    else return isLoaded
}

export const deleteSurveyHandler = async (isCloud, path, hash = null) => {
    return isCloud ? await deleteCloudSurvey(path) : await deleteLocalSurvey(path, hash)
}

export const saveToDevice = async (cloudId) => {
    const surveyObject = await readCloudSurvey(cloudId)
    if (surveyObject.status === 200) {
        const meta = await getMetaDataFromCloudFile(cloudId)
        if (meta !== null) {
            const saveSurvey = await saveLocalSurvey(JSON.stringify(surveyObject.result), meta.fileName, true, null)
            if (saveSurvey.status === 200) {
                const localMeta = await getMetaDataFromFile(saveSurvey.filePath) //could be null if fails
                return {
                    status: 200,
                    meta: localMeta
                }
            }
            else return saveSurvey
        }
        else return {
            status: 702
        }
    }
    else return surveyObject
}

export const saveToCloud = async (filePath) => {
    const surveyObject = await readLocalSurvey(filePath)
    if (surveyObject.status === 200) {
        const meta = await getMetaDataFromFile(filePath)
        if (meta !== null) {
            const saveSurvey = await saveCloudSurvey(JSON.stringify(surveyObject.result), meta.fileName, null)
            if (saveSurvey.status === 200) {
                const cloudMeta = await getMetaDataFromCloudFile(saveSurvey.result)
                return {
                    status: 200,
                    meta: cloudMeta
                }
            }
            else return saveSurvey
        }
        else return { status: 408 }
    }
    else return surveyObject
}

export const saveSurveyToDownloads = async (path, isCloud) => {
    const surveyObject = isCloud ? await readCloudSurvey(path) : await readLocalSurvey(path)
    if (surveyObject.status === 200) {
        const meta = isCloud ? await getMetaDataFromCloudFile(path) : await getMetaDataFromFile(path)
        if (meta !== null) {
            return await saveToDownloads(JSON.stringify(surveyObject.result), meta.fileName)
        }
        else return {
            status: isCloud ? 702 : 408
        }
    }
    else return surveyObject
}