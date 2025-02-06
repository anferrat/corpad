import { SubscriptionStatuses } from "../../../constants/global"


export class AppInitialization {
    constructor(currentSurveyStatusService, authorizationService, surveyRepo, multimeterInitializationService, defaultNamesInitializationService, settingRepo, settingInitializationService, databaseInitializationService, fileSystemInitializationService, linkingService, purchaseInitializationService, urlResolver, potentialTypeInitialization) {
        this.currentSurveyStatusService = currentSurveyStatusService
        this.authorizationService = authorizationService
        this.surveyRepo = surveyRepo
        this.multimeterInitializationService = multimeterInitializationService
        this.defaultNamesInitializationService = defaultNamesInitializationService
        this.potentialTypeInitialization = potentialTypeInitialization
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



        let [{ isLoaded, syncTime, name, fileName, isCloud, uid }, { isSigned, userName }, initialUrl, { status, expirationTime, managmentUrl }] = await Promise.all([
            this.currentSurveyStatusService.execute(),
            this.authorizationService.checkSignInStatus(),
            this.linkingService.getInitialUrl(),
            this.purchaseInitializationService.execute(),
            this.defaultNamesInitializationService.execute(),
            this.fileSystemInitializationService.execute(),
        ])

        //Initialize bluetooth module, only if there is a paired multimeter, otherwise initialize later in settings when trying to scan for mutimeter
        const initializeBleOnLaunch = settings.multimeter.peripheralId !== null

        if (initializeBleOnLaunch) {
            const autoConnect = status === SubscriptionStatuses.GRANTED || status === SubscriptionStatuses.UNKNOWN_GRANTED
            await this.multimeterInitializationService.execute(autoConnect)
        }


        if (isLoaded)
            await Promise.all([
                this.surveyRepo.clearEmptyValues(),
                this.potentialTypeInitialization.execute()
            ])

        let urlType
        let link
        if (initialUrl !== null) {
            await this.urlResolver.execute(initialUrl, () => { }, () => { }, (loaded) => {
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
            syncTime: syncTime ?? null, //refers to survey, not actuall UTC time sync
            name: name ?? null,
            uid: uid,
            fileName: fileName ?? null,
            isCloud: isCloud ?? null,
            isSigned,
            userName,
            onboarding: settings.onboarding,
            multimeter: settings.multimeter,
            subscriptionStatus: status,
            subscriptionExpirationTime: expirationTime,
            managmentUrl,
            bleInitialized: initializeBleOnLaunch
        }
    }
}