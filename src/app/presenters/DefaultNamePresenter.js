export class DefaultNamePresenter {
    constructor() { }

    execute(defaultNames, pipelineNameAsDefault) {
        return {
            defaultNames: Object.fromEntries(defaultNames.map(({ name, type }) => [type, name])),
            pipelineNameAsDefault: pipelineNameAsDefault
        }
    }
}