export class File {
    constructor(filename, timeModified, path, size, isFile) {
        this.filename = filename
        this.timeModified = timeModified
        this.path = path
        this.size = size
        this.isFile = isFile
    }

    getExtension() {
        return this.filename.split('.').pop()
    }
}