import { Error, errors } from "../../../utils/Error"

export class LoadSurvey {
    constructor(jsonImportService, jsonAdvancedImportService, readSurveyFileService, settingRepo, surveyLoadStatusService, warningHandler) {
        this.jsonImportService = jsonImportService
        this.settingRepo = settingRepo
        this.jsonAdvancedImportService = jsonAdvancedImportService
        this.readSurveyFileService = readSurveyFileService
        this.surveyLoadStatusService = surveyLoadStatusService
        this.warningHandler = warningHandler
    }

    async execute(fileId, onDownload) {
        //fileId - is path in case of local survey, cloudId in case of cloud survey, instance of ExternalFile in case of external survey

        // 1. Checking isLoaded. If there is already survey loaded returning its value instead of ovewriting database
        const loaded = await this.surveyLoadStatusService.execute()
        if (!loaded.isLoaded) {

            //2. Reading file and importing Json
            const { hash, cloudId, isCloud, isNew, fileName, name, uid } = await this._importJson(fileId, onDownload)
            const syncTime = isNew ? null : Date.now()

            //3. Updating settings with new meta data
            await this.settingRepo.updateSurveySettings({ isSurveyNew: Number(isNew), isCloud: Number(isCloud), originalHash: hash, fileName: fileName, cloudId: cloudId, lastSync: syncTime })
            return {
                name,
                uid,
                fileName,
                syncTime,
                isCloud,
                isLoaded: true
            }
        }
        else {
            const { name, fileName, syncTime, isCloud, uid } = loaded
            return { name, fileName, syncTime, isCloud, isLoaded: true, uid }
        }
    }

    async _importJson(fileId, onDownload) {
        //1. Read file from different sources and get surveyFile and info
        const { surveyFile, hash, cloudId, isCloud, isNew, fileName, isRecovered } = await this.readSurveyFileService.execute(fileId, onDownload)
        try {
            //2. Attemt to fast-import file (faster, but fails if even one error is found)
            await this.jsonImportService.execute(surveyFile)
            return { hash, cloudId, isCloud, isNew, fileName, name: surveyFile.survey.name, uid: surveyFile.survey.uid }
        }
        catch (er) {
            //3. If fast import rejected, passing file down to advanced import (slower, but able to import only valid values, and discard invalid)
            //If survey was recovered during validation, ignoring conformation from user, since he already agreed
            const confirm = isRecovered ? true : await this.warningHandler.execute('Survey file is corrupted. Opening this file may erase some of its content. If you encountered lost data after opening, use "Exit without saving" feature in Settings to avoid original file to be ovewritten. Contact support for help with recovering data.',
                'Proceed',
                'Cancel')
            if (confirm) {
                try {
                    await this.jsonAdvancedImportService.execute(surveyFile)
                    return { hash, cloudId, isCloud, isNew, fileName, name: surveyFile.survey.name, uid: surveyFile.survey.uid }
                }
                catch (er) {
                    throw new Error(errors.GENERAL, 'Unable to load survey file', er, 411)
                }
            }
            //4.Return 101 status if recovery wasnt confirmed
            else throw new Error(errors.GENERAL, 'Loading was cancelled', 'Loading cancelled', 101)
        }
    }
}