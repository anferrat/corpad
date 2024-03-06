export class CreateReferenceCellMap {
    constructor() {
    }

    execute(source, target) {
        const missingReferenceCellTypes = []
        const targetReferenceCellMap = new Map(target.map(({ rcType, id }) => [rcType, id]))
        const referenceCellMap = new Map(source.filter(rc => rc.isPortable).map(({ id, rcType }) => {
            const targetId = targetReferenceCellMap.get(rcType)
            if (!targetId)
                missingReferenceCellTypes.push(rcType)
            return [id, targetId]
        }))
        return {
            referenceCellMap,
            missingReferenceCellTypes,
        }
    }

}