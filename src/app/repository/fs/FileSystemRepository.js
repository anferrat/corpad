import RNFS from 'react-native-fs'
import { zip, unzip } from 'react-native-zip-archive'
import { Error, errors } from '../../utils/Error'
import { FileSystemLocations } from '../../../constants/global'
import { Platform } from 'react-native'
import { File } from '../../entities/survey/other/File'
import fileType from 'react-native-file-type'


export class FileSystemRepository {
    constructor() {
        this.appFolder = Platform.select({
            android: RNFS.DocumentDirectoryPath,
            ios: RNFS.LibraryDirectoryPath,
            default: RNFS.DocumentDirectoryPath
        })
        this.exportsFolder = `${RNFS.DocumentDirectoryPath}/exports`
        this.downloadsFolder = RNFS.DownloadDirectoryPath
        this.surveysFolder = `${this.appFolder}/surveys`
        this.tempFolder = `${this.appFolder}/temp`
        this.assetsFolder = `${this.appFolder}/assets`
        this.currentAssetsFolder = `${this.appFolder}/assets/current`
        this.tempSurveyFolder = `${this.appFolder}/temp/survey`
        this.tempSurveyAssetsFolder = `${this.appFolder}/temp/survey/assets`
        this.tempDownloadsFolder = `${this.appFolder}/downloads`
        this.cacheFolder = RNFS.CachesDirectoryPath
    }

    async writeFile(content, name, location, overwrite = true, uid = null) {
        try {
            //add permissions for DOWNLOADS FOLDER
            const directoryPath = await this.getLocation(location, uid)
            const filePath = directoryPath + '/' + name
            // check if ok to overwrite
            if ((await RNFS.exists(filePath)) && !overwrite)
                if ((await RNFS.stat(filePath)).isFile())
                    throw new Error(errors.FILESYSTEM, `File ${name} already exists in this directory.`, 'File already exist', 403)

            //check if there is enough free space - content size + 10MB extra

            //write file
            await RNFS.writeFile(filePath, content)
            return filePath
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Error while writing file', er, 401)
        }
    }

    async copyFile(filePath, destinationPath) {
        try {
            await RNFS.copyFile(filePath, destinationPath)
        }
        catch (er) {
            console.log(er)
            throw new Error(errors.FILESYSTEM, 'Error while copying file', er, 404)
        }
    }

    async copyFiles(destinationFolder, fileList) {
        let copiedFiles = []
        try {
            const freeSpace = (await RNFS.getFSInfo()).freeSpace
            const requiredSpace = fileList.reduce((a, b) => a + b.size, 0)
            if (freeSpace < requiredSpace + 10000)
                throw 'Not enough space'
            else
                return await Promise.all(fileList.map(async ({ filename, path }) => {
                    await RNFS.copyFile(path, `${destinationFolder}/${filename}`)
                    copiedFiles.push(filename)
                }))
        }
        catch (er) {
            copiedFiles.forEach((filename) => RNFS.unlink(`${destinationFolder}/${filename}`))
            throw new Error(errors.FILESYSTEM, 'Error while copying files', er, 404)
        }
    }

