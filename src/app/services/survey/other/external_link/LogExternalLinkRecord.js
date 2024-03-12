import { ExternalLinkRecord } from "../../../../entities/survey/other/ExternalLinkRecord"

export class LogExternalLinkRecord {
    constructor(externalLinkRepo) {
        this.externalLinkRepo = externalLinkRepo
        this.NUMBER_OF_RECORDS = 10
    }

    async execute({ tagId, name, linkType, technician, itemType, location, link }) {
        const records = await this.externalLinkRepo.getAll()
        //In case of duplicates, just updating duplicating record
        const deleteIndex = records.findIndex((record) => record.link === link)
        if (records.length >= this.NUMBER_OF_RECORDS || ~deleteIndex)
            await this.externalLinkRepo.delete(records[~deleteIndex ? deleteIndex : this.NUMBER_OF_RECORDS - 1].id)
        const timeRecorded = Date.now()
        const externalLinkRecord = new ExternalLinkRecord(null, tagId, name, timeRecorded, linkType, technician, itemType, location, link)
        return await this.externalLinkRepo.create(externalLinkRecord)
    }
}