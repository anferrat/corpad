import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"
import { Potential } from "../../../../entities/survey/subitems/Potential"
import { Error } from "../../../../utils/Error"

export class GetSubitemList {
    constructor(testPointRepo, rectifierRepo, referenceCellRepo, potentialTypeRepo, pipelineRepo, settingRepo, listPresenter, subitemPresenter, potentialPresenter, unitConverter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
        this.referenceCellRepo = referenceCellRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.pipelineRepo = pipelineRepo
        this.settingRepo = settingRepo
        this.subitemPresenter = subitemPresenter
        this.potentialPresenter = potentialPresenter
        this.unitConverter = unitConverter
    }

    _getBasicList(id, itemType) {
        if (itemType === ItemTypes.TEST_POINT)
            return this.testPointRepo.getSubitemsById(id)
        else if (itemType === ItemTypes.RECTIFIER)
            return this.rectifierRepo.getSubitemsById(id)
        else if (itemType = ItemTypes.PIPELINE)
            return []
        else throw new Error('CorpadError', `Item type ${itemType} is not supported.`)
    }

    _getFullList(id, itemType) {
        if (itemType === ItemTypes.TEST_POINT)
            return [this.testPointRepo.getSubitemsWithPotentialsById(id),
            this.referenceCellRepo.getAllForItem(id, null),
            this.potentialTypeRepo.getAll(),
            this.pipelineRepo.getAll(),
            this.settingRepo.get()
            ]
        else if (itemType === ItemTypes.RECTIFIER)
            return [this.rectifierRepo.getSubitemsById(id), [], [], [], {}]
        else if (itemType = ItemTypes.PIPELINE)
            return []
        else throw new Error('CorpadError', `Item type ${itemType} is not supported.`)
    }


    async execute(id, itemType) {
        const list = await this._getBasicList(id, itemType)
        return this.listPresenter.execute(list)
    }

    async executeWithData(id, itemType) {
        const [subitems, referenceCells, potentialTypes, pipelineList, settings] = await Promise.all(this._getFullList(id, itemType))
        const potentialUnit = settings.defaultPotentialUnit ?? null
        subitems.forEach(subitem => {
            //Convert units to display potentials
            subitem.potentials.forEach(({ value }, index) => {

                subitem.potentials[index].value = this.unitConverter.convertVolts(value, Potential.unit, potentialUnit)

            })
            // using potential presenter get object for potential list
            const { potentials } = this.potentialPresenter.executeWithList(subitem.potentials, potentialTypes, referenceCells, potentialUnit)
            // assign presenter object to potentials

            subitem.setPotentials(potentials)

        })

        return this.subitemPresenter.executeWithList(subitems, pipelineList, referenceCells, potentialUnit)
    }
}