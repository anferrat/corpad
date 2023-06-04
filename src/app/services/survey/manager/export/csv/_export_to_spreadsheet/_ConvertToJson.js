import { ItemTypes } from "../../../../../../../constants/global"
import { _ItemHeaderConverter } from "./convert_to_json/_ItemHeaderConverter"
import { _PotentialHeaderConverter } from "./convert_to_json/_PotentialsHeaderConverter"
import { _SubitemHeaderConverter } from "./convert_to_json/_SubitemHeaderConverter"

export class _ConvertToJson {
    constructor(pipelineRepo, potentialTypeRepo) {
        this.pipelineRepo = pipelineRepo
        this.potentialTypeRepo = potentialTypeRepo

        this._itemHeaderConverter = new _ItemHeaderConverter()
        this._subitemHeaderConverter = new _SubitemHeaderConverter()
        this._potentialHeaderConverter = new _PotentialHeaderConverter()
    }

    async _getPotentialsExtraData() {
        return await Promise.all([
            this.pipelineRepo.getAll(),
            this.potentialTypeRepo.getAll()
        ])
    }

    async execute(exportedValues, itemType, exportPotentials, groupPotentialsByPipeline) {
        const items = this._itemHeaderConverter.execute(exportedValues)
        const subitems = this._subitemHeaderConverter.execute(exportedValues)
        const isPotentials = exportPotentials && itemType === ItemTypes.TEST_POINT
        let potentials
        if (isPotentials) {
            const [pipelines, potentialTypes] = await this._getPotentialsExtraData()
            potentials = this._potentialHeaderConverter.execute(exportedValues, potentialTypes, pipelines, groupPotentialsByPipeline)
        }
        const headers = [...items.headers, ...(isPotentials ? potentials.headers : []), ...subitems.headers]
        const data = items.list.map((item, index) => ({
            ...item,
            ...(isPotentials ? potentials.list[index] : {}),
            ...subitems.list[index]
        }))
        return {
            data,
            headers
        }
    }
}