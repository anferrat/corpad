import { ExternalFileTypes, UrlTypes } from "../../../constants/global"
import { urlListener } from "../../config/urlListener"

export class UrlResolver {
    constructor(urlFileAccess, externalFileContentResolver, openExternalSurveyService,) {
        this.urlFileAccess = urlFileAccess
        this.externalFileContentResolver = externalFileContentResolver
        this.openExternalSurveyService = openExternalSurveyService
    }

    _getUrlType(url) {
        if (url.startsWith('com.corpad://l/') || url.startsWith('https://l.corpad.ca'))
            return UrlTypes.DATA_LINK
        else return UrlTypes.FILE
    }

    async execute(url, callback, onError, onSuccess) {
        if (!urlListener.inProgress) {
            urlListener.inProgress = true
            const urlType = this._getUrlType(url)
            if (urlType === UrlTypes.DATA_LINK)
                onSuccess({ urlType, link: url })
            else
                try {
                    await this.urlFileAccess.requestAccess(url)
                    const file = await this.externalFileContentResolver.execute(url)
                    if (file.fileType === ExternalFileTypes.SURVEY || file.fileType === ExternalFileTypes.SURVEY_WITH_ASSETS) {
                        const { name, fileName, syncTime, isCloud, isLoaded, uid } = await this.openExternalSurveyService.execute(file, undefined, callback)
                        onSuccess({ urlType, name, fileName, syncTime, isCloud, isLoaded, uid })
                    }
                    else
                        onError(437)
                    await this.urlFileAccess.revokeAccess()
                }
                catch (er) {
                    try {
                        await this.urlFileAccess.revokeAccess()
                    }
                    catch { }
                    onError(er.code ?? 437)
                }
            urlListener.inProgress = false
        }
    }

}