import { FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"
import { guid } from "../../../utils/guid"

export class CopySurveyFileToCloud {
    constructor(cloudFileSystemRepo, fileSystemRepo, networkRepo, convertFileToSurveyService, surveyToFileConverterOutput, uploadAssetsService) {
        this.fileSystemRepo = fileSystemRepo
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
        this.convertFileToSurveyService = convertFileToSurveyService
        this.surveyToFileConverterOutput = surveyToFileConverterOutput
        this.uploadAssetsService = uploadAssetsService
    }

    _getContent(file) {
        try {
            return JSON.parse(file)
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to parse file', er)
        }
    }

    async _copyAssets(oldUid, newUid, onUpload) {
        //1. Upload all assets from local to cloud
        const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, oldUid)
        await this.uploadAssetsService.execute(localAssetFiles, newUid, ({ total, current }) => onUpload ? onUpload(total, current + 1) : null)
        //2. Copy all assets to local asset folder with new uid. Avoids downloading files in future when accessing cloud file 
        try {
            const newLocalAssetPath = await this.fileSystemRepo.getLocation(FileSystemLocations.ASSETS, newUid)
            await this.fileSystemRepo.copyFiles(newLocalAssetPath, localAssetFiles)
        }
        catch (er) {
            //Don't throw erros if unable to copy, since upload is completed
        }
    }



    async execute(path, onUpload) {
        //1. Check if internet is on
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            //2. Get file name from the path
            const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
            //3. Read raw text from path
            const file = await this.fileSystemRepo.readFile(path)
            //4. Parse to JSON object
            const surveyObject = this._getContent(file)
            //5. Generate SurveyFile instance from JSON
            const { surveyFile } = await this.convertFileToSurveyService.execute(surveyObject)
            const oldUid = surveyFile.survey.uid
            const newUid = guid()
            //6. Assign new uid for survey
            surveyFile.survey.reset(newUid)
            //7. Convert SurveyFile instance to an object and text
            const content = JSON.stringify(this.surveyToFileConverterOutput.execute(surveyFile))
            //8. Write text file to cloud
            await this.cloudFileSystemRepo.createFile(fileName, content)
            //9. Copy assets 
            await this._copyAssets(oldUid, newUid, onUpload)
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }

}