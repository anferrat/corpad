export const getTargetIndexes = (source, target, pipelineMap) => {
    const targetMap = new Map(target.map(({ id }, index) => ([id, index])))
    return source.map(({ id }) => {
        const targetPipelineIndex = targetMap.get(pipelineMap[id])
        return targetPipelineIndex !== undefined ? targetPipelineIndex + 2 : 1
        // +2 because of extra item at the begining of the item list
    })
}

export const getPipelineMap = (source, targetWithOptions, assignedIndexes) => {
    return Object.fromEntries(assignedIndexes.map((targetIndex, sourceIndex) => [source[sourceIndex].id, targetWithOptions[targetIndex].id]))
}