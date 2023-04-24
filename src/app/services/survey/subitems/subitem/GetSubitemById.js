import { SubitemTypes } from "../../../../entities/survey/subitems/Subitem"
import { Error, errors } from "../../../../utils/Error"

export class GetSubitemById {
    constructor(subitemRepo, defaultNameRepo, testPointRepo, rectifierRepo, pipelineRepo, settingRepo, subitemPresenter) {
        this.subitemRepo = subitemRepo
        this.subitemPresenter = subitemPresenter
        this.defaultNameRepo = defaultNameRepo
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.settingRepo = settingRepo
        this.pipelineRepo = pipelineRepo
    }

    async _getPipelineNameAsDefaultSetting(subitemType) {
        if (subitemType === SubitemTypes.PIPELINE || subitemType === SubitemTypes.RISER)
            return (await this.settingRepo.get()).pipelineNameAsDefault
        else return false
    }

    _getSubitemList(subitemType, itemId) {
        if (subitemType === SubitemTypes.CIRCUIT)
            return this.rectifierRepo.getSubitemsById(itemId)
        else if (~Object.values(SubitemTypes).indexOf(subitemType))
            return this.testPointRepo.getSubitemsById(itemId)
        else throw new Error(errors.GENERAL, `Subitem type ${subitemType} is not supported`)
    }

    _getPipelineList(subitemType) {
        if (subitemType === SubitemTypes.PIPELINE || subitemType === SubitemTypes.RISER)
            return this.pipelineRepo.getAll()
        else return []
    }

    _getDefaultNameIndex(subitemList, subitemType) {
        return (subitemList.filter(subitem => subitem.type === subitemType)).length
    }

    _getDefaultName(defaultName, index) {
        if (defaultName === null)
            return `${index}`
        else return `${defaultName} ${index}`
    }

    async execute(subitemType, itemId, subitemId) {
        const [subitem, pipelineNameAsDefualt, subitemList, pipelineList, defaultNameBase] = await Promise.all([
            this.subitemRepo.getByIdAndType(subitemId, subitemType),
            this._getPipelineNameAsDefaultSetting(subitemType),
            this._getSubitemList(subitemType, itemId),
            this._getPipelineList(subitemType),
            this.defaultNameRepo.getByType(subitemType)
        ])
        if (subitem.parentId !== itemId) {
            throw new Error(errors.GENERAL, `Subitem with id ${subitemId} doesn't belong to item with id ${itemId}`)
        }
        const defaultName = this._getDefaultName(defaultNameBase, this._getDefaultNameIndex(subitemList, subitemType))
        return this.subitemPresenter.execute(subitem, pipelineNameAsDefualt, subitemList, pipelineList, defaultName)
    }
}