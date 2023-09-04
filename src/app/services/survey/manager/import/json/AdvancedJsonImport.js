import { SubitemTypes } from "../../../../../../constants/global"

export class AdvancedJsonImport {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialTypeRepo, surveyRepo, referenceCellRepo, potentialRepo, mapLayerRepo, assetRepo) {
        this.surveyRepo = surveyRepo
        this.testPointImport = new ImportAll(testPointRepo)
        this.rectifierImport = new ImportAll(rectifierRepo)
        this.pipelineImport = new ImportAll(pipelineRepo)
        this.subitemImport = new ImportAll(subitemRepo)
        this.potentialImport = new ImportAll(potentialRepo)
        this.potentialTypeImport = new ImportAll(potentialTypeRepo)
        this.referenceCellImport = new ImportAll(referenceCellRepo)
        this.mapLayerImport = new ImportAll(mapLayerRepo)
        this.assetImport = new ImportAll(assetRepo)
    }

    async execute(surveyFile) {
        const { testPoints, subitems, rectifiers, pipelines, potentialTypes, referenceCells, potentials, survey, mapLayers, assets } = surveyFile

        //Ensure main reference cell exist
        const mainReferenceExist = referenceCells.some(({ isMainReference }) => isMainReference)
        if (!mainReferenceExist && referenceCells[0])
            referenceCells[0].makeMainReference()

        //Importing in 3 steps in order to keep reference for other items: 
        // 1 - items and extras
        // 2 - subitems and assets
        // 3 - potentials
        await Promise.all([
            this.surveyRepo.create(survey),
            this.testPointImport.execute(testPoints),
            this.rectifierImport.execute(rectifiers),
            this.pipelineImport.execute(pipelines),
            this.potentialTypeImport.execute(potentialTypes),
            this.referenceCellImport.execute(referenceCells),
            this.mapLayerImport.execute(mapLayers)
        ])


        //Coupon subitem must be inserted first, because it references PIPELINE/RISER subitem, therefore sorting COUPON to appear firts when importing
        subitems.sort((a, b) => a.type === SubitemTypes.COUPON && b.type !== SubitemTypes.COUPON ? -1 : (a.type !== SubitemTypes.COUPON && b.type === SubitemTypes.COUPON ? 1 : 0))

        await Promise.all([
            this.subitemImport.execute(subitems),
            this.assetImport.execute(assets)
        ])
        await this.potentialImport.execute(potentials)
    }
}

class ImportAll {
    constructor(repo) {
        this.repo = repo
    }

    async execute(list) {
        return await Promise.all(list.map(async value => {
            try {
                return await this.repo.create(value)
            }
            catch (er) {
                return null
            }
        }))
    }
}
