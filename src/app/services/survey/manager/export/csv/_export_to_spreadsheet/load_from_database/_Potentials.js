import { SubitemTypes } from "../../../../../../../../constants/global"

export class _Potentials {
    constructor() {
    }

    execute({ subitems, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, exportPotentials }) {
        if (exportPotentials) {
            let subitemIndexCount = {}
            const potentials = subitems.filter(({ type, pipelineId }) => {

                const isPipelineType = type === SubitemTypes.PIPELINE || type === SubitemTypes.RISER

                //Checks if subitem type is in selected type list
                const typeSelected = ~selectedSubitemTypes.indexOf(type)

                //Checks if pipelineId is in selected pipelineIdList
                const pipelineSelected = isPipelineType && ~pipelineIdList.indexOf(pipelineId)

                if (groupPotentialsByPipeline)
                    return typeSelected && !isPipelineType || pipelineSelected && isPipelineType
                else return typeSelected
            })
                .map(({ type, potentials, pipelineId }) => {
                    const index = subitemIndexCount[type]
                    subitemIndexCount[type] = subitemIndexCount[type] ? subitemIndexCount[type] + 1 : 1
                    return potentials
                        .filter((potential) => {
                            const potentialTypeSelected = ~potentialTypeIdList.indexOf(potential.potentialType)
                            const referenceCellCheck = potential.referenceCellId === referenceCellId && potential.isPortableReference
                            return potentialTypeSelected && referenceCellCheck
                        })
                        .map(({ potentialType, value }) => ({
                            pipelineId: pipelineId ?? null,
                            subitemType: type,
                            potentialTypeId: potentialType,
                            value: value !== null ? value : '',
                            subitemTypeIndex: index ?? 0,
                        }))
                }).flat(1)
            return potentials
        }
        else return []
    }
}