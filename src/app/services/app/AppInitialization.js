import { ExternalFileTypes, SubscriptionStatuses } from "../../../constants/global"
import { fileListener } from "../../config/fileListener"
import { ExternalFile } from "../../entities/survey/other/ExternalFile"

export class AppInitialization {
    constructor(currentSurveyStatusService, authorizationService, surveyRepo, multimeterInitializationService, defaultNamesInitializationService, settingRepo, openExternalSurveyService, settingInitializationService, databaseInitializationService, fileSystemInitializationService, linkingService, externalFileContentResolver, purchaseInitializationService, urlFileAccess) {
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
        this.externalFileContentResolver = externalFileContentResolver
        this.purchaseInitializationService = purchaseInitializationService
        this.urlFileAccess = urlFileAccess
    }

    async execute() {
        //Creates tables, updates old tables to current schema
        await this.databaseInitializationService.execute()

        //Get settings, reset the ones are not found.
        const settings = await this.settingInitializationService.execute()

        //Initialize bluetooth module, only if onboarding is not displayed, otherwise initialize it after onboarding update. (No notification should be displayed during onboarding)

        let [{ isLoaded, syncTime, name, fileName, isCloud, uid }, { isSigned, userName }, initialUrl, { status, expirationTime }] = await Promise.all([
            this.currentSurveyStatusService.execute(),
            this.authorizationService.checkSignInStatus(),
            this.linkingService.getInitialUrl(),
            this.purchaseInitializationService.execute(),
            this.defaultNamesInitializationService.execute(),
            this.fileSystemInitializationService.execute(),
        ])


        if (!settings.onboarding.main) {
            const autoConnect = status === SubscriptionStatuses.GRANTED || status === SubscriptionStatuses.UNKNOWN_GRANTED
            await this.multimeterInitializationService.execute(autoConnect)
        }


        if (isLoaded)
            await this.surveyRepo.clearEmptyValues()

        if (initialUrl !== null) {
            fileListener.inProgress = true
            try {
                await this.urlFileAccess.requestAccess(initialUrl)
                const file = await this.externalFileContentResolver.execute(initialUrl)
                if (file.fileType === ExternalFileTypes.SURVEY_WITH_ASSETS || file.fileType === ExternalFileTypes.SURVEY) {
                    const loaded = await this.openExternalSurveyService.execute(file, isLoaded)
                    syncTime = loaded.syncTime ?? syncTime
                    name = loaded.name ?? name
                    fileName = loaded.fileName ?? fileName
                    isCloud = loaded.isCloud ?? isCloud
                    isLoaded = loaded.isLoaded ?? isLoaded
                    uid = loaded.uid ?? uid
                }
                await this.urlFileAccess.revokeAccess(initialUrl)
            }
            catch (er) {
                try {
                    await this.urlFileAccess.revokeAccess()
                }
                catch { }
            }
            fileListener.inProgress = false
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
            subscriptionStatus: status,
            subscriptionExpirationTime: expirationTime
        }
    }
}