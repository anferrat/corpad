import RNShare from 'react-native-share'

export class Share {
    constructor() { }

    shareFile(url, mimeType) {
        return RNShare.open({
            message: 'Share file',
            url: 'file://' + url,
            type: mimeType,
            useInternalStorage: true,
            failOnCancel: false,
            showAppsToView: true,
            saveToFiles: true
        })
    }

    shareLink(link, title) {
        return RNShare.open({
            title: title,
            url: link,
            failOnCancel: false,
            showAppsToView: true,
        })
    }
}