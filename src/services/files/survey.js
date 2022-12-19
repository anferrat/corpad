// survey related function with local files (e.g. readSurvey from file, save, getMetaData )
import { PermissionsAndroid } from 'react-native'
import { getFileName, getHash, getStat, readDir, readFile, scanFile, writeFile, unlink } from "../../api/files/fs"
import { surveyValuesReset } from '../../helpers/survey/reset'
import { generateMetaData } from '../../helpers/survey/genMetadata'

export const getMetaDataFromFile = async (filePath) => {
    try {
        const file = await readFile(filePath)
        const hash = await getHash(filePath)
        const stat = await getStat(filePath)
        if (file.status === 200 && hash.status === 200 && stat.status === 200) {
            const fileData = JSON.parse(file.result)
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length)
            return generateMetaData(fileName, fileData, stat.result.mtime.getTime(), filePath, hash.result, false, null)
        }
        else return null
    }
    catch (er) {
        return null
    }
}


export const getLocalMetaData = async () => {
    //reads local surveys folder and generates array of meta-data objects of valid survey files
    try {
        const dir = await readDir('surveys')
        if (dir.status === 200) {
            //read dir and select files with .json extensions
            const files = dir.result.filter(item => item.name.endsWith('.json') && item.isFile()).sort((a, b) => b?.mtime.getTime() - a?.mtime.getTime())
            //access each file, parse to JSON and return meta object. if failed return null and then filter null values out
            return {
                status: 200,
                result: (await Promise.all(files.map(async file => await getMetaDataFromFile(file.path)))).filter(file => file !== null)
            }
        }
        else return dir
    }
    catch (er) {
        return {
            status: 405
        }
    }
}

export const readLocalSurvey = async (filePath) => {
    try {
        const file = await readFile(filePath)
        const hash = await getHash(filePath)
        if (file.status)
            if (hash.status)
                return {
                    status: 200,
                    result: JSON.parse(file.result),
                    hash: hash.result,
                    cloudId: null,
                    isSurveyNew: 0,
                }
            else return hash
        else return file
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
        if (surveyObject.status === 200) {
            const resettedSurvey = surveyValuesReset(surveyObject.result)
            if (resettedSurvey.status === 200) {
                return {
                    status: 200,
                    result: resettedSurvey.result,
                    hash: null,
                    cloudId: null,
                    isSurveyNew: 1,
                }
            }
            else return resettedSurvey
        }
        else return surveyObject
    }
    catch (er) {
        return { status: 413 }
    }
}

export const deleteLocalSurvey = async (path, hash) => {
    try {
        const calcHash = await getHash(path)
        if (calcHash.status === 200) {
            if (calcHash.result === hash)
                return await unlink(path)
            else return ({
                status: 410
            })
        }
        else return calcHash
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
                const deleteFile = await unlink(meta.filePath)
                if (deleteFile.status === 200)
                    return await writeFile(content, fileName, 'surveys', true)
                else return deleteFile
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

export const readExternalSurvey = async (uriExternal) => {
    try {
        const file = await readFile(uriExternal)
        if (file.status === 200)
            return {
                status: 200,
                result: JSON.parse(file.result),
                hash: null,
                cloudId: null,
                isSurveyNew: 1,
            }
        else return file
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
            await scanFile(file.filePath)
            return file
        }
        else return fileNameCorrected
    }
    else return {
        status: 901
    }
}