// survey related function with local files (e.g. readSurvey from file, save, getMetaData )
import RNFS from 'react-native-fs'
import { genereateMetaData } from "../helpers/surveyFileFunctions"
import { getFileName, getLocation, writeFile, deleteFile } from "./fs"
import { validateSurvey, surveyZeroing } from "../helpers/surveyFileFunctions"
import { PermissionsAndroid } from 'react-native'

export const getMetaDataFromFile = async (filePath) => {
    try {
        const fileData = JSON.parse(await RNFS.readFile(filePath))
        const hash = await RNFS.hash(filePath, 'md5')
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length)
        const stat = await RNFS.stat(filePath)
        return genereateMetaData(fileName, fileData, stat.mtime.getTime(), filePath, hash, false, null)
    }
    catch (er) {
        return null
    }
}


export const getLocalMetaData = async () => {
    //reads local surveys folder and generates array of meta-data objects of valid survey files
    try {
        const directory = await getLocation('surveys')
        //read dir and select files with .json extensions
        const files = (await RNFS.readDir(directory.location)).filter(item => item.name.endsWith('.json') && item.isFile()).sort((a, b) => b?.mtime.getTime() - a?.mtime.getTime())
        //access each file, parse to JSON and return meta object. if failed return null and then filter null values out
        return {
            status: 200,
            result: (await Promise.all(files.map(async file => await getMetaDataFromFile(file.path)))).filter(file => file !== null)
        }
    }
    catch (er) {
        return {
            status: 405
        }
    }
}

export const readLocalSurvey = async (filePath) => {
    try {
        const surveyObject = validateSurvey(JSON.parse(await RNFS.readFile(filePath)), true)
        if (surveyObject.status === 200) {
            const hash = await RNFS.hash(filePath, 'md5')
            return {
                status: 200,
                result: surveyObject.result,
                hash: hash,
                corrupted: surveyObject.corrupted
            }
        }
        else return surveyObject
    }
    catch (er) {
        return {
            status: 411
        }
    }
}

export const readLocalSurveyTemplate = async (filePath) => {
    try {
        const surveyObject = await readLocalSurvey(filePath)
        if (surveyObject.status === 200)
            return {
                status: 200,
                result: surveyZeroing(surveyObject.result)
            }
        else return surveyObject
    }
    catch (er) {
        return { status: 413 }
    }
}

export const deleteLocalSurvey = async (path, hash) => {
    try {
        const hashValid = (await RNFS.hash(path, 'md5')) === hash
        if (hashValid) {
            await RNFS.unlink(path)
            return {
                status: 200
            }
        }
        else return {
            status: 410
        }
    }
    catch (er) {
        return {
            status: 410
        }
    }
}


export const saveLocalSurvey = async (content, fileName, isSurveyNew, originalHash) => {
    const metaData = await getLocalMetaData()
    if (metaData.status === 200) {
        try {
            const metaIndex = metaData.result.findIndex(metaItem => {
                return metaItem.hash === originalHash
            })
            if (!!isSurveyNew || (metaIndex === -1)) {
                const fileNameCorrected = await getFileName(fileName, 'surveys')
                if (fileNameCorrected.status === 200) {
                    return await writeFile(content, fileNameCorrected.fileName, 'surveys', true)
                }
                else return fileNameCorrected
            }
            else {
                const meta = metaData.result[metaIndex]
                // need to add additional file backup before deleting in case something fails along the way
                await RNFS.unlink(meta.filePath)
                return await writeFile(content, fileName, 'surveys', true)
            }
        }
        catch (er) {
            return {
                status: 407
            }
        }
    }
    else return metaData
}

//readExternalSurvey can also read files from cloud storage, but it uses RNFS so i placed it here
export const readExternalSurvey = async (uriExternal) => {
    try {
        const file = await RNFS.readFile(uriExternal)
        return validateSurvey(JSON.parse(file))
    }
    catch (er) {
        return {
            status: 411
        }
    }
}

export const saveToDownloads = async (content, fileName) => {
    const permission = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE])
    if (permission[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === 'granted' && permission[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === 'granted') {
        const fileNameCorrected = await getFileName(fileName, 'downloads')
        if (fileNameCorrected.status === 200) {
            const file = await writeFile(content, fileNameCorrected.fileName, 'downloads', true)
            await RNFS.scanFile(file.filePath)
            return file
        }
        else return fileNameCorrected
    }
    else return {
        status: 901
    }
}