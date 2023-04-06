export class PotentialTypePresenter {
    constructor() { }

    execute(potentialTypes, autoCreatePotentials, potentialUnit) {
        return {
            autoCreate: autoCreatePotentials,
            unit: potentialUnit,
            potentialTypes: {
                standard: potentialTypes.filter(({ type }) => type !== null).map(pt => ({ ...pt })),
                custom: potentialTypes.filter(({ type }) => type === null).map(pt => ({ ...pt }))
            }
        }
    }
}