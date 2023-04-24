export class AppSettings {
    constructor(
        pipelineNameAsDefault,
        defaultPotentialUnit,
        autoCreatePotentials,
        isSurveyNew,
        isCloud,
        originalHash,
        fileName,
        cloudId,
        lastSync,
        onboarding) {
        this.pipelineNameAsDefault = pipelineNameAsDefault
        this.defaultPotentialUnit = defaultPotentialUnit
        this.autoCreatePotentials = autoCreatePotentials
        this.isSurveyNew = isSurveyNew
        this.isCloud = isCloud
        this.originalHash = originalHash
        this.fileName = fileName
        this.cloudId = cloudId
        this.lastSync = lastSync
        this.onboarding = onboarding
        this.updated = []
    }

    getOnboarding() {
        if (this.onboarding)
            JSON.parse(this.onboarding)
        else return null
    }

    updateSettings(settings) {
        Object.keys(settings).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = settings.key
                this.updated.push(key)
            }
        })
    }
}

