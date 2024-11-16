import { Error, errors } from "../../../../../utils/Error"

export class SelectFileForImport {
    constructor(documentPicker, defaultNameRepo, potentialTypeRepo, pipelineRepo, referenceCellRepo, settingRepo, spreadsheetDataParser, importDataPresenter) {
        this.spreadsheetDataParser = spreadsheetDataParser
        this.documentPicker = documentPicker
        this.defaultNameRepo = defaultNameRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.pipelineRepo = pipelineRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.importDataPresenter = importDataPresenter
        this.MAXIMUM_FILE_SIZE = 3145728
    }

    async execute() {
        const file = await this.documentPicker.pickSpreadsheetFile()

        if (file.size > this.MAXIMUM_FILE_SIZE)
            throw new Error(errors.GENERAL, `Unable to read spreadsheet`, `File is larger than ${this.MAXIMUM_FILE_SIZE}`, 440)

        const path = file.getPath()
        const name = file.getName()
        const [content, defaultNames, potentialTypes, pipelines, referenceCells, settings] = await Promise.all(
            [
                this.spreadsheetDataParser.parseFile(file),
                this.defaultNameRepo.getAll(),
                this.potentialTypeRepo.getAll(),
                this.pipelineRepo.getAll(),
                this.referenceCellRepo.getAll(),
                this.settingRepo.get()
            ])
        return this.importDataPresenter.execute(name, path, content, defaultNames, potentialTypes, pipelines, referenceCells, settings)
    }
}