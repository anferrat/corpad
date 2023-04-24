export class LoadCommaSeparatedFile {
    constructor(fileSystemRepo, parser) {
        this.fileSystemRepo = fileSystemRepo
        this.parser = parser
        this.MAX_ROWS = 100
        this.MAX_FIELDS = 50
    }

    async execute(path) {
        const file = await this.fileSystemRepo.readFile(path)
        const { data, meta } = await this.parser.parse(file)
        const rowLimitReached = data.length > (MAX_ROWS)
        const fieldsLimitReached = meta.fields.length > (MAX_FIELDS)
        const result = data.filter((_, i) => i <= (this.MAX_ROWS - 1))
        const fields = meta.fields.filter((_, i) => i <= (this.MAX_FIELDS - 1))
        return {
            data: result,
            fields,
            rowLimitReached,
            fieldsLimitReached
        }
    }
}