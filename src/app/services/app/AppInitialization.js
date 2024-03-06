import { SubscriptionStatuses } from "../../../constants/global"


export class AppInitialization {
    constructor(currentSurveyStatusService, authorizationService, surveyRepo, multimeterInitializationService, defaultNamesInitializationService, settingRepo, settingInitializationService, databaseInitializationService, fileSystemInitializationService, linkingService, purchaseInitializationService, urlResolver) {
        this.currentSurveyStatusService = currentSurveyStatusService
        this.authorizationService = authorizationService
        this.surveyRepo = surveyRepo
        this.multimeterInitializationService = multimeterInitializationService
        this.defaultNamesInitializationService = defaultNamesInitializationService
        this.settingRepo = settingRepo
        this.settingInitializationService = settingInitializationService
        this.databaseInitializationService = databaseInitializationService
        this.fileSystemInitializationService = fileSystemInitializationService
        this.linkingService = linkingService
        this.purchaseInitializationService = purchaseInitializationService
        this.urlResolver = urlResolver
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

        let urlType
        let link
        if (initialUrl !== null) {
            await this.urlResolver.execute(initialUrl, () => { }, () => { }, (loaded) => {
                console.log(loaded)
                syncTime = loaded.syncTime ?? syncTime
                name = loaded.name ?? name
                fileName = loaded.fileName ?? fileName
                isCloud = loaded.isCloud ?? isCloud
                isLoaded = loaded.isLoaded ?? isLoaded
                uid = loaded.uid ?? uid
                urlType = loaded.urlType
                link = loaded.link
            })
        }

        if (!isSigned) {
            const session = await this.authorizationService.signInSilently()
            isSigned = session.isSigned
            userName = session.userName
        }

        return {
            isLoaded,
            urlType,
            link,
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