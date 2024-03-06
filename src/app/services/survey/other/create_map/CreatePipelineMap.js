export class CreatePipelineMap {
    constructor() {
    }

    //source - pipeline in current survey

    //target - pipelines in target survey

    _isNameMatching(source, target, nameMap) {
        let isMatching = true
        const targetPipelines = [...target]
        for (i = 0; i < source.length; i++) {
            const matchingIndex = targetPipelines.findIndex(targetPipeline => source[i].name === targetPipeline.name)
            if (!~matchingIndex) {
                isMatching = false
                break
            }
            else {
                nameMap.set(i, targetPipelines[matchingIndex].id)
                targetPipelines.splice(matchingIndex, 1)
            }
        }
        return isMatching
    }

    _simpleMatch(source, target) {
        const nameMap = new Map()
        const SIMPLE_MATCH_CONDITIONS = {
            SINGLE_PIPE: source.length === 1 && target.length === 1,
            NAME_MATCH: this._isNameMatching(source, target, nameMap)
        }

        if (SIMPLE_MATCH_CONDITIONS.SINGLE_PIPE)
            return {
                isMapped: true,
                map: new Map([[source[0].id, target[0].id]])
            }
        else if (SIMPLE_MATCH_CONDITIONS.NAME_MATCH)
            return {
                isMapped: true,
                map: nameMap
            }
        else return {
            isMapped: false,
            map: nameMap
        }
    }

    execute(source, target, pipelineMapData) {
        if (pipelineMapData) {
            return {
                isPipelineMapped: true,
                pipelineMap: new Map(source
                    .map(({ id }) => [id, pipelineMapData[id] ?? null]))
            }
        }
        else {
            const simpleMatch = this._simpleMatch(source, target)
            return {
                isPipelineMapped: simpleMatch.isMapped,
                pipelineMap: simpleMatch.map, //here we return the map with matched name to autofill some of the select fileds
            }
        }
    }
}