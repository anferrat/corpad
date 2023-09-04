export class Asset {
    constructor(id, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId) {
        this.id = id
        this.uid = uid
        this.comment = comment
        this.fileName = fileName
        this.mediaType = mediaType
        this.timeCreated = timeCreated
        this.timeModified = timeModified
        this.parentType = parentType
        this.parentId = parentId
        this.source
    }

    getSource(assetDirPath) {
        this.source = { uri: `file://${decodeURI(`${assetDirPath}/${this.fileName}`)}` }
    }
}