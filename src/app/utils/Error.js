export class Error {
    constructor(name, message, details, code) {
        this.name = name
        this.message = message
        this.details = details
        this.code = code
    }
}

export const errors = Object.freeze({
    DATABASE: 'DatabaseError',
    NETWORK: 'NetworkError',
    AUTH: 'SignInError',
    FILESYSTEM: 'FileSystemError',
    GOOGLE_DRIVE: 'GoogleDriveError',
    GENERAL: 'CorpadError',
    LOCATION: 'LocationError',
    PERMISSION: 'PermissionError',
    VALIDATION: 'ValidationError',
})