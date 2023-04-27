import { FileSystemLocations } from "../../entities/survey/other/properties"

export class WriteCalculatorToFile {
    constructor(fileSystemRepo, csvParserService, fileNameGenerator) {
        this.fileSystemRepo = fileSystemRepo
        this.csvParserService = csvParserService
        this.fileNameGenerator = fileNameGenerator
    }

    async execute(data, fileName) {
        const content = this.csvParserService.unparse(data)
        console.log(this.csvParserService.unparse(data))
        return {
            filePath: await this.fileSystemRepo.writeFile(content, this.fileNameGenerator.execute(fileName, 'csv'), FileSystemLocations.EXPORTS, true)
        }
    }
}