import RNShare from 'react-native-share'
import { Error, errors } from '../../utils/Error'

export class Share {
    constructor() { } //strange behavior. seems like RNShare never resolves after calling methood, although share sheet still appears

    async shareFile(url, mimeType) {
        //Interesting behavior here. setTimeout is required otherwise Share sheet get dismissed as overflow menu dismisses. 
        try {
            await RNShare.open({
                url: 'file://' + url,
                type: mimeType,
                useInternalStorage: true,
                failOnCancel: false,
                showAppsToView: true,
                isNewTask: true
            })
        }
        catch (er) {
            if (er.message = 'User did not share')
                throw new Error(errors.GENERAL, 'Operation cancelled', 'Cancelled by user', 101)
            else throw new Error(errors.GENERAL, 'Share operation failed', er)
        }
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