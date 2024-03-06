export class CreatePotentialTypeMap {
    constructor() { }

    execute(source, target) {
        const permanetPotentialTypeTargetMap = new Map(
            target
                .filter(({ type }) => type)
                .map(({ id, type }) => [type, id]))
        return new Map(
            source
                .map(({ id, type }) => [id, permanetPotentialTypeTargetMap.get(type)])
                .filter(([_, targetId]) => targetId))
    }
}