import RNFS from 'react-native-fs'
import { warningHandler } from '../../components/errorHandler'

// general functions with RNFS (e.g. write, copy, delete a file)

const myFolder = RNFS.DocumentDirectoryPath

const downloads = RNFS.DownloadDirectoryPath

export const writeFile = async (content, name, location, overwrite = true) => {
    try {
        const directoryPath = await getLocation(location)
        if (directoryPath.status === 200) {
            const filePath = directoryPath.location + '/' + name
            // check if ok to overwrite
            if ((await RNFS.exists(filePath)))
                if (!overwrite) {
                    if ((await RNFS.stat(filePath)).isFile()) {
                        const acceptOverwrite = await warningHandler(40)
                        if (!acceptOverwrite) {
                            return {
                                status: 403
                            }
                        }
                        else
                            await RNFS.unlink(filePath)
                    }
                }
                else
                    await RNFS.unlink(filePath)

            //check if there is enough free space
            const freeSpace = (await RNFS.getFSInfo()).freeSpace
            if (!isNaN(freeSpace) && freeSpace !== null && freeSpace < ((encodeURI(content).split(/%..|./).length - 1) + 10485760)) //content size + 10MB
                return {
                    status: 402
                }

            //write file
            try {
                await RNFS.writeFile(filePath, content)
                return {
                    status: 200,
                    filePath: filePath,
                    hash: await RNFS.hash(filePath, 'md5')
                }
            }
            catch (er) {
                console.log(er)
                return {
                    status: 401
                }
            }
        }
        else return directoryPath
    }
    catch (er) {

        return {
            status: 401
        }
    }
}

export const copyFile = async (filePath, destination) => {
    try {
        //check if there is enough free space
        const freeSpace = (await RNFS.getFSInfo()).freeSpace
        if (!isNaN(freeSpace) && freeSpace !== null && freeSpace < ((await RNFS.stat(filePath)).size + 10485760)) //content size + 10MB
            return {
                status: 402
            }
        //write file
        await RNFS.copyFile(filePath, destination)
        return {
            status: 200,
            filePath: destination
        }
    }
    catch (er) {
        return {
            status: 404
        }
    }
}

export const getFileName = async (fileName, location) => {
    try {
        const directory = await getLocation(location)
        if (directory.status === 200) {
            if (await RNFS.exists(directory.location + '/' + fileName)) {
                for (i = 1; i <= 10; i++) {
                    if (!(await RNFS.exists(`${directory.location}/(${i})${fileName}`))) {
                        return {
                            status: 200,
                            fileName: `(${i})${fileName}`
                        }
                    }
                }
                return {
                    status: 409
                }
            }
            else return {
                status: 200,
                fileName: fileName
            }
        }
        else return directory
    }
    catch (er) {
        return {
            status: 400,
        }
    }
}

const createDirectory = async (location) => {
    try {
        if (await RNFS.exists(location))
            if (!((await RNFS.stat(location)).isFile()))
                return {
                    location: location,
                    status: 200
                }
        await RNFS.mkdir(location)
        return {
            location: location,
            status: 200
        }
    }
    catch (er) {
        return {
            status: 400
        }
    }
}

export const getLocation = async (location) => {
    switch (location) {
        case 'surveys':
            return await createDirectory(myFolder + '/surveys')
        case 'exports':
            return await createDirectory(myFolder + '/exports')
        case 'downloads':
            return {
                status: 200,
                location: downloads
            }
        case 'temp':
            await createDirectory(myFolder + '/temp')
        default:
            return {
                status: 200,
                location: myFolder
            }
    }
}

export const deleteFile = async (location, fileName) => {
    const directory = await getLocation(location)
    if (directory.status === 200) {
        try {
            if (await RNFS.exists(`${directory.location}/${fileName}`))
                await RNFS.unlink(`${directory.location}/${fileName}`)
            return {
                status: 200
            }
        }
        catch (er) {
            return {
                status: 410
            }
        }
    }
    else return directory
}


export const clearExported = async () => {
    try {
        const directory = await getLocation('exports')
        await RNFS.unlink(directory.location)
        return { status: 200 }
    }
    catch (er) {
        return { status: 410 }
    }
}

//below for dev use only

export const test = async () => {
    console.log((await RNFS.readDir(myFolder + '/surveys')).map(d => d.name))
}

export const resetFolder = async () => {
    console.log((await RNFS.unlink(myFolder + '/surveys')))
}