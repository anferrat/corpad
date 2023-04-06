import { FileSystemLocations } from "../../../../entities/survey/other/properties"

export class ExportMarkers {
    constructor(fileSystemRepo, KmlParser, fileNameGenerator, surveyRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.KmlParser = KmlParser
        this.fileNameGenerator = fileNameGenerator
        this.surveyRepo = surveyRepo
    }

    async execute(markers) {
        
        const survey = await this.surveyRepo.getSurvey()

        const fileName = this.fileNameGenerator.execute(survey.name, 'kml')

        const text = this.KmlParser.parseMarkers(markers)
        
        return await this.fileSystemRepo.writeFile(text, fileName, FileSystemLocations.EXPORTS)
    }
}