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
        onboarding,
        multimeter,
        isCalculatorDisplayed
    ) {
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
        this.multimeter = multimeter
        this.isCalculatorDisplayed = isCalculatorDisplayed
        this.updated = [] //probably not used
    }
}

