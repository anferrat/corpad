import { ExternalFileTypes } from "../../../constants/global"
import { ExternalFile } from "../../entities/survey/other/ExternalFile"

export class SurveyFileListener {
    constructor(linkingService, openExternalSurveyService, appStateListener) {
        this.linkingService = linkingService
        this.openExternalSurveyService = openExternalSurveyService
        this.appStateListener = appStateListener
    }

    addListener(callback, onError, onSuccess) {
        return this.linkingService.addUrlListener(async (url) => {
            try {
                
                const file = new ExternalFile(url)
                const fileType = file.getFileType()
                if (fileType === ExternalFileTypes.SURVEY || fileType === ExternalFileTypes.SURVEY_WITH_ASSETS || fileType === ExternalFileTypes.UNKNOWN_FILE) {
                    const { name, fileName, syncTime, isCloud, isLoaded, uid } = await this.openExternalSurveyService.execute(file, undefined, callback)
                    onSuccess({ name, fileName, syncTime, isCloud, isLoaded, uid })
                }
            }
            catch (er) {
                console.log(er)
                onError(er.code)
            }
        })
    }
}