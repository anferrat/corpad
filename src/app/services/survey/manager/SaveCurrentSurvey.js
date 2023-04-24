import { errors } from "../../../utils/Error"

export class SaveCurrentSurvey {
    constructor(surveyJsonExportService, surveyFileConverter, settingRepo, surveyRepo, saveSurveyToFileService, saveSurveyToCloudFileService, warningHandler) {
        this.surveyJsonExportService = surveyJsonExportService
        this.surveyFileConverter = surveyFileConverter
        this.settingRepo = settingRepo
        this.surveyRepo = surveyRepo
        this.saveSurveyToFileService = saveSurveyToFileService
        this.saveSurveyToCloudFileService = saveSurveyToCloudFileService
        this.warningHandler = warningHandler
    }

    async execute() {
        const [surveyFile, { isSurveyNew, cloudId, isCloud, originalHash, fileName }, { name }] = await Promise.all([
            this.surveyJsonExportService.execute(),
            this.settingRepo.get(),
            this.surveyRepo.getSurvey()
        ])

        const syncTime = Date.now()

        //Generate new file name if survey is new, and fileName does not exist
        const surveyFileName = isSurveyNew ? `${name}.json` : fileName

        //Convert surveyFile object to v1 format (by default)
        const file = this.surveyFileConverter.execute(surveyFile)

        //Convert to string to write to file
        const content = JSON.stringify(file)

        //Write to file using correct service
        const saved = !isCloud ?
            await this.saveSurveyToFileService.execute(content, surveyFileName, isSurveyNew, originalHash)
            :
            await this._saveCloudSurvey(content, surveyFileName, isSurveyNew, cloudId)

        //savedAsLocal shows if cloud survey was converted to local. If so, updates isCloud setting
        const { savedAsLocal } = saved

        //Update settings 
        await this.settingRepo.updateSurveySettings({ isSurveyNew: 0, cloudId: saved.cloudId, lastSync: syncTime, fileName: saved.fileName, originalHash: saved.hash, isCloud: !savedAsLocal && isCloud })

        return {
            fileName: saved.fileName,
            isCloud: isCloud,
            syncTime: syncTime,
            cloudId: saved.cloudId
        }
    }

    async _saveCloudSurvey(content, fileName, isSurveyNew, cloudId) {
        try {
            //Attempt to save survey to cloud
            return {
                ...(await this.saveSurveyToCloudFileService.execute(content, fileName, isSurveyNew, cloudId)),
                savedAsLocal: false
            }
        }
        catch (er) {
            //if fails, prompt to save survey locally
            const saveAsLocal = await this.warningHandler.execute(`Unable to save survey to cloud drive. It may happen because you have don't have internet connection or are signed out of you account. You try again later, or save a copy of the survey to the device instead.`,
                'Save copy to the device', 'Try later')
            if (saveAsLocal)
                //if accepted, use local saveSurvey service to write
                return {
                    ...(await this.saveSurveyToFileService.execute(content, fileName, true, null)),
                    savedAsLocal: true
                }
            //if declined throw 101 status
            else throw new Error(errors.GENERAL, 'Cloud survey export was cancelled', 'Saving cancelled', 101)
        }
    }
}