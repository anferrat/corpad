import { SurveyFile } from "../../entities/survey/other/SurveyFile"
import { Error, errors } from "../../utils/Error"
import { SQLiteRepository } from "../../utils/SQLite"

export class SurveyFileRepo extends SQLiteRepository {
    //stores survey file metadata
    constructor() {
        super()
    }

    async getList(isCloud) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT * FROM surveyFiles WHERE isCloud=?', [isCloud])
            return super.generateArray(result.rows.length, result.rows.item).map(({ uid, name, filename, cloudId, path, hash, isCloud, timeModified, assetCount, tpCount, rtCount, plCount, successRate }) =>
                new SurveyFile(uid, filename, isCloud, hash, path, cloudId, timeModified, name, tpCount, plCount, rtCount, successRate, assetCount))
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get survey file list', er)
        }
    }

    updateList(surveyFileList, isCloud) {
        try {
            return this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'DELETE FROM surveyFiles WHERE isCloud=?', [isCloud]),
                surveyFileList.length > 0 ?
                    this.runQuery(tx, `INSERT INTO surveyFiles (uid, name, filename, cloudId, path, hash, isCloud, timeModified, assetCount, tpCount, rtCount, plCount, successRate) VALUES 
            ${surveyFileList.map(() => `(?,?,?,?,?,?,?,?,?,?,?,?,?)`).join(', ')}`,
                        surveyFileList.map(({ uid, name, filename, cloudId, path, hash, timeModified, assetCount, tpCount, rtCount, plCount, successRate }) => ([
                            uid, name, filename, cloudId, path, hash, isCloud, timeModified, assetCount, tpCount, rtCount, plCount, successRate
                        ])).flat()) : null
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update survey list', er)
        }
    }
}