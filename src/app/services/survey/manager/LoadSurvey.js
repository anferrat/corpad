import { Error, errors } from "../../../utils/Error"

export class LoadSurvey {
    constructor(jsonImportService, jsonAdvancedImportService, readSurveyFileService, validation, surveyRepo, settingRepo, surveyFileConverter, surveyLoadStatusService, warningHandler) {
        this.jsonImportService = jsonImportService
        this.surveyRepo = surveyRepo
        this.settingRepo = settingRepo
        this.jsonAdvancedImportService = jsonAdvancedImportService
        this.readSurveyFileService = readSurveyFileService
        this.validation = validation
        this.surveyFileConverter = surveyFileConverter
        this.surveyLoadStatusService = surveyLoadStatusService
        this.warningHandler = warningHandler
    }

    async execute(fileId) {
        //fileId - is path in case of local survey, and cloudId in case of cloud survey

        // 1. Checking isLoaded. If there is already survey loaded returning its value instead of ovewriting database
        const loaded = await this.surveyLoadStatusService.execute()
        if (!loaded.isLoaded) {

            //2. Reading file and importing Json
            const { hash, cloudId, isCloud, isNew, fileName } = await this._importJson(fileId)
            const syncTime = isNew ? null : Date.now()

            //3. Updating settings with new meta data, getting name to update state, returning results
            const [{ name }] = await Promise.all([
                this.surveyRepo.getSurvey(),
                this.settingRepo.updateSurveySettings({ isSurveyNew: Number(isNew), isCloud: Number(isCloud), originalHash: hash, fileName: fileName, cloudId: cloudId, lastSync: syncTime })
            ])
            return {
                name,
                fileName,
                syncTime,
                isCloud,
                isLoaded: true
            }
        }
        else {
            const { name, fileName, syncTime, isCloud } = loaded
            return { name, fileName, syncTime, isCloud, isLoaded: true }
        }
    }

    async _importJson(fileId) {
        //1. Read file from different sources and get file info
        const { file, hash, cloudId, isCloud, isNew, fileName } = await this.readSurveyFileService.execute(fileId)

        //2. Validate file, if some data does not match schema, then corrupted flag will return true
        const { valid, corrupted } = this.validation.validateFile(file)
        if (valid && !corrupted) {
            try {
                //3. Attempting to convert to surveyFile
                const surveyFile = this.surveyFileConverter.execute(file)
                //4. Attemt to fast-import file
                await this.jsonImportService.execute(surveyFile)
                return { hash, cloudId, isCloud, isNew, fileName }
            }
            catch (er) {
                //5. If fast import rejected, passing file down to advanced import
                return await this._hardImport({ file, hash, cloudId, isCloud, isNew, fileName }, true)
            }
        }
        //5. If file corrupted, passing it down to advanced import, if invalid throwing Error
        else if (!valid)
            throw new Error(errors.GENERAL, 'This file is not supported', 'Validation failed', 411)
        else
            return await this._hardImport({ file, hash, cloudId, isCloud, isNew, fileName }, false)
    }


    async _hardImport({ file, hash, cloudId, isCloud, isNew, fileName }, confirmed = false) {
        //1. Get confirmation on file recovery (Some data will be filtered out after recovery)
        const confirm = !confirmed ? await this.warningHandler.execute(
            'Survey file is corrupted. Opening this file may erase some of its content. If you encountered lost data after opening, use "Exit without saving" feature in Settings to avoid original file to be ovewritten. Contact support for help with recovering data.',
            'Proceed',
            'Cancel') : confirmed
        if (confirm) {
            try {
                //2. Recover file, clear unwanted data
                const recoveredFile = this.validation.recoverFile(file)
                //3. Convert recovered file
                const surveyFile = this.surveyFileConverter.execute(recoveredFile)
                //4. Import with advanced service (slow, ignores incorrect references)

                await this.jsonAdvancedImportService.execute(surveyFile)
                return { hash, cloudId, isCloud, isNew, fileName }
            }
            catch (er) {
                throw new Error(errors.GENERAL, 'Unable to load survey file', er, 411)
            }
        }
        //Return 101 status if recovery wasnt confirmed
        else throw new Error(errors.GENERAL, 'Loading was cancelled', 'Loading cancelled', 101)
    }
}