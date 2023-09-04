import { Linking as LinkingDefault } from "react-native"

export class Linking {
    constructor() {
    }

    getInitialUrl() {
        return LinkingDefault.getInitialURL()
    }

    addUrlListener(callback) {
        return LinkingDefault.addEventListener('url', (data) => {
            return callback(data.url)
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
}