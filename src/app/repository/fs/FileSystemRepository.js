import RNFS from 'react-native-fs'
import { Error, errors } from '../../utils/Error'
import { FileSystemLocations } from '../../entities/survey/other/properties'

export class FileSystemRepository {
    constructor() {
        this.appFolder = RNFS.DocumentDirectoryPath
        this.downloadsFolder = RNFS.DownloadDirectoryPath
        this.surveysFolder = `${RNFS.DocumentDirectoryPath}/surveys`
        this.exportsFolder = `${RNFS.DocumentDirectoryPath}/exports`
        this.tempFolder = `${RNFS.DocumentDirectoryPath}/temp`
    }

    async writeFile(content, name, location, overwrite = true) {
        try {
            //add permissions for DOWNLOADS FOLDER
            const directoryPath = await this.getLocation(location)
            const filePath = directoryPath + '/' + name
            // check if ok to overwrite
            if ((await RNFS.exists(filePath)) && !overwrite)
                if ((await RNFS.stat(filePath)).isFile())
                    throw new Error(errors.FILESYSTEM, `File ${name} already exists in this directory.`, 'File already exist', 403)

            //check if there is enough free space - content size + 10MB extra
            const freeSpace = (await RNFS.getFSInfo()).freeSpace
            if (!isNaN(freeSpace) && freeSpace !== null && freeSpace < ((encodeURI(content).split(/%..|./).length - 1) + 10485760))
                throw new Error(errors.FILESYSTEM, `Not enough space on disk.`, 'Not enough space', 402)

            //write file
            await RNFS.writeFile(filePath, content)
            return filePath
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Error while writing file', er, 401)
        }
    }

    async copyFile(fileName, filePath, destinationLocation) {
        try {
            //check if there is enough free space
            const freeSpace = (await RNFS.getFSInfo()).freeSpace
            if (!isNaN(freeSpace) && freeSpace !== null && freeSpace < ((await RNFS.stat(filePath)).size + 10485760)) //content size + 10MB
                throw new Error(errors.FILESYSTEM, `Not enough space on disk.`, 'Not enough space', 402)

            //write file
            const directory = await this.getLocation(destinationLocation)
            const fileNameCorrected = await this.getFileName(fileName, destinationLocation)
            await RNFS.copyFile(filePath, `${directory}/${fileNameCorrected}`)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Error while copying file', er, 401)
        }
    }

    async getFileName(fileName, location) {
        const MAX_FILE_INDEX = 10
        //returns fileName or (index)fileName  in case of file with same name in same location
        const directory = await this.getLocation(location)
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
            if (await RNFS.exists(dir))
                if (!((await RNFS.stat(dir)).isFile()))
                    return dir
            //if dir doesn't exists create and return
            await RNFS.mkdir(dir)
            return dir
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to create/access directory ${dir}`, er, 400)
        }
    }

    async getLocation(location) {
        switch (location) {
            case FileSystemLocations.SURVEYS:
                return await this.createDirectory(this.surveysFolder)
            case FileSystemLocations.EXPORTS:
                return await this.createDirectory(this.exportsFolder)
            case FileSystemLocations.DOWNLOADS:
                return this.downloadsFolder
            case FileSystemLocations.TEMP: //not used
                return await this.createDirectory(this.tempFolder)
            default:
                throw new Error(errors.FILESYSTEM, `Unknown destination ${location}.`, 'Location doesnt exist', 400)
        }
    }

    async deleteFile(location, fileName) {
        const directory = await this.getLocation(location)
        try {
            const path = `${directory}/${fileName}`
            if (await RNFS.exists(path))
                if (!((await RNFS.stat(path)).isFile()))
                    await RNFS.unlink(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to delete ${fileName} in direcory ${directory}`, er, 410)
        }
    }

    async readFile(path) {
        try {
            return await RNFS.readFile(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to read at ${path}`, er, 418)
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
            throw new Error(errors.FILESYSTEM, `Unable to get stats of ${path}`, er, 419)
        }
    }

    async readDir(location) {
        const dir = await this.getLocation(location)
        try {
            return await RNFS.readDir(dir)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to read directory at ${dir}`, er, 419)
        }
    }

    async unlink(path) {
        //use when deleting Directories or when fileName is unknown
        try {
            await RNFS.unlink(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Unable to delete file/directory at ${path}`, er, 410)
        }
    }

    async scanFile(path) {
        try {
            await RNFS.scanFile(path)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, `Scan of ${path} failed`, er, 422)
        }
    }
}