import RNShare from 'react-native-share'

export class Share {
    constructor() { } //strange behavior. seems like RNShare never resolves after calling methood, although share sheet still appears

    shareFile(url, mimeType) {
        RNShare.open({
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
        RNShare.open({
            title: title,
            url: link,
            showAppsToView: true,
            failOnCancel: false,
        })
    }
}