import { Linking as LinkingDefault } from "react-native"
import { Error, errors } from "../../utils/Error"

export class Linking {
    constructor() {
    }

    getInitialUrl() {
        return LinkingDefault.getInitialURL()
    }

    addUrlListener(callback) {
        return LinkingDefault.addEventListener('url', (data) => {
            callback(data.url)
        })
    }

    openUrl(url) {
        return LinkingDefault.openURL(url)
    }

    async canOpenUrl(url) {
        try {
            return await LinkingDefault.canOpenURL(url)
        }
        catch {
            return false
        }
    }

    async openLink(url) {
        try {
            if (await LinkingDefault.canOpenURL(url))
                return this.openUrl(url)
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to open url', er, 119)
        }
    }
}