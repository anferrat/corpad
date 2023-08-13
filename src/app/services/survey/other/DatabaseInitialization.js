export class DatabaseInitialization {
    constructor(appRepo) {
        this.appRepo = appRepo
    }

    async execute() {
        //check schema version BEFORE creating tables. 
        const schemaVersion = await this.appRepo.getSchemaVersion()
        await this.appRepo.createTables()
        await this.appRepo.adjustDatabaseSchema(schemaVersion)
    }
}