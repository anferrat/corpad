import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { AppSettings } from "../../entities/survey/other/Settings"
import { Onboarding } from "../../entities/survey/other/Onboarding"

export class SettingRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'settings'
    }

    async get() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from settings LIMIT 1`)
            if (result.rows.length === 0)
                return {}
            else {
                const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding } = result.rows.item(0)
                const { versionOnboarding, editTestPoint, editReferenceCell, map, potentialTypes, editBond, main } = JSON.parse(onboarding)
                const onboard = new Onboarding(versionOnboarding, editTestPoint, editReferenceCell, map, potentialTypes, editBond, main)
                return new AppSettings(Boolean(pipelineNameAsDefault), defaultPotentialUnit, Boolean(autoCreatePotentials), Boolean(isSurveyNew), Boolean(isCloud), originalHash, fileName, cloudId, lastSync, onboard)
            }
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to get app settings`, er)
        }
    }

    async updateSurveySettings(settings) {
        const { isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync } = settings
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET isSurveyNew=?, isCloud=?, originalHash=?, fileName=?, cloudId=?, lastSync=?`, [isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync])
            if (result.rowsAffeted === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updateAutoCreatePotentials(autoCreate) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET autoCreatePotentials = ?`, [autoCreate])
            if (result.rowsAffeted === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updatePotentialUnit(unit) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET defaultPotentialUnit = ?`, [unit])
            if (result.rowsAffeted === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updatePipelineNameAsDefault(pipelineNameAsDefault) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET pipelineNameAsDefault = ?`, [pipelineNameAsDefault])
            if (result.rowsAffeted === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updateOnboarding(onboarding) {
        try {
            const value = JSON.stringify(onboarding)
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET onboarding = ?`, [value])
            if (result.rowsAffeted === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async update(settings) {
        try {
            const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding } = settings
            const onboardingValue = JSON.stringify(onboarding)
            await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE FROM ${this.tableName}`, []),
                this.runQuery(tx, `INSERT INTO settings (pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, onboarding, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                    [pipelineNameAsDefault, defaultPotentialUnit, Boolean(autoCreatePotentials), onboardingValue, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync])
            ])

            return settings
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to reset app settings`, er)
        }
    }
}
