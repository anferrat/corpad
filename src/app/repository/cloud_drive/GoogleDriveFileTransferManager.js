import RNFS from 'react-native-fs'
import { gdrive } from '../../config/cloud_drive'
import { Error, errors } from '../../utils/Error'

//Acess Google Drive API with RNFS, to download and upload binary files directly to filesystem without parsing in JS bridge
export class GoogleDriveFileTransferManager {
    constructor() {
    }

    download(cloudId, destinationPath) {
        return RNFS.downloadFile({
            fromUrl: `https://www.googleapis.com/drive/v2/files/${cloudId}?alt=media`,
            toFile: destinationPath,
            headers: {
                'Authorization': `Bearer ${gdrive.accessToken}`
            }
        })
    }

    async upload(filepath, filename, parents, mimeType) {
        /*
        filepath - path to file to upload
        filename - name of the file to upload (u can change it if you want different file name in cloud)
        parents - array of parent folder ids of the file
        mimeType - type of the file to be uploaded
        */
        const { size } = await RNFS.stat(filepath).catch(er => {
            throw new Error(errors.FILESYSTEM, 'Unable to get file size', er)
        })

        const { headers, ok, status } = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${gdrive.accessToken}`,
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Upload-Content-Type': mimeType,
                'Content-Length': size
            },
            body: JSON.stringify({
                name: filename,
                parents: parents
            })
        }).catch(er => {
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to start resumable upload session', er)
        })
        if (ok) {
            const uploadUrl = headers.get('Location')
            return RNFS.uploadFiles({
                toUrl: uploadUrl,
                binaryStreamOnly: true,
                files: [{
                    name: filename,
                    filename,
                    filepath,
                    filetype: mimeType,
                }],
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${gdrive.accessToken}`,
                    'Content-Length': size.toFixed(0)
                }
            })
        }
        else
            throw new Error(errors.GOOGLE_DRIVE, 'Unable to complete upload request', `Status: ${status}`)
    }
}