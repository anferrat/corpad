// React memo optimisation to prevent subitems from rerendering

const isEqualIdMap = (prev, next) => {
    const prevIdMap = Object.values(prev)
    const nextIdMap = Object.values(next)
    return prevIdMap.every((subitem, index) => nextIdMap[index].name === subitem.name && nextIdMap[index].type === subitem.type) &&
        prevIdMap.length === nextIdMap.length
}

const isEqualSide = (prev, next) => {
    return prev.every((side, index) => side === next[index]) &&
        prev.length === next.length
}

export const isEqualIK = (prev, next) => (
    prev.data.name === next.data.name &&
    prev.data.type === next.data.type &&
    prev.data.current === next.data.current &&
    prev.data.fromAtoB === next.data.fromAtoB &&
    prev.data.isolationType === next.data.isolationType &&
    prev.data.shorted === next.data.shorted &&
    prev.subitemIndex === next.subitemIndex &&
    prev.data.valid.current === next.data.valid.current &&
    isEqualIdMap(prev.idMap, next.idMap) &&
    isEqualSide(prev.data.sideA, next.data.sideA) &&
    isEqualSide(prev.data.sideB, next.data.sideB)
)