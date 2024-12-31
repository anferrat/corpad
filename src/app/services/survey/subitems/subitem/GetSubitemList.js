import { ItemTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class GetSubitemList {
    constructor(testPointRepo, rectifierRepo, referenceCellRepo, potentialTypeRepo, pipelineRepo, settingRepo, multimeterPropertyCaptureParameters, listPresenter, subitemPresenter, potentialPresenter, convertSubitemUnits, convertPotentialUnits) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
        this.referenceCellRepo = referenceCellRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.pipelineRepo = pipelineRepo
        this.settingRepo = settingRepo
        this.multimeterPropertyCaptureParameters = multimeterPropertyCaptureParameters
        this.subitemPresenter = subitemPresenter
        this.potentialPresenter = potentialPresenter
        this.convertSubitemUnits = convertSubitemUnits
        this.convertPotentialUnits = convertPotentialUnits
    }

    _getBasicList(id, itemType) {
        if (itemType === ItemTypes.TEST_POINT)
            return this.testPointRepo.getSubitemsById(id)
        else if (itemType === ItemTypes.RECTIFIER)
            return this.rectifierRepo.getSubitemsById(id)
        else if (itemType = ItemTypes.PIPELINE)
            return []
        else throw new Error(errors.GENERAL, `Item type ${itemType} is not supported.`)
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
            return [this.rectifierRepo.getSubitemsById(id), [], [], [], this.settingRepo.get()]
        else if (itemType = ItemTypes.PIPELINE)
            return [[], [], [], [], this.settingRepo.get()]
        else throw new Error(errors.GENERAL, `Item type ${itemType} is not supported.`)
    }


    async execute(id, itemType) {
        const list = await this._getBasicList(id, itemType)
        return this.listPresenter.execute(list)
    }

    async executeWithData(id, itemType) {
        const [subitems, referenceCells, potentialTypes, pipelineList, settings] = await Promise.all(this._getFullList(id, itemType))
        const potentialUnit = settings.defaultPotentialUnit ?? null
        const { multimeter } = settings
        const availableMeasurementTypes = multimeter.type ? this.multimeterPropertyCaptureParameters.getSupportedTypes(multimeter.type) : []

        const convertertedSubitems = subitems.map(subitem => {
            //Calculate data if needed for subitems
            subitem.calculate()

            //Convert units to display potentials
            const convertedPotentials = this.convertPotentialUnits.execute(subitem.potentials, potentialUnit, false)

            const convertedSubitem = this.convertSubitemUnits.execute(subitem, false)

            // using potential presenter get object for potential list
            const { potentials } = this.potentialPresenter.executeWithList(convertedPotentials, potentialTypes, referenceCells, potentialUnit)

            // assign presenter object to potentials
            convertedSubitem.setPotentials(potentials)
            return convertedSubitem

        })

        return this.subitemPresenter.executeWithList(convertertedSubitems, pipelineList, referenceCells, potentialUnit, availableMeasurementTypes)
    }
}