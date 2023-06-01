export class ImportDataPresenter {
    constructor() { }

    execute(fileName, uri, data, defaultNames, potentialTypes, pipelines, referenceCells, settings) {
        return {
            fields: data.meta.fields,
            data: data.data,
            fileName: fileName,
            uri: uri,
            defaultNames: defaultNames.map(name => ({ ...name })),
            potentialTypes: potentialTypes.map(type => ({ ...type })),
            pipelines: pipelines.map(pipeline => ({ ...pipeline })),
            referenceCells: referenceCells.map(rc => ({ ...rc })),
            autoCreatePotentials: settings.autoCreatePotentials
        }
    }
}