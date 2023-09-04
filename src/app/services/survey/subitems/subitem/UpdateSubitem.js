export class UpdateSubitem {
    constructor(subitemRepo, subitemPresenter, subitemFactory) {
        this.subitemRepo = subitemRepo
        this.subitemPresenter = subitemPresenter
        this.subitemFactory = subitemFactory
    }

    async execute(subitemData) {
        const { id, uid, parentId, type, name, defaultName, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, density, area, isolationType, shorted, pipelineId, rcType, nps, factor, factorSelected, description, prevCurrent, prevVoltageDrop } = subitemData
        const currentTime = Date.now()
        const savedName = name === null || name === '' ? defaultName : name
        const subitem = this.subitemFactory.execute(id, uid, savedName, type, parentId, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, density, area, isolationType, shorted, pipelineId, rcType, nps, factor, factorSelected, description, prevCurrent, prevVoltageDrop)
        return this.subitemPresenter.executeWithUpdate(await this.subitemRepo.update(subitem, currentTime), currentTime)
    }
}