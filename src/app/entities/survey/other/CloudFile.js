export class CloudFile {
    constructor(name, cloudId, parents, timeModified, size) {
        this.name = name
        this.cloudId = cloudId
        this.parents = parents
        this.timeModified = timeModified
        this.size = size
    }
}