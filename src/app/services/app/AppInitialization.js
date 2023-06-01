export class AppInitialization {
    constructor(currentSurveyStatusService, networkService, authorizationService, surveyRepo, defaultNamesInitializationService, settingRepo, openExternalSurveyService, resetSettingsService) {
        this.currentSurveyStatusService = currentSurveyStatusService
        this.networkService = networkService
        this.authorizationService = authorizationService
        this.surveyRepo = surveyRepo
        this.defaultNamesInitializationService = defaultNamesInitializationService
        this.settingRepo = settingRepo
        this.openExternalSurveyService = openExternalSurveyService
        this.resetSettingsService = resetSettingsService
    }

    async execute(initialUrl) {
        //Create tables if not existed
        await this.surveyRepo.init()
        //Get settings, or reset the ones are not found 
        const settings = await this.resetSettingsService.execute()

        let [{ isLoaded, syncTime, name, fileName, isCloud }, isInternetOn, { isSigned, userName }] = await Promise.all([
            this.currentSurveyStatusService.execute(),
            this.networkService.checkConnection(),
            this.authorizationService.checkSignInStatus(),
            this.defaultNamesInitializationService.execute()
        ])

        if (isLoaded) {
            await this.surveyRepo.clearEmptyValues()

            if (initialUrl !== null)
                try {
                    await this.openExternalSurveyService.execute(initialUrl, isLoaded).then(meta => {
                        syncTime = meta.syncTime
                        name = meta.name
                        fileName = meta.fileName
                        isCloud = meta.isCloud
                        if (!meta.isLoaded)
                            isLoaded = meta.isLoaded
                    })
                }
                catch { }
        }

        if (!isSigned) {
            const session = await this.authorizationService.signInSilently()
            console.log('here')
            isSigned = session.isSigned
            userName = session.userName
        }

        return {
            isLoaded,
            syncTime: syncTime ?? null,
            name: name ?? null,
            fileName: fileName ?? null,
            isCloud: isCloud ?? null,
            isSigned,
            userName,
            isInternetOn,
            onboarding: settings.onboarding
        }
    }
}