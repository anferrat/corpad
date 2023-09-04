import { ExternalFileTypes } from "../../../constants/global"
import { ExternalFile } from "../../entities/survey/other/ExternalFile"

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

        //Initialize bluetooth module, only if onboarding is not displayed, otherwise initialize it after onboarding update. (No notification should be displayed during onboarding)
        if (!settings.onboarding.main)
            await this.multimeterInitializationService.execute()

        let [{ isLoaded, syncTime, name, fileName, isCloud, uid }, { isSigned, userName }, initialUrl] = await Promise.all([
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
                const file = new ExternalFile(initialUrl)
                const fileType = file.getFileType()
                if (fileType === ExternalFileTypes.SURVEY_WITH_ASSETS || ExternalFileTypes.SURVEY) {
                    const loaded = await this.openExternalSurveyService.execute(file, isLoaded)
                    syncTime = loaded.syncTime ?? syncTime
                    name = loaded.name ?? name
                    fileName = loaded.fileName ?? fileName
                    isCloud = loaded.isCloud ?? isCloud
                    isLoaded = loaded.isLoaded ?? isLoaded
                    uid = loaded.uid ?? uid
                }
            }
            catch (er) {
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
            uid: uid,
            fileName: fileName ?? null,
            isCloud: isCloud ?? null,
            isSigned,
            userName,
            onboarding: settings.onboarding,
            multimeter: settings.multimeter,
        }
    }
}