export class ExternalLinkRecord {
    constructor(id, tagId, name, timeRecorded, linkType, technician, itemType, location, link) {
        this.id = id
        this.tagId = tagId
        this.name = name
        this.linkType = linkType
        this.technician = technician
        this.timeRecorded = timeRecorded
        this.itemType = itemType
        this.location = location
        this.link = link
    }
}