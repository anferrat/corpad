import { _ItemHeaderConverter } from "./_export_to_spreadsheet/_ItemHeaderConverter"
import { _ItemExport } from "./_export_to_spreadsheet/_Item"
import { _Potentials } from "./_export_to_spreadsheet/_Potentials"
import { _SubitemExport } from "./_export_to_spreadsheet/_Subitem"
import { _SubitemHeaderConverter } from "./_export_to_spreadsheet/_SubitemHeaderConverter"
import { _PotentialHeaderConverter } from "./_export_to_spreadsheet/_PotentialsHeaderConverter"
import { _LoadFromDatabase } from "./_export_to_spreadsheet/_LoadFromDatabase"
import { _ConvertToJson } from "./_export_to_spreadsheet/_ConvertToJson"
import { FileSystemLocations } from "../../../../../../constants/global"
import { ItemTypeLabelsPlural } from "../../../../../../constants/labels"
import { _ExportAssets } from "./_export_to_spreadsheet/_ExportAssets"
import { _GetFileContent } from "./_export_to_spreadsheet/_GetFileConetnt"
import { _ParseGeoJsonToKml } from "./_export_to_spreadsheet/_ParseGeoJsonToKml"

export class ExportToSpreadsheet {
    constructor(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, potentialTypeRepo, fileSystemRepo, csvParser, fileNameGenerator, assetRepo, mapLayerRepo) {
        this._parseGeoJsonToKml = new _ParseGeoJsonToKml()
        this._loadFromDatabaseService = new _LoadFromDatabase(testPointRepo, rectifierRepo, pipelineRepo, potentialRepo)
        this._convertToJson = new _ConvertToJson(pipelineRepo, potentialTypeRepo)
        this._exportAssets = new _ExportAssets(fileSystemRepo, assetRepo, testPointRepo, rectifierRepo, fileNameGenerator)
        this._getFileContent = new _GetFileContent(mapLayerRepo, csvParser, this._parseGeoJsonToKml)
        this.csvParser = csvParser
        this.fileSystemRepo = fileSystemRepo
        this.fileNameGenerator = fileNameGenerator
        this.surveyRepo = surveyRepo
    }

    async execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties, includeAssets, exportType, includeMapLayers }) {

        const exportedValues = await this._loadFromDatabaseService.execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties })

        const { headers, data, features } = await this._convertToJson.execute(exportedValues, itemType, exportPotentials, groupPotentialsByPipeline)

        const { name } = await this.surveyRepo.getSurvey()

        const fileContent = await this._getFileContent.execute(data, headers, features, includeMapLayers, exportType)

        const fileName = this.fileNameGenerator.execute(`${name}_${ItemTypeLabelsPlural[itemType]}`, "")

        const writtenFile = await this.fileSystemRepo.writeFile(fileContent, `${fileName}.${exportType}`, FileSystemLocations.EXPORTS, false)
        if (includeAssets)
            await this._exportAssets.execute(itemType, fileName)
        return writtenFile
    }
}