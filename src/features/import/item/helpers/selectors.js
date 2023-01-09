import { verifyTypes } from "../../../../helpers/functions"
import { getTypedIndex, getSubitemName } from "./functions"


export const getCardList = (state, cardTypes) => {
    return state.importData.subitems.map((s, index) => ({
        item: getSubitemName(s.type, getTypedIndex(state.importData.subitems, index)),
        key: s.key,
        type: s.type
    }))
        .filter(s => verifyTypes(s.type, cardTypes))
}

export const getSelectedConnectionIndex = (state, subitemIndex, cardTypes) => {
    const key = state.importData.subitems[subitemIndex]?.pipelineCardKey
    if (key) {
        const resultIndex = (getCardList(state, cardTypes)).findIndex(c => c.key === key)
        return resultIndex === -1 ? null : resultIndex
    }
    else return null
}


export const getSideSelectedIndexes = (state, subitemIndex, sideTypes, isSideA) => {
    if (state.importData.subitems[subitemIndex]) {
        const sideKeys = state.importData.subitems[subitemIndex][isSideA ? 'sideA' : 'sideB']
        if (sideKeys) {
            const cardList = getCardList(state, sideTypes)
            return sideKeys.map(key => cardList.findIndex(c => c.key === key)).filter(k => k !== -1)
        }
        else return []
    }
    else return []
}