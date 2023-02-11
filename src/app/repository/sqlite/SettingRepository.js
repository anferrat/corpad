import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { AppSettings } from "../../entities/survey/other/Settings"
import { defaultSettings } from "../../entities/survey/other/Settings"

export class SettingRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'settings'
    }

    async get() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from settings LIMIT 1`)
            const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding } = result.rows.item(0)
            return new AppSettings(pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding)
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to get app settings`, er)
        }
    }

    async update(settings) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE ${this.tableName} SET ${settings.updated.map(key => `${key} = ?`).join(', ')}`, settings.updated.map(key => settings[key]))
            if (result.rowsAffeted === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to update settings`, er)
        }
    }

    async reset() {
        try {
            const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding } = defaultSettings
            await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE * FROM ${this.tableName}`, []),
                this.runQuery(`INSERT INTO settings (pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, onboarding, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                    [pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, onboarding, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync])
            ])
            return defaultSettings
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to reset app settings`, er)
        }
    }
}
