import { FileSystemLocations } from "../../../../constants/global"
import { SurveyFile } from "../../../entities/survey/other/SurveyFile"

export class GetSurveyFileList {
    constructor(fileSystemRepo, surveyFileListPresenter, getSurveyFileMetaDataService, surveyFileRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
        this.surveyFileRepo = surveyFileRepo
        this.getSurveyFileMetaDataService = getSurveyFileMetaDataService
    }


    _getFileList(surveyFiles, files) {
        const surveyFileMap = new Map(surveyFiles.map((surveyFile) => ([surveyFile.path, surveyFile])))
        return Promise.all(files.map(async ({ path, timeModified, filename }) => {
            const surveyFile = surveyFileMap.get(path)
            if (surveyFile && timeModified === surveyFile.timeModified)
                return surveyFile
            else
                return await this._getSurveyFile(path, filename)
        }))
    }

    async _getSurveyFile(path, filename) {
        try {
            const [file, hash, stat] = await Promise.all([
                this.fileSystemRepo.readFile(path),
                this.fileSystemRepo.getHash(path),
                this.fileSystemRepo.getStat(path)
            ])
            const surveyObject = JSON.parse(file)
            const timeModified = stat.mtime.getTime()
            const { name, tpCount, rtCount, plCount, successRate, uid, assetCount } = this.getSurveyFileMetaDataService.execute(surveyObject)
            const surveyFile = new SurveyFile(uid, filename, false, hash, path, null, timeModified, name, tpCount, plCount, rtCount, successRate, assetCount)
            return this.surveyFileListPresenter.execute(surveyFile)
        }
        catch (er) {
            return null
        }
    }

    async execute() {
        const [files, surveyFiles] = await Promise.all([
            this.fileSystemRepo.readDir(FileSystemLocations.SURVEYS),
            this.surveyFileRepo.getList(false)
        ])
        const surveys = files
            .filter(item => item.filename.endsWith('.json') && item.isFile)

        const surveyFileList = (await this._getFileList(surveyFiles, surveys))
            .filter(surveyFile => surveyFile)
            .sort((a, b) => b.timeModified - a.timeModified)
        await this.surveyFileRepo.updateList(surveyFileList, false)
        return this.surveyFileListPresenter.executeForList(surveyFileList)
    }
}