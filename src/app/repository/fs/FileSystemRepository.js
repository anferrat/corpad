import RNFS from 'react-native-fs'
import { Error } from '../../utils/Error'

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
            const directoryPath = await this.getLocation(location)
            const filePath = directoryPath + '/' + name
            // check if ok to overwrite
            if ((await RNFS.exists(filePath)) && !overwrite)
                if ((await RNFS.stat(filePath)).isFile())
                    throw new Error('FileError', `File ${name} already exists in this directory.`, { status: 403 })

            //check if there is enough free space - content size + 10MB extra
            const freeSpace = (await RNFS.getFSInfo()).freeSpace
            if (!isNaN(freeSpace) && freeSpace !== null && freeSpace < ((encodeURI(content).split(/%..|./).length - 1) + 10485760))
                throw new Error('FileError', `Not enough space on disk.`, { status: 402 })

            //write file

            await RNFS.writeFile(filePath, content)
            return {
                status: 200,
                filePath: filePath,
                hash: await RNFS.hash(filePath, 'md5')
            }
        }
        catch (er) {
            throw new Error('FileError', 'Error while writing file', { status: 401, error: er })
        }
    }

    async copyFile(fileName, filePath, destinationLocation) {
        try {
            //check if there is enough free space
            const freeSpace = (await RNFS.getFSInfo()).freeSpace
            if (!isNaN(freeSpace) && freeSpace !== null && freeSpace < ((await RNFS.stat(filePath)).size + 10485760)) //content size + 10MB
                throw new Error('FileError', `Not enough space on disk.`, { status: 402 })

            //write file
            const directory = await this.getLocation(destinationLocation)
            const fileNameCorrected = await this.getFileName(fileName, destinationLocation)
            await RNFS.copyFile(filePath, `${directory}/${fileNameCorrected}`)
        }
        catch (er) {
            throw new Error('FileError', 'Error while copying file', { status: 401, error: er })
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
                throw new Error('FileError', `Unable get unique name for ${fileName}. Maximum of ${MAX_FILE_INDEX} were used`, { status: 409 })
            }
        }
        catch (er) {
            throw new Error('FileError', `Error while getting filename of ${fileName} in directory ${directory}`, { status: 409, error: er })
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
            throw new Error('FileError', `Unable to create/access directory ${dir}`, { status: 400, error: er })
        }
    }

    async getLocation(location) {
        switch (location) {
            case 'surveys':
                return await createDirectory(this.surveysFolder)
            case 'exports':
                return await createDirectory(this.exportsFolder)
            case 'downloads':
                return this.downloadsFolder
            case 'temp': //not used
                return await createDirectory(this.tempFolder)
            default:
                throw new Error('FileError', `Unknown destination ${location}.`, { status: 400 })
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
            throw new Error('FileError', `Unable to delete ${fileName} in direcory ${directory}`, { status: 410, error: er })
        }
    }

    async readFile(path) {
        try {
            return await RNFS.readFile(path)
        }
        catch (er) {
            throw new Error('FileError', `Unable to read at ${path}`, { status: 418, error: er })
        }
    }

    async getHash(path, algorithm = 'md5') {
        try {
            return await RNFS.hash(path, algorithm)
        }
        catch (er) {
            throw new Error('FileError', `Unable to get hash of ${path}`, { status: 419, error: er })
        }
    }

    async getStat(path) {
        try {
            return await RNFS.stat(path)
        }
        catch (er) {
            throw new Error('FileError', `Unable to get stats of ${path}`, { status: 419, error: er })
        }
    }

    async readDir(location) {
        const dir = await this.getLocation(location)
        try {
            return await RNFS.readDir(dir)
        }
        catch (er) {
            throw new Error('FileError', `Unable to read directory at ${dir}`, { status: 419, error: er })
        }
    }

    async unlink(path) {
        //use when deleting Directories or when fileName is unknown
        try {
            await RNFS.unlink(path)
        }
        catch (er) {
            throw new Error('FileError', `Unable to delete file/directory at ${path}`, { status: 410, error: er })
        }
    }

    async scanFile(path) {
        try {
            await RNFS.scanFile(path)
        }
        catch (er) {
            throw new Error('FileError', `Scan of ${path} failed`, { status: 422, error: er })
        }
    }
}