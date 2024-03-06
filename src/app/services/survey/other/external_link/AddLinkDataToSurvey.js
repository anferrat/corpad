import { ItemTypes } from "../../../../../constants/global"
import { ItemTypeLabels, ReferenceCellCodeLabels } from "../../../../../constants/labels"
import { Pipeline } from "../../../../entities/survey/items/Pipeline"
import { ReferenceCell } from "../../../../entities/survey/other/ReferenceCell"
import { Error, errors } from "../../../../utils/Error"
import { guid } from "../../../../utils/guid"

export class AddLinkDataToSurvey {
    constructor(linkDecoder, generateCompositeItem, createPipelineMapService, createPotentialTypeMapService, createReferenceCellMapService, testPointRepo, rectifierRepo, subitemRepo, potentialRepo, pipelineRepo, referenceCellRepo, potentialTypeRepo, warningHandler) {
        this.linkDecoder = linkDecoder
        this.generateCompositeItem = generateCompositeItem
        this.createPipelineMapService = createPipelineMapService
        this.createPotentialTypeMapService = createPotentialTypeMapService
        this.createReferenceCellMapService = createReferenceCellMapService
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.potentialRepo = potentialRepo
        this.subitemRepo = subitemRepo
        this.pipelineRepo = pipelineRepo
        this.referenceCellRepo = referenceCellRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.warningHandler = warningHandler
    }

    async _createMissingPipelines(pipelines, pipelineMapData) {
        if (!pipelineMapData)
            return {
                generatedPipelineMapData: pipelineMapData,
                createdPipelineIdList: []
            }
        const createdPipelines = {}
        const createdPipelineIdList = []
        await Promise.all(Object.entries(pipelineMapData)
            .filter(([_, value]) => value === -1)
            .map(async ([key]) => {
                const pipeline = pipelines.find(({ id }) => id == key)
                if (pipeline) {
                    const { uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount } = pipeline
                    const newPipeline = new Pipeline(null, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount)
                    const { id } = await this.pipelineRepo.create(newPipeline)
                    if (id) {
                        createdPipelines[key] = id
                        createdPipelineIdList.push(id)
                    }
                }
            }))
        return {
            generatedPipelineMapData: {
                ...pipelineMapData,
                ...createdPipelines
            },
            createdPipelineIdList,
        }
    }

    async _resolveItemUidConflict(item) {
        //Happens when user attempts to insert item with uid that already exists. UID must be unique for each individual item.
        const uidExists = await this._doesUidExist(item)
        if (uidExists) {
            const confirm = await this.warningHandler.execute(`${ItemTypeLabels[item.itemType]} with exactly same UID already exists in the current survey. Use "Find in the survey" button to view it. If you proceed, new UID will be assigned to the newly created item.`, 'Proceed', 'Cancel')
            if (confirm)
                item.setUid(guid())
            else
                throw new Error(errors.GENERAL, 'Unable to assign new UID to the item', 'Operation is cancelled by user', 101)
        }
        return item
    }

    async _resolveReferenceCellConflict(referenceCells, referenceCellMap, missingReferenceCellTypes) {
        //It is possible to insert values that require reference cell of the rcType that is missing from the survey. We do not match reference cells, instead we auto-create ref cells of missing type.
        if (missingReferenceCellTypes.length === 0)
            return referenceCellMap
        else {
            const confirm = await this.warningHandler.execute('Some of the reference cell types are missing in current survey. If you proceed, missing reference cells will be created automatically.', 'Proceed', 'Cancel')
            if (confirm) {
                await this._createReferenceCells(missingReferenceCellTypes)
                const dbReferenceCells = await this.referenceCellRepo.getAll()
                const rcServiceData = this.createReferenceCellMapService.execute(referenceCells, dbReferenceCells)
                return rcServiceData.referenceCellMap
            }
            else
                throw new Error(errors.GENERAL, 'Unable to create missing reference cells', 'Operation is cancelled by user', 101)
        }
    }

    async _generateMaps(pipelines, pipelineMapData, referenceCells, potentialTypes) {

        const [dbPipelines, dbReferenceCells, dbPotentialTypes] = await Promise.all([
            this.pipelineRepo.getAll(),
            this.referenceCellRepo.getAll(),
            this.potentialTypeRepo.getAll()
        ])
        const [{ isPipelineMapped, pipelineMap }, { missingReferenceCellTypes, referenceCellMap }, potentialTypeMap] = [
            this.createPipelineMapService.execute(pipelines, dbPipelines, pipelineMapData),
            this.createReferenceCellMapService.execute(referenceCells, dbReferenceCells),
            this.createPotentialTypeMapService.execute(potentialTypes, dbPotentialTypes)
        ]

        return {
            isPipelineMapped,
            pipelineMap,
            referenceCellMap: await this._resolveReferenceCellConflict(referenceCells, referenceCellMap, missingReferenceCellTypes),
            potentialTypeMap,
        }
    }

    _createItem(item) {
        if (item.itemType === ItemTypes.TEST_POINT)
            return this.testPointRepo.create(item)
        else if (item.itemType === ItemTypes.RECTIFIER)
            return this.rectifierRepo.create(item)
        else
            throw new Error(errors.GENERAL, 'Unable to create item', 'Item type is not supported')
    }

