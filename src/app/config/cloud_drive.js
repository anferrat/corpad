import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper"

export const config = {
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata'],
    webClientId: '658257365487-176osqqi2nft7vvige3diu2grea884mi.apps.googleusercontent.com',
    offlineAccess: false,
}

export const gdrive = new GDrive()

export const folderIds = {
    appFolder: undefined,
    assetFolder: undefined
}

gdrive.fetchTimeout = 15000