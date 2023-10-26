import { Error, errors } from "../../../utils/Error"

export class CreateSurveyFromTemplate {
    constructor(fileSystemRepo, validation, jsonImportService, surveyFileConverter, surveyLoadStatusService, settingRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.validation = validation
        this.jsonImportService = jsonImportService
        this.surveyFileConverter = surveyFileConverter
        this.surveyLoadStatusService = surveyLoadStatusService
        this.settingRepo = settingRepo
    }

    async execute(name, isCloud, path) {
        const isLoaded = await this.surveyLoadStatusService.execute()
        // 1. Checking isLoaded. If there is already survey loaded returning its value instead of ovewriting database
        if (!isLoaded.isLoaded) {
            //2. Read file from local file system
            const content = await this.fileSystemRepo.readFile(path)
            const file = JSON.parse(content)
            const { valid, corrupted } = this.validation.validateFile(file)
            if (!valid || corrupted)
                //3. If local file invalid or corrupted(partially invalid) - throw error
                throw new Error(errors.VALIDATION, 'Survey file corrupted, unable to use it as template', 'Corrupted survey file', 413)
            else {
                //4. Convert to surveyFile
                const surveyFile = this.surveyFileConverter.execute(file)
                //5. Reset surveyFile (potential values, statuses and some subitem values will be reset to null)
                surveyFile.resetValues()
                //6. Import to database with fast method.
                await this.jsonImportService.execute(surveyFile)
                await this.settingRepo.updateSurveySettings({ isSurveyNew: 1, isCloud, originalHash: null, fileName: null, cloudId: null, lastSync: null })
                return {
                    name,
                    fileName: null,
                    syncTime: null,
                    isCloud
                }
            }
        }
        else {
            const { name, fileName, syncTime, isCloud } = isLoaded
            return { name, fileName, syncTime, isCloud }
        }
    }
}