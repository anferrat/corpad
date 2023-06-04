import { _ItemHeaderConverter } from "./_export_to_spreadsheet/_ItemHeaderConverter"
import { _ItemExport } from "./_export_to_spreadsheet/_Item"
import { _Potentials } from "./_export_to_spreadsheet/_Potentials"
import { _SubitemExport } from "./_export_to_spreadsheet/_Subitem"
import { _SubitemHeaderConverter } from "./_export_to_spreadsheet/_SubitemHeaderConverter"
import { _PotentialHeaderConverter } from "./_export_to_spreadsheet/_PotentialsHeaderConverter"
import { _LoadFromDatabase } from "./_export_to_spreadsheet/_LoadFromDatabase"
import { _ConvertToJson } from "./_export_to_spreadsheet/_ConvertToJson"
import { FileExtensions, FileSystemLocations } from "../../../../../../constants/global"
import { ItemTypeLabelsPlural } from "../../../../../../constants/labels"

export class ExportToSpreadsheet {
    constructor(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, potentialTypeRepo, fileSystemRepo, csvParser, fileNameGenerator) {
        this._loadFromDatabaseService = new _LoadFromDatabase(testPointRepo, rectifierRepo, pipelineRepo, potentialRepo)
        this._convertToJson = new _ConvertToJson(pipelineRepo, potentialTypeRepo)
        this.csvParser = csvParser
        this.fileSystemRepo = fileSystemRepo
        this.fileNameGenerator = fileNameGenerator
        this.surveyRepo = surveyRepo
    }


    async execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties }) {
        const exportedValues = await this._loadFromDatabaseService.execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties })
        const { headers, data } = await this._convertToJson.execute(exportedValues, itemType, exportPotentials, groupPotentialsByPipeline)
        const { name } = await this.surveyRepo.getSurvey()
        const fileContent = this.csvParser.unparse(data, headers)
        const fileName = this.fileNameGenerator.execute(`${name}_${ItemTypeLabelsPlural[itemType]}`, FileExtensions.CSV)
        return await this.fileSystemRepo.writeFile(fileContent, fileName, FileSystemLocations.EXPORTS, false)
    }
}