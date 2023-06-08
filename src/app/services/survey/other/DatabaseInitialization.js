export class DatabaseInitialization {
    constructor(appRepo) {
        this.appRepo = appRepo
    }

    async execute() {
        await this.appRepo.createTables()
        const schemaVersion = await this.appRepo.getSchemaVersion()
        await this.appRepo.adjustDatabaseSchema(schemaVersion)
    }
}