    async _doesUidExist(item) {
        if (item.itemType !== ItemTypes.TEST_POINT && item.itemType !== ItemTypes.RECTIFIER)
            throw new Error(errors.GENERAL, 'Unable to get item uid', 'Item type is not supported')
        try {
            switch (item.itemType) {
                case ItemTypes.TEST_POINT:
                    await this.testPointRepo.getByUid(item.uid)
                    break
                case ItemTypes.RECTIFIER:
                    await this.rectifierRepo.getByUid(item.uid)
                    break
            }
            return true
        }
        catch {
            return false
        }
    }

    async _createSubitem(subitem) {
        try {
            return await this.subitemRepo.create(subitem)
        }
        catch {
            return undefined
        }
    }

    async _createReferenceCells(missingReferenceCellTypes) {
        await Promise.all(missingReferenceCellTypes.map(rcType => this.referenceCellRepo.create(new ReferenceCell(null, guid(), rcType, `RC-${ReferenceCellCodeLabels[rcType]}`, false))))
    }

    _mapSideProperty(side, subitemMap) {
        return side.map(id => subitemMap.get(id)).filter(id => id !== undefined)
    }

    _mapSubitemProperties(subitem, itemId, pipelineMap, subitemMap) {
        const { sideA, sideB, pipelineId, pipelineCardId } = subitem
        const newSideA = sideA ? this._mapSideProperty(sideA, subitemMap) : undefined
        const newSideB = sideB ? this._mapSideProperty(sideB, subitemMap) : undefined
        const newPipelineId = pipelineId !== undefined && pipelineId !== null ? (pipelineMap.get(pipelineId) ?? null) : undefined
        const newPipelineCardId = pipelineCardId !== undefined && pipelineCardId !== null ? (subitemMap.get(pipelineCardId) ?? null) : undefined
        if (itemId) {
            subitem.setId(null)
            subitem.setParentId(itemId)
            subitem.setSides(newSideA, newSideB)
            subitem.setPipelineId(newPipelineId)
            subitem.setPipelineCardId(newPipelineCardId)
            return subitem
        }
        else
            return undefined
    }

    _mapPotential(potential, subitemId, potentialTypeMap, referenceCellMap, subitemMap) {
        const { potentialType, referenceCellId, isPortableReference } = potential
        const newPotentialTypeId = potentialTypeMap.get(potentialType)
        const newReferenceCellId = isPortableReference ? referenceCellMap.get(referenceCellId) ?? null : subitemMap.get(referenceCellId) ?? null
        if (newPotentialTypeId && newReferenceCellId && subitemId) {
            potential.setSubitemId(subitemId)
            potential.setPotentialTypeId(newPotentialTypeId)
            potential.setReferenceCellId(newReferenceCellId)
            return potential
        }
        return undefined
    }


    async execute(link, pipelineMapData = undefined) {
        //Decode link
        const data = this.linkDecoder.decode(link)

        //Convert to linkObject to item
        const { item, pipelines, potentialTypes, referenceCells } = await this.generateCompositeItem.execute(data)

        //Generate missing pipelines
        const { generatedPipelineMapData, createdPipelineIdList } = await this._createMissingPipelines(pipelines, pipelineMapData)

        // Generate maps (currentId -> databaseId)
        const { pipelineMap, referenceCellMap, potentialTypeMap, isPipelineMapped } = await this._generateMaps(pipelines, generatedPipelineMapData, referenceCells, potentialTypes)
        let createdItemId = null
        if (isPipelineMapped) {
            //isPipelineMapped will return true if pipelineMapData is provided, or if we were able to autoMap pipeliens between linkData and current survey
            const { subitems } = item

            // Reset item id
            item.setId(null)

            //Insert item
            const { id } = await this._createItem(await this._resolveItemUidConflict(item))
            createdItemId = id
            // Generate empty subitemMap
            const subitemMap = new Map()
            //Assume subitems are sorted. Insert subitems sequentially, as they were read from the link, due to possible self referencing
            for (let j = 0; j < subitems.length; j++) {
                const subitem = subitems[j]
                const index = j
                const mappedSubitem = this._mapSubitemProperties(subitem, id, pipelineMap, subitemMap)
                if (mappedSubitem) {
                    const createdSubitem = await this._createSubitem(subitem)
                    if (createdSubitem) {
                        subitemMap.set(index, createdSubitem.id)
                    }
                }
            }

            // Map potential ids and insert potentials in parallel
            await Promise.all(subitems.map(subitem => {
                const { potentials } = subitem
                if (potentials) {
                    return Promise.all(potentials.map(potential => {
                        const subitemId = subitemMap.get(potential.subitemId)
                        const mappedPotential = this._mapPotential(potential, subitemId, potentialTypeMap, referenceCellMap, subitemMap)
                        if (mappedPotential)
                            return this.potentialRepo.create(mappedPotential)
                    }))
                }
            }))
        }

        return {
            isPipelineMapped,
            createdPipelineIdList,
            createdItemId,
            createdItemType: item.itemType
        }
    }



}