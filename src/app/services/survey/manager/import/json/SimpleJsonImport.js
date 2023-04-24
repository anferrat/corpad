import { SubitemTypes } from "../../../../../entities/survey/subitems/Subitem"

export class SimpleJsonImport {
    constructor(surveyRepo) {
        this.surveyRepo = surveyRepo
    }

    async execute(surveyFile) {

        const { testPoints, pipelines, rectifiers, subitems, potentials, potentialTypes, survey, referenceCells } = surveyFile

        //Getting circuits from subitems (stored inside separate table)
        const circuits = subitems.filter(({ type }) => type === SubitemTypes.CIRCUIT)

        //Getting cards (testPoint subitems) from subitems
        const cards = subitems.filter(({ type }) => type !== SubitemTypes.CIRCUIT)

        //Coupon subitem must be inserted first, because it references PIPELINE/RISER subitem, therefore sorting COUPON to be firts
        cards.sort((a, b) => a.type === SubitemTypes.COUPON && b.type !== SubitemTypes.COUPON ? -1 : (a.type !== SubitemTypes.COUPON && b.type === SubitemTypes.COUPON ? 1 : 0))

        //Getting sides (ids of subitems that current subitem have reference to)
        const sides = cards
            .filter(({ sideA, sideB }) => sideA && sideB && (sideA.length > 0 || sideB.length > 0))
            .map(({ sideA, sideB, id }) => [
                ...sideA.map(sideAId => ({ sideAId: sideAId, parentId: id, sideBId: null })),
                ...sideB.map(sideBId => ({ sideAId: null, sideBId: sideBId, parentId: id }))
            ]).flat()

        //ensure there is a main reference Cell
        const mainReferenceExist = referenceCells.some(({ isMainReference }) => isMainReference)
        if (!mainReferenceExist && referenceCells[0])
            referenceCells[0].makeMainReference()
        await this.surveyRepo.import({ testPoints, rectifiers, pipelines, cards, circuits, potentialTypes, survey, referenceCells, potentials, sides })
    }

}