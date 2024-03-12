import { ExternalLinkRecord } from "../../entities/survey/other/ExternalLinkRecord";
import { Error, errors } from "../../utils/Error";
import { SQLiteRepository } from "../../utils/SQLite";

export class ExternalLinkRepo extends SQLiteRepository {
    constructor() {
        super()
    }

    async create(externalLinkRecord) {
        const { tagId, name, linkType, technician, timeRecorded, itemType, location, link } = externalLinkRecord
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO externalLinks (tagId, name, linkType, technician, timeRecorded, itemType, location, link) VALUES (?,?,?,?,?,?,?,?)', [tagId, name, linkType, technician, timeRecorded, itemType, location, link])
            return new ExternalLinkRecord(result.insertId, tagId, name, timeRecorded, linkType, technician, itemType, location, link)
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to log external link', er)
        }
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT * FROM externalLinks ORDER BY timeRecorded DESC')
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, tagId, name, linkType, technician, timeRecorded, itemType, location, link }) => {
                return new ExternalLinkRecord(id, tagId, name, timeRecorded, linkType, technician, itemType, location, link)
            })
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get external links', er)
        }
    }

    async delete(id) {
        try {
            return await this.runSingleQueryTransaction('DELETE FROM externalLinks WHERE id=?', [id])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to delete external link', er)
        }
    }

    async deleteAll() {
        try {
            return await this.runSingleQueryTransaction('DELETE FROM externalLinks', [])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to delete external links', er)
        }
    }
}