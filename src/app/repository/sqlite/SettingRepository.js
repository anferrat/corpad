import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { AppSettings } from "../../entities/survey/other/Settings"
import { Onboarding } from "../../entities/survey/other/Onboarding"
import { MultimeterSettings } from "../../entities/survey/other/MultimeterSettings"

export class SettingRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'settings'
    }

    async _getConfig() {
        //config is a new table for storing key/value pair. new settings params are stored here and not in the settings table, because it needs to be altered. bad design...
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, value FROM config`)
            if (result.rows.length > 0)
                return Object.fromEntries(super.generateArray(result.rows.length, result.rows.item))
            else return {}
        }
        catch (er) {
            return {}
        }
    }

    async _setConfig(isCalculatorDisplayed) {
        await super.runMultiQueryTransaction(tx => [
            super.runQuery(tx, 'DELETE FROM config WHERE id="isCalculatorDisplayed"'),
            super.runQuery(tx, 'INSERT INTO config (id, value) VALUES ("isCalculatorDisplayed", ?)', [isCalculatorDisplayed])
        ])
    }

    async get() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from settings LIMIT 1`)
            if (result.rows.length === 0)
                return {}
            else {
                const { isCalculatorDisplayed } = await this._getConfig()
                const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding, multimeter } = result.rows.item(0)
                const { versionOnboarding, editTestPoint, editReferenceCell, map, potentialTypes, editBond, main } = JSON.parse(onboarding ?? '{}')
                const onboard = onboarding ? new Onboarding(versionOnboarding, editTestPoint, editReferenceCell, map, potentialTypes, editBond, main) : undefined
                const { peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, offDelay, onSetup, captureRate } = JSON.parse(multimeter ?? '{}')
                const multimeterSettings = multimeter ? new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, offDelay, onSetup, captureRate) : undefined
                return new AppSettings(Boolean(pipelineNameAsDefault), defaultPotentialUnit, Boolean(autoCreatePotentials), Boolean(isSurveyNew), Boolean(isCloud), originalHash, fileName, cloudId, lastSync, onboard, multimeterSettings, isCalculatorDisplayed)
            }
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to get app settings`, er)
        }
    }

    async updateOfflineCount(count) {
        try {
            await this.runSingleQueryTransaction('SELECT id, value FROM config WHERE id="offlineCount"')
            super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, 'DELETE FROM config WHERE id="offlineCount"'),
                super.runQuery(tx, 'INSERT INTO config (id, value) VALUES ("offlineCount", ?)', [count])
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update offline count', er)
        }
    }

    async getOfflineCount() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, value FROM config WHERE id="offlineCount"')
            if (result.rows.length === 0)
                return 0
            else return Number(result.rows.item(0).value)
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get offline count', er)
        }
    }

    async updateSurveySettings(settings) {
        const { isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync } = settings
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET isSurveyNew=?, isCloud=?, originalHash=?, fileName=?, cloudId=?, lastSync=?`, [isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync])
            if (result.rowsAffected === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updateAutoCreatePotentials(autoCreate) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET autoCreatePotentials = ?`, [autoCreate])
            if (result.rowsAffected === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updatePotentialUnit(unit) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET defaultPotentialUnit = ?`, [unit])
            if (result.rowsAffected === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updatePipelineNameAsDefault(pipelineNameAsDefault) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET pipelineNameAsDefault = ?`, [pipelineNameAsDefault])
            if (result.rowsAffected === 0)
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
            if (result.c === 0)
                throw 'Settings were not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update settings`, er)
        }
    }

    async updateMultimeter(multimeter) {
        try {
            const value = JSON.stringify(multimeter)
            const result = await super.runSingleQueryTransaction(`UPDATE settings SET multimeter = ?`, [value])
            if (result.rowsAffected === 0)
                throw 'Not updated setting'
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update multimeter setting', er)
        }
    }

    async updateIsCalculatorDisplayed(isCalculatorDisplayed) {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, 'DELETE FROM config WHERE id="isCalculatorDisplayed"'),
                super.runQuery(tx, 'INSERT INTO config (id, value) VALUES ("isCalculatorDisplayed", ?)', [isCalculatorDisplayed])
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update display calculator setting', er)
        }
    }

    async update(settings) {
        try {
            const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding, multimeter, isCalculatorDisplayed } = settings
            const onboardingValue = JSON.stringify(onboarding)
            const multimeterValue = JSON.stringify(multimeter)
            await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE FROM ${this.tableName}`, []),
                this.runQuery(tx, `INSERT INTO settings (pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, onboarding, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, multimeter) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                    [pipelineNameAsDefault, defaultPotentialUnit, Boolean(autoCreatePotentials), onboardingValue, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, multimeterValue])
            ])
            await this._setConfig(isCalculatorDisplayed)
            return settings
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to reset app settings`, er)
        }
    }
}
