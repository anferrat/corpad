import { readDir, unlink, getLocation } from '../../api/files/fs'

export const getExportedFilesMetadata = async () => {
    try {
        const dir = await readDir('exports')
        if (dir.status === 200) {
            const files = dir.result.filter(item => (item.name.endsWith('.csv') || item.name.endsWith('.kml')) && item.isFile()).sort((a, b) => b?.mtime.getTime() - a?.mtime.getTime())
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
    }
    catch (er) {
        return {
            status: 405
        }
    }
}

export const clearExported = async () => {
    const directory = await getLocation('exports')
    if (directory.status === 200)
        return await unlink(directory.location)
    else return directory
}