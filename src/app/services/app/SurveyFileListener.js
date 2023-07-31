export class SurveyFileListener {
    constructor(linkingService, openExternalSurveyService, appStateListener) {
        this.linkingService = linkingService
        this.openExternalSurveyService = openExternalSurveyService
        this.appStateListener = appStateListener
    }

    addListener(callback, onError, onSuccess) {
        return this.linkingService.addUrlListener(async (url) => {
            try {
                const { name, fileName, syncTime, isCloud, isLoaded } = await this.openExternalSurveyService.execute(url, undefined, callback)
                onSuccess({ name, fileName, syncTime, isCloud, isLoaded })
            }
            catch (er) {
                onError(er.code)
            }
        })
    }
}