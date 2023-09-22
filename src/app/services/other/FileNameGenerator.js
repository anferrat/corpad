export class FileNameGenerator {
    constructor() {
        this.invalidCharsRegex = /[\/:*?"<>|\\]/g;
    }

    monthToString(month) {
        return month < 9 ? '0' + (month + 1) : (month + 1).toString()
    }

    timeToString(time) {
        return time < 10 ? '0' + time : time.toString()
    }

    execute(baseName = 'File', fileType = 'corpad') {
        const d = new Date()
        return `${baseName}_${d.getFullYear()}-${this.monthToString(d.getMonth())}-${this.timeToString(d.getDate())}_${this.timeToString(d.getHours())}-${this.timeToString(d.getMinutes())}-${this.timeToString(d.getSeconds())}${fileType ? `.${fileType}` : ''}`
    }

    sanitizeFileName(filename) {
        return filename.replace(this.invalidCharsRegex, '');
    }

    getExtension(filename) {
        const parts = filename.split('.')
        if (parts.length > 1 && parts[parts.length - 1] !== "") {
            return parts[parts.length - 1]
        } else {
            return ""
        }
    }
}