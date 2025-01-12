import { PermanentPotentialTypes, SubitemTypes } from "../../../../../../../../constants/global";
import { SubitemTypeLabels } from "../../../../../../../../constants/labels";

export class _PotentialHeaderConverter {
    constructor() {
        this.permanentPotentialTypeOrder = [PermanentPotentialTypes.ON, PermanentPotentialTypes.OFF, PermanentPotentialTypes.AC, PermanentPotentialTypes.DEPOL, PermanentPotentialTypes.CONNECTED, PermanentPotentialTypes.DISCONNECTED]
    }

    execute(exportedValues, potentialTypes, pipelines, groupPotentialsByPipeline) {
        const potentialTypeIdOrder = [...potentialTypes]
            .sort((a, b) => {
                const indexA = this.permanentPotentialTypeOrder.indexOf(a.type)
                const indexB = this.permanentPotentialTypeOrder.indexOf(b.type)
                return indexA - indexB
            })
            .map(({ id }) => id)
        const potentialTypeNameMap = this._generateNameMap(potentialTypes)
        const pipelineNameMap = this._generateNameMap(pipelines)

        return {
            list: this._convertPotentialsPropertyValues(exportedValues, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline),
            headers: this._getPotentialsPropertyHeaders(exportedValues, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline, potentialTypeIdOrder),
        }
    }

    _generateNameMap(list) {
        const map = {}
        list.forEach(({ id, name }) => {
            map[id] = name
        })
        return map
    }

    _generatePipelineName(pipelineId, pipelineNameMap) {
        if (pipelineId === null)
            return 'Unassigned'
        else
            return pipelineNameMap[pipelineId] ?? 'UNKNOWN'
    }

    _generateHeaderLabel(subitemType, pipelineId, potentialTypeId, subitemTypeIndex, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline) {
        const potentialName = potentialTypeNameMap[potentialTypeId] ?? '???'
        if (groupPotentialsByPipeline && (subitemType === SubitemTypes.RISER || subitemType === SubitemTypes.PIPELINE)) {
            const pipelineName = this._generatePipelineName(pipelineId, pipelineNameMap)
            return `${potentialName}_PIPELINE_POTENTIAL_(${pipelineName}) V`
        }
        else {
            const subTypeLabel = SubitemTypeLabels[subitemType]
            const suffix = subitemTypeIndex ? `_${subitemTypeIndex + 1}` : ''
            return `${potentialName}_POTENTIAL(${subTypeLabel}${suffix}) V`
        }
    }

    _getPotentialsPropertyHeaders(exportedValues, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline, potentialTypeIdOrder) {
        const headers = []

        //We iterate through each potential object we check if headers array already contain header object ({pipelineId, potentialTypeId, subitemType, subitemTypeIndex})
        exportedValues.forEach(({ potential }) => {
            potential.forEach(({ pipelineId, potentialTypeId, subitemType, subitemTypeIndex }) => {
                const headerExists = ~headers.findIndex((header) => {
                    //if we grouping by pipeline then we only care about pipelineId and potentialType properties in case of PL and RS subitems
                    if (groupPotentialsByPipeline && (subitemType === SubitemTypes.PIPELINE || subitemType === SubitemTypes.RISER))
                        return header.pipelineId === pipelineId && header.potentialTypeId === potentialTypeId
                    //Otherwise we check subitemType and subitemtypeIndex and potentialTypeId as identifing header
                    else return header.potentialTypeId === potentialTypeId && subitemType === header.subitemType && subitemTypeIndex === header.subitemTypeIndex
                })
                if (!headerExists)
                    headers.push({ pipelineId, potentialTypeId, subitemType, subitemTypeIndex })
            })
        })
        /*
        Now we sort header objects by properties.
        1. if Grouping by pipeline and subitem type RS and PL then we want them first and sorted by pipelineId and then potentialTypeId
            - potentialTypeId is sorted by potentialTypeIdOrder, which is sorted according to this.permanentPotentialTypeOrder - On, OFF fisrt and so on
        2. If not grouping by pipeline or for subitems types that are not PL or RS - we sort by subitemType, then subitemTypeIndex, and then potentialtypeId
        */
        headers.sort((a, b) => {
            if (groupPotentialsByPipeline) {
                if (a.subitemType === SubitemTypes.PIPELINE || a.subitemType === SubitemTypes.RISER) {
                    if (b.subitemType === SubitemTypes.PIPELINE || b.subitemType === SubitemTypes.RISER) {
                        if (a.pipelineId !== b.pipelineId) {
                            return a.pipelineId - b.pipelineId;
                        } else {
                            return potentialTypeIdOrder.indexOf(a.potentialTypeId) - potentialTypeIdOrder.indexOf(b.potentialTypeId);
                        }
                    } else {
                        return -1;
                    }
                } else if (b.subitemType === SubitemTypes.PIPELINE || b.subitemType === SubitemTypes.RISER) {
                    return 1;
                }
            }

            if (a.subitemType !== b.subitemType) {
                return a.subitemType.localeCompare(b.subitemType);
            } else if (a.subitemTypeIndex !== b.subitemTypeIndex) {
                return a.subitemTypeIndex - b.subitemTypeIndex;
            } else {
                return potentialTypeIdOrder.indexOf(a.potentialTypeId) - potentialTypeIdOrder.indexOf(b.potentialTypeId);
            }
        })

        return headers.map(({ pipelineId, potentialTypeId, subitemType, subitemTypeIndex }) => this._generateHeaderLabel(subitemType, pipelineId, potentialTypeId, subitemTypeIndex, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline))

    }

    _convertPotentialsPropertyValues(exportedValues, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline) {
        //generates list of objects, object per item, where each property is property label, and value is value
        return exportedValues.map(({ potential }) => {
            const potentialValues = {}
            potential.forEach(({ pipelineId, potentialTypeId, subitemType, subitemTypeIndex, value }) => {
                potentialValues[this._generateHeaderLabel(subitemType, pipelineId, potentialTypeId, subitemTypeIndex, potentialTypeNameMap, pipelineNameMap, groupPotentialsByPipeline)] = value
            })
            return potentialValues
        })
    }
}