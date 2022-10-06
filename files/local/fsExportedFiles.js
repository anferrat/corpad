import RNFS from 'react-native-fs'
import { getLocation, } from "./fs"


export const getExportedFilesMetadata = async () => {
    //reads local surveys folder and generates array of meta-data objects of valid survey files
    try {
        const directory = await getLocation('exports')
        //read dir and select files with .csv and .kml extensions
        const files = (await RNFS.readDir(directory.location)).filter(item => (item.name.endsWith('.csv') || item.name.endsWith('.kml')) && item.isFile()).sort((a, b) => b?.mtime.getTime() - a?.mtime.getTime())
        //access each file, parse to JSON and return meta object. if failed return null and then filter null values out
        return {
            status: 200,
            result: files.map(file => ({
                name: file.name,
                path: file.path,
                size: file.size,
                mtime: file.mtime,
                type: file.name.endsWith('.csv') ? 'csv' : 'kml'
            }))
        }
    }
    catch (er) {
        return {
            status: 405
        }
    }
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