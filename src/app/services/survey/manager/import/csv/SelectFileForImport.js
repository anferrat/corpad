export class SelectFileForImport {
    constructor(fileSystemRepo, documentPicker, csvParser, defaultNameRepo, potentialTypeRepo, pipelineRepo, referenceCellRepo, settingRepo, importDataPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.documentPicker = documentPicker
        this.csvParser = csvParser
        this.defaultNameRepo = defaultNameRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.pipelineRepo = pipelineRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.importDataPresenter = importDataPresenter
    }

    async execute() {
        const { uri, name } = await this.documentPicker.pickCommaSeparetedFile()
        const path = this.fileSystemRepo.getPathFromUri(uri)
        console.log(path)
        const [fileData, defaultNames, potentialTypes, pipelines, referenceCells, settings] = await Promise.all(
            [
                this.fileSystemRepo.readFile(path),
                this.defaultNameRepo.getAll(),
                this.potentialTypeRepo.getAll(),
                this.pipelineRepo.getAll(),
                this.referenceCellRepo.getAll(),
                this.settingRepo.get()
            ])
        const data = await this.csvParser.parse(fileData)
        return this.importDataPresenter.execute(name, path, data, defaultNames, potentialTypes, pipelines, referenceCells, settings)
    }
}