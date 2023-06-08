import { MultimeterInitialization } from "../survey/other/multimeter/MultimeterInitialization"

export class AppInitialization {
    constructor(currentSurveyStatusService, networkService, authorizationService, surveyRepo, bluetoothRepo, defaultNamesInitializationService, settingRepo, openExternalSurveyService, settingInitializationService, databaseInitializationService) {
        this.currentSurveyStatusService = currentSurveyStatusService
        this.networkService = networkService
        this.authorizationService = authorizationService
        this.surveyRepo = surveyRepo
        this.multimeterInitializationService = new MultimeterInitialization(bluetoothRepo, settingRepo)
        this.defaultNamesInitializationService = defaultNamesInitializationService
        this.settingRepo = settingRepo
        this.openExternalSurveyService = openExternalSurveyService
        this.settingInitializationService = settingInitializationService
        this.databaseInitializationService = databaseInitializationService
    }

    async execute(initialUrl) {
        //Creates tables, updates old tables to current schema
        await this.databaseInitializationService.execute()

        //Get settings, reset the ones are not found.
        const settings = await this.settingInitializationService.execute()

        //Initialize bluetooth module
        await this.multimeterInitializationService.execute()

        let [{ isLoaded, syncTime, name, fileName, isCloud }, isInternetOn, { isSigned, userName }] = await Promise.all([
            this.currentSurveyStatusService.execute(),
            this.networkService.checkConnection(),
            this.authorizationService.checkSignInStatus(),
            this.defaultNamesInitializationService.execute(),
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
            onboarding: settings.onboarding,
            multimeter: settings.multimeter,
        }
    }
}