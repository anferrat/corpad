import { SurveyFile } from "../../../entities/survey/other/SurveyFile"

export class GetCloudSurveyFileList {
    constructor(cloudFileSystemRepo, surveyFileListPresenter, networkRepo, getSurveyFileMetaDataService, surveyFileRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
        this.networkRepo = networkRepo
        this.getSurveyFileMetaDataService = getSurveyFileMetaDataService
        this.surveyFileRepo = surveyFileRepo
    }

    async _getSurveyFiles(surveyFiles, files) {
        const surveyFileMap = new Map(surveyFiles.map((surveyFile) => ([surveyFile.cloudId, surveyFile])))
        return Promise.all(files.map(async ({ name, cloudId, timeModified }) => {
            const surveyFile = surveyFileMap.get(cloudId)
            if (surveyFile && timeModified === surveyFile.timeModified)
                return surveyFile
            else
                return await this._getSurveyFile(cloudId, timeModified, name)
        }))
    }

    async _getSurveyFile(cloudId, timeModified, filename) {
        try {
            const { file } = await this.cloudFileSystemRepo.readFile(cloudId)
            const { name, tpCount, rtCount, plCount, successRate, uid, assetCount } = this.getSurveyFileMetaDataService.execute(file)
            const surveyFile = new SurveyFile(uid, filename, true, null, null, cloudId, timeModified, name, tpCount, plCount, rtCount, successRate, assetCount)
            return this.surveyFileListPresenter.execute(surveyFile)
        }
        catch (er) {
            return null
        }
    }

    async execute() {
        await this.networkRepo.isInternetOnCheck()
        const [files, surveyFiles] = await Promise.all([
            this.cloudFileSystemRepo.readAppFolder(),
            this.surveyFileRepo.getList(true)
        ])
        const filteredFiles = files
            .filter(({ name }) => name.endsWith('.json'))

        const surveyFileList = (await this._getSurveyFiles(surveyFiles, filteredFiles))
            .filter(surveyFile => surveyFile)
            .sort((a, b) => b.timeModified - a.timeModified)
        await this.surveyFileRepo.updateList(surveyFileList, true)
        return this.surveyFileListPresenter.executeForList(surveyFileList)
    }
}
