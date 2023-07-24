import RNShare from 'react-native-share'

export class Share {
    constructor() { } //strange behavior. seems like RNShare never resolves after calling methood, although share sheet still appears

    shareFile(url, mimeType) {
        //Interesting behavior here. setTimeout is required otherwise Share sheet get dismissed as overflow menu dismisses. 
        setTimeout(async () => {
            try {
                await RNShare.open({
                    message: 'Share file',
                    url: 'file://' + url,
                    type: mimeType,
                    useInternalStorage: true,
                    failOnCancel: false,
                    showAppsToView: true,
                })
            }
            catch { }
        }, 300)
    }

    shareLink(link, title) {
        setTimeout(async () => {
            try {
                await RNShare.open({
                    title: title,
                    url: link,
                    showAppsToView: true,
                    failOnCancel: false,
                })
            }
            catch { }
        }, 300)
    }
}