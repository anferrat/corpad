import RNShare from 'react-native-share'

export class Share {
    constructor() { }

    async shareFile(url, mimeType) {
        try {
            await RNShare.open({
                url: 'file://' + url,
                type: mimeType,
                useInternalStorage: true,
                showAppsToView: true,
                isNewTask: true,
            })
        }
        catch (er) {
            console.log(er)
        }
    }

}