import { Linking as LinkingDefault } from "react-native"

export class Linking {
    constructor() {
    }

    getInitialUrl(url) {
        return LinkingDefault.getInitialURL(url)
    }

    addUrlListener(callback) {
        return LinkingDefault.addEventListener('url', ({ url }) => callback(url))
    }
}