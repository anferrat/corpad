export class UpdateSubitem {
    constructor(subitemRepo, subitemPresenter, subitemFactory, convertSubitemUnits) {
        this.subitemRepo = subitemRepo
        this.subitemPresenter = subitemPresenter
        this.subitemFactory = subitemFactory
        this.convertSubitemUnits = convertSubitemUnits
    }

    async execute(subitemData) {
        const { id, uid, parentId, type, name, defaultName, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, density, area, isolationType, shorted, pipelineId, rcType, nps, factor, factorSelected, description, prevCurrent, prevVoltageDrop, spacingUnit, resistivityUnit, comment, enclosureType, bedType, materialType, anodes, layers } = subitemData
        const currentTime = Date.now()
        const savedName = name === null || name === '' ? defaultName : name
        const subitem = this.subitemFactory.execute(id, uid, savedName, type, parentId, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, density, area, isolationType, shorted, pipelineId, rcType, nps, factor, factorSelected, description, prevCurrent, prevVoltageDrop, spacingUnit, resistivityUnit, comment, enclosureType, bedType, materialType, anodes, layers)
        const convertedSubitem = this.convertSubitemUnits.execute(subitem, true)
        convertedSubitem.calculate()
        const convertedToOriginal = this.convertSubitemUnits.execute(await this.subitemRepo.update(convertedSubitem, currentTime), false)
        return this.subitemPresenter.executeWithUpdate(convertedToOriginal, currentTime)
    }
}