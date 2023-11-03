import { ExternalFileTypes } from "../../../constants/global"
import { fileListener } from "../../config/fileListener"

export class SurveyFileListener {
    constructor(linkingService, openExternalSurveyService, appStateListener, externalFileContentResolver) {
        this.linkingService = linkingService
        this.openExternalSurveyService = openExternalSurveyService
        this.appStateListener = appStateListener
        this.externalFileContentResolver = externalFileContentResolver
    }

    addListener(callback, onError, onSuccess) {
        return this.linkingService.addUrlListener(async (url) => {
            if (!fileListener.inProgress) {
                fileListener.inProgress = true
                try {
                    const file = await this.externalFileContentResolver.execute(url)
                    if (file.fileType === ExternalFileTypes.SURVEY || file.fileType === ExternalFileTypes.SURVEY_WITH_ASSETS) {
                        const { name, fileName, syncTime, isCloud, isLoaded, uid } = await this.openExternalSurveyService.execute(file, undefined, callback)
                        onSuccess({ name, fileName, syncTime, isCloud, isLoaded, uid })
                    }
                    else
                        onError(437)
                }
                catch (er) {
                    onError(er.code ?? 437)
                }
                fileListener.inProgress = false
            }
        })
    }
}