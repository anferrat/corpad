export class AppInitialization {
    constructor(currentSurveyStatusService, authorizationService, surveyRepo, multimeterInitializationService, defaultNamesInitializationService, settingRepo, openExternalSurveyService, settingInitializationService, databaseInitializationService, fileSystemInitializationService, linkingService) {
        this.currentSurveyStatusService = currentSurveyStatusService
        this.authorizationService = authorizationService
        this.surveyRepo = surveyRepo
        this.multimeterInitializationService = multimeterInitializationService
        this.defaultNamesInitializationService = defaultNamesInitializationService
        this.settingRepo = settingRepo
        this.openExternalSurveyService = openExternalSurveyService
        this.settingInitializationService = settingInitializationService
        this.databaseInitializationService = databaseInitializationService
        this.fileSystemInitializationService = fileSystemInitializationService
        this.linkingService = linkingService
    }

    async execute() {
        //Creates tables, updates old tables to current schema
        await this.databaseInitializationService.execute()

        //Get settings, reset the ones are not found.
        const settings = await this.settingInitializationService.execute()

        //Initialize bluetooth module
        await this.multimeterInitializationService.execute()

        let [{ isLoaded, syncTime, name, fileName, isCloud }, { isSigned, userName }, initialUrl] = await Promise.all([
            this.currentSurveyStatusService.execute(),
            this.authorizationService.checkSignInStatus(),
            this.linkingService.getInitialUrl(),
            this.defaultNamesInitializationService.execute(),
            this.fileSystemInitializationService.execute(),

        ])
        if (isLoaded)
            await this.surveyRepo.clearEmptyValues()
        if (initialUrl !== null)
            try {
                const loaded = await this.openExternalSurveyService.execute(initialUrl, isLoaded)
                syncTime = loaded.syncTime ?? syncTime
                name = loaded.name ?? name
                fileName = loaded.fileName ?? fileName
                isCloud = loaded.isCloud ?? isCloud
                isLoaded = loaded.isLoaded ?? isLoaded
            }
            catch (er) {
                console.log(er)
            }


        if (!isSigned) {
            const session = await this.authorizationService.signInSilently()
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
            onboarding: settings.onboarding,
            multimeter: settings.multimeter,
        }
    }
}