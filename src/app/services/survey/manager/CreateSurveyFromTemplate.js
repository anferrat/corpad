import { Error, errors } from "../../../utils/Error"
import { guid } from "../../../utils/guid"

export class CreateSurveyFromTemplate {
    constructor(fileSystemRepo, validation, jsonImportService, surveyFileConverter, surveyLoadStatusService) {
        this.fileSystemRepo = fileSystemRepo
        this.validation = validation
        this.jsonImportService = jsonImportService
        this.surveyFileConverter = surveyFileConverter
        this.surveyLoadStatusService = surveyLoadStatusService
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
                const version = this.validation.getVersion(file)
                const surveyFile = this.surveyFileConverter.execute(file, version)
                //5. Reset surveyFile (potential values, statuses and some subitem values will be reset to null, new survey uid is assigned)
                const newSurveyUid = guid()
                surveyFile.resetValues(newSurveyUid)
                //6. Import to database with fast method.
                await this.jsonImportService.execute(surveyFile)
                return {
                    name,
                    fileName: null,
                    syncTime: null,
                    isCloud,
                    uid: newSurveyUid
                }
            }
        }
        else {
            const { name, fileName, syncTime, isCloud, uid } = isLoaded
            return { name, fileName, syncTime, isCloud, uid }
        }
    }
}