    async getFileName(fileName, location, uid = null) {
        const MAX_FILE_INDEX = 10
        //returns fileName or (index)fileName  in case of file with same name in same location
        const directory = await this.getLocation(location, uid)
        try {
            if (!(await RNFS.exists(directory + '/' + fileName)))
                return fileName
            else {
                for (i = 1; i <= MAX_FILE_INDEX; i++) {
                    if (!(await RNFS.exists(`${directory}/(${i})${fileName}`)))
                        return `(${i})${fileName}`
                }
                throw new Error(errors.FILESYSTEM, `Unable get unique name for ${fileName}. Maximum of ${MAX_FILE_INDEX} were used`, 'Too many repetetive names', 409)
            }
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Error while getting filename of ${fileName} in directory ${directory}`, er, 409)
        }
    }

    async createDirectory(dir) {
        try {
            //Check if dir exists and not a file and return
            if (!await RNFS.exists(dir) || (await RNFS.stat(dir)).isFile())
                await RNFS.mkdir(dir)
            return dir
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to create/access directory ${dir}`, er, 405)
        }
    }

    async deleteFile(location, fileName, uid = null) {
        const directory = await this.getLocation(location, uid)
        try {
            const path = `${directory}/${fileName}`
            if (await RNFS.exists(path) && (await RNFS.stat(path)).isFile())
                await RNFS.unlink(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to delete ${fileName} in direcory ${directory}`, er, 407)
        }
    }

    async readFile(path) {
        try {
            return await RNFS.readFile(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to read at ${path}`, er, 408)
        }
    }

    async getHash(path, algorithm = 'md5') {
        try {
            return await RNFS.hash(path, algorithm)
        }
        catch (er) {
            return 'I am lazy'
        }
    }

    async getStat(path) {
        try {
            return await RNFS.stat(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to get stats of ${path}`, er, 410)
        }
    }

    async readDir(location, uid = null) {
        const dir = await this.getLocation(location, uid)
        try {
            const files = await RNFS.readDir(dir)
            return files.map((file) => new File(file.name, file.mtime.getTime(), file.path, file.size, file.isFile()))
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to read directory at ${dir}`, er, 411)
        }
    }

    _getLocationPath(location, uid = null) {
        //Internal use only
        switch (location) {
            case FileSystemLocations.EXPORTS:
                return this.exportsFolder
            case FileSystemLocations.SURVEYS:
                return this.surveysFolder
            case FileSystemLocations.TEMP:
                return this.tempFolder
            case FileSystemLocations.DOWNLOADS:
                return this.downloadsFolder
            case FileSystemLocations.TEMP_DOWNLOADS:
                return this.tempDownloadsFolder
            case FileSystemLocations.TEMP_SURVEY:
                return this.tempSurveyFolder
            case FileSystemLocations.TEMP_ASSETS:
                return this.tempSurveyAssetsFolder
            case FileSystemLocations.CURRENT_ASSETS:
                return this.currentAssetsFolder
            case FileSystemLocations.CACHE:
                return this.cacheFolder
            case FileSystemLocations.ASSETS:
                if (uid)
                    return `${this.assetsFolder}/${uid}`
            default:
                throw new Error(errors.FILESYSTEM, `Unknown destination ${location}.`, 'Location doesnt exist', 406)
        }
    }

    async getLocation(location, uid = null) {
        //returns path of FileSystemLocation constants. creates directory if not exists
        const path = this._getLocationPath(location, uid)
        if (location === FileSystemLocations.ASSETS || location === FileSystemLocations.CURRENT_ASSETS)
            await this.createDirectory(this.assetsFolder)
        if (location === FileSystemLocations.TEMP_SURVEY || location === FileSystemLocations.TEMP_ASSETS)
            await this.createDirectory(this.tempFolder)
        if (location === FileSystemLocations.TEMP_ASSETS)
            await this.createDirectory(this.tempSurveyFolder)
        if (location !== FileSystemLocations.DOWNLOADS && location !== FileSystemLocations.CACHE)
            return await this.createDirectory(path)
        else return path
    }

    async removeDir(location, uid) {
        const path = this._getLocationPath(location, uid)
        try {
            const exist = await RNFS.exists(path)
            if (exist)
                return await RNFS.unlink(path)
            else return true
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to delete file/directory at ${path}`, er, 407)
        }
    }

    async unlink(path) {
        //kinda repeats delete file, maybe get rid of it
        try {
            await RNFS.unlink(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to delete file/directory at ${path}`, er, 407)
        }
    }

    async scanFile(path) {
        try {
            await RNFS.scanFile(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Scan of ${path} failed`, er, 410)
        }
    }

    getPathFromUri(uri) {
        //For android uri works for react-native-fs as argument for reading files, for ios - path
        return Platform.select({
            android: uri,
            ios: decodeURI(uri)
        })
    }

    async zip(folderPath, targetPath) {
        try {
            return await zip(folderPath, targetPath)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Uable to zip folder', er)
        }
    }

    async unzip(sourcePath, folderPath) {
        try {
            return await unzip(sourcePath, folderPath)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Uable to unzip file', er)
        }
    }

    async getFileType(path) {
        try {
            return await fileType(path)
        }
        catch {
            throw new Error(errors.FILESYSTEM, 'Unable to get file type', er)
        }
    }

    async read(path, length, position, encoding) {
        try {
            return await RNFS.read(path, length, position, encoding)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to read file', er, 408)
        }
    }
}