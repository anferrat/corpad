import { NativeModules, Platform } from "react-native"
import { Error, errors } from "../../utils/Error"

//For iOS in order to read files from shared url, the app needs to call startAccessingSecurityScopedResource. Android can access resources right away.

export class UrlFileAccess {
    constructor() {
    }

    async requestAccess(url) {
        try {
            if (Platform.OS === 'ios')
                await NativeModules.FileAccessModule.startAccessingSecurityScopedResource(url)
        }
        catch (er) {
            throw new Error(errors.PERMISSION, 'Unable to access shared file')
        }
    }

    async revokeAccess() {
        try {
            if (Platform.OS === 'ios')
                await NativeModules.FileAccessModule.stopAccessingSecurityScopedResource()
        }
        catch {
            throw new Error(errors.PERMISSION, 'Unable to release security scoped file access')
        }
    }